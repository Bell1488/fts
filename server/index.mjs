import http from 'node:http';
import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

const port = Number(process.env.PORT || 8787);
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const proxyUrl = process.env.SOCKS5H_URL;
const ratesCache = { value: null, fetchedAt: 0 };
let botOffset = 0;

function json(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

function formatMessage(data) {
  return [
    '<b>Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Компания:</b> ${escapeHtml(data.company || 'Не указана')}`,
    `<b>Контакт:</b> ${escapeHtml(data.contact)}`,
    `<b>Сумма и направление:</b> ${escapeHtml(data.details || 'Не указаны')}`,
  ].join('\n');
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

async function getExchangeRate(force = false) {
  const day = 24 * 60 * 60 * 1000;
  if (!force && ratesCache.value && Date.now() - ratesCache.fetchedAt < day) return ratesCache.value;
  const agent = proxyUrl ? new SocksProxyAgent(proxyUrl) : undefined;
  const response = await axios.get('https://www.cbr.ru/scripts/XML_daily.asp', { httpAgent: agent, httpsAgent: agent, proxy: false, headers: { 'user-agent': 'FTS-Pay/1.0' }, responseType: 'text' });
  const xml = response.data;
  const match = xml.match(/<Valute[^>]*>\s*<NumCode>156<\/NumCode>[\s\S]*?<Nominal>(\d+)<\/Nominal>[\s\S]*?<Value>([\d,]+)<\/Value>/);
  if (!match) throw new Error('CNY rate not found in CBR response');
  const rate = Number(match[2].replace(',', '.')) / Number(match[1]);
  ratesCache.value = { cbrRate: rate, buyRate: rate * 1.03, sellRate: rate * 0.97, fetchedAt: new Date().toISOString() };
  ratesCache.fetchedAt = Date.now();
  return ratesCache.value;
}

async function sendToTelegram(data) {
  if (!botToken || !chatId) throw new Error('Telegram is not configured');
  const agent = proxyUrl ? new SocksProxyAgent(proxyUrl) : undefined;
  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, { chat_id: chatId, text: formatMessage(data), parse_mode: 'HTML' }, { httpAgent: agent, httpsAgent: agent, proxy: false });
}

async function sendBotMessage(text) {
  if (!botToken || !chatId) return;
  const agent = proxyUrl ? new SocksProxyAgent(proxyUrl) : undefined;
  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, { chat_id: chatId, text }, { httpAgent: agent, httpsAgent: agent, proxy: false });
}

async function pollBot() {
  if (!botToken) return;
  try {
    const agent = proxyUrl ? new SocksProxyAgent(proxyUrl) : undefined;
    const response = await axios.get(`https://api.telegram.org/bot${botToken}/getUpdates`, { params: { offset: botOffset, timeout: 0 }, httpAgent: agent, httpsAgent: agent, proxy: false });
    for (const update of response.data.result || []) {
      botOffset = update.update_id + 1;
      const message = update.message;
      if (!message || String(message.chat.id) !== String(chatId)) continue;
      if (['/rate', '/rates', '/курс'].includes(message.text)) {
        const rates = await getExchangeRate(true);
        await sendBotMessage(`Курс ЦБ РФ: ${rates.cbrRate.toFixed(4)} ₽ за ¥\nПокупка юаней: ${rates.buyRate.toFixed(4)} ₽\nПродажа юаней: ${rates.sellRate.toFixed(4)} ₽\nОбновлено: ${rates.fetchedAt}`);
      }
    }
  } catch (error) { console.error('Telegram polling error:', error.message); }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/health') return json(res, 200, { ok: true });
  if (req.method === 'GET' && req.url === '/api/rates') {
    try { return json(res, 200, await getExchangeRate()); } catch (error) { console.error(error); return json(res, 502, { error: 'Не удалось получить курс ЦБ РФ' }); }
  }
  if (req.method !== 'POST' || req.url !== '/api/lead') return json(res, 404, { error: 'Not found' });

  let raw = '';
  for await (const chunk of req) raw += chunk;
  try {
    const data = JSON.parse(raw);
    if (!data.name || !data.contact) return json(res, 400, { error: 'Имя и контакт обязательны' });
    await sendToTelegram(data);
    return json(res, 200, { ok: true });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: 'Не удалось отправить заявку. Напишите менеджеру в Telegram.' });
  }
});

server.listen(port, () => { console.log(`Lead API listening on http://localhost:${port}`); setInterval(pollBot, 5000); pollBot(); });
