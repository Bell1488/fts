import { FormEvent, useRef, useState } from 'react';
import { Building2, Calculator, FileText, Phone, Send } from 'lucide-react';
import { getMarketingParams, trackMetrikaGoal } from '@/lib/utils';

type LeadFormProps = {
  business?: boolean;
  defaultService?: string;
  title?: string;
};

export default function LeadForm({ business = false, defaultService = '', title = 'Получить расчёт' }: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState({ amount: '', currency: 'RUB', service: defaultService, company: '', contact: '', comment: '' });
  const honeypot = useRef<HTMLInputElement>(null);

  function update(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    startLead();
  }

  function startLead() {
    if (started) return;
    setStarted(true);
    trackMetrikaGoal('lead_start');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...values, honeypot: honeypot.current?.value || '', utm: getMarketingParams() }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error('lead failed');
      setStatus('success');
      trackMetrikaGoal('lead_success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4" onFocus={startLead}>
      <h2 className="font-display font-bold text-2xl text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">Оставьте сумму и контакт. Менеджер подтвердит курс, комиссию и срок перевода до оплаты.</p>
      <div className="grid sm:grid-cols-[1fr_120px] gap-3">
        <label className="block text-sm font-semibold text-gray-700">Сумма
          <div className="relative mt-2"><Calculator className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input required inputMode="decimal" value={values.amount} onChange={(e) => update('amount', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-brand-100 outline-none focus:border-brand-400" placeholder="100 000" /></div>
        </label>
        <label className="block text-sm font-semibold text-gray-700">Валюта
          <select value={values.currency} onChange={(e) => update('currency', e.target.value)} className="w-full mt-2 py-3 px-3 rounded-xl bg-white border border-brand-100 outline-none focus:border-brand-400"><option>RUB</option><option>CNY</option><option>USDT</option></select>
        </label>
      </div>
      <label className="block text-sm font-semibold text-gray-700">{business ? 'Компания' : 'Способ получения'}
        <div className="relative mt-2"><Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input value={business ? values.company : values.service} onChange={(e) => update(business ? 'company' : 'service', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-brand-100 outline-none focus:border-brand-400" placeholder={business ? 'ООО «Ваша компания»' : 'Alipay, WeChat или поставщик'} /></div>
      </label>
      {business && <label className="block text-sm font-semibold text-gray-700">Назначение платежа
        <div className="relative mt-2"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input value={values.service} onChange={(e) => update('service', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-brand-100 outline-none focus:border-brand-400" placeholder="Оплата поставщику по инвойсу" /></div>
      </label>}
      <label className="block text-sm font-semibold text-gray-700">Telegram или телефон
        <div className="relative mt-2"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input required value={values.contact} onChange={(e) => update('contact', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-brand-100 outline-none focus:border-brand-400" placeholder="@username или +7..." /></div>
      </label>
      <label className="block text-sm font-semibold text-gray-700">Комментарий
        <div className="relative mt-2"><FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" /><textarea rows={3} value={values.comment} onChange={(e) => update('comment', e.target.value)} className="w-full pl-10 pr-3 py-3 rounded-xl bg-white border border-brand-100 outline-none focus:border-brand-400 resize-none" placeholder={business ? 'Номер инвойса, реквизиты или задача' : 'Например: пополнение Alipay для покупки на 1688'} /></div>
      </label>
      <input ref={honeypot} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" />
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-60"><Send className="w-5 h-5" />{status === 'sending' ? 'Отправка...' : 'Получить расчёт'}</button>
      {status === 'success' && <p role="status" className="text-sm text-emerald-700">Заявка отправлена. Менеджер свяжется с вами.</p>}
      {status === 'error' && <p role="alert" className="text-sm text-red-700">Не удалось отправить заявку. Данные сохранены, напишите менеджеру в Telegram.</p>}
      <p className="text-xs text-gray-500">Нажимая кнопку, вы соглашаетесь на обработку заявки для связи с вами.</p>
    </form>
  );
}
