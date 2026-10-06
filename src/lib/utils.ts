import { COMPANY } from '@/data/content';

export function trackMetrikaGoal(goal: string) {
  window.ym?.(113278379, 'reachGoal', goal);
}

export function openManagerTelegram(message?: unknown) {
  trackMetrikaGoal('telegram_manager_click');
  const managerUrl = import.meta.env.VITE_MANAGER_TELEGRAM_URL || COMPANY.managerTelegram;
  if (typeof message !== 'string' || !message) {
    window.open(managerUrl, '_blank', 'noopener,noreferrer');
    return;
  }
  try {
    const url = new URL(managerUrl);
    url.searchParams.set('text', message);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  } catch {
    window.open(managerUrl, '_blank', 'noopener,noreferrer');
  }
}

export function openChannelTelegram() {
  window.open(COMPANY.channelTelegram, '_blank', 'noopener,noreferrer');
}

export function openClientChatTelegram() {
  trackMetrikaGoal('telegram_client_chat_click');
  window.open(COMPANY.clientChatTelegram, '_blank', 'noopener,noreferrer');
}

export function trackPhoneClick() {
  trackMetrikaGoal('phone_click');
}

export function getMarketingParams() {
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'yclid'];
  const current = Object.fromEntries(keys.filter((key) => params.get(key)).map((key) => [key, params.get(key)!]));
  if (Object.keys(current).length) sessionStorage.setItem('fts-marketing', JSON.stringify(current));
  try {
    return JSON.parse(sessionStorage.getItem('fts-marketing') || '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCurrency(value: number, currency: string): string {
  const symbols: Record<string, string> = { RUB: '₽', CNY: '¥', USDT: '$' };
  return `${formatNumber(value)} ${symbols[currency] || currency}`;
}
