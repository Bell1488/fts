import { useState, useMemo, useEffect } from 'react';
import {
  Calculator as CalcIcon, ArrowLeftRight, Wallet, MessageCircle,
  Send, Star, Info, CheckCircle2, ArrowRight, AlertCircle,
  Bitcoin, CreditCard, Receipt,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { EXCHANGE_DIRECTIONS, COMPANY } from '@/data/content';
import { openManagerTelegram, openChannelTelegram, formatNumber } from '@/lib/utils';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ArrowLeftRight, Wallet, MessageCircle, Bitcoin, CreditCard, Receipt,
};

const PAYMENT_METHODS = [
  { id: 'alipay', label: 'Alipay', icon: 'Wallet' },
  { id: 'wechat', label: 'WeChat Pay', icon: 'MessageCircle' },
  { id: 'supplier', label: 'Поставщику', icon: 'Receipt' },
  { id: 'bank-card', label: 'Банковская карта', icon: 'CreditCard' },
];

interface CalcResult {
  inputAmount: number;
  outputAmount: number;
  rate: number;
  commission: number;
  commissionAmount: number;
  total: number;
  youGet: number;
}

export default function CalculatorPage() {
  const [directionId, setDirectionId] = useState('rub-cny');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('alipay');
  const [showResult, setShowResult] = useState(false);
  const [liveRates, setLiveRates] = useState<{ buyRate: number; sellRate: number } | null>(null);

  useEffect(() => {
    fetch('/api/rates').then((response) => response.ok ? response.json() : Promise.reject()).then(setLiveRates).catch(() => undefined);
  }, []);

  const baseDirection = EXCHANGE_DIRECTIONS.find((d) => d.id === directionId)!;
  const direction = useMemo(() => {
    if (!liveRates || !['rub-cny', 'cny-rub', 'rub-alipay', 'rub-wechat'].includes(baseDirection.id)) return baseDirection;
    return { ...baseDirection, rate: baseDirection.from === 'RUB' ? liveRates.buyRate : liveRates.sellRate };
  }, [baseDirection, liveRates]);
  const amountNum = parseFloat(amount) || 0;

  const result = useMemo<CalcResult>(() => {
    const rate = direction.rate;
    const commission = direction.commission;
    const commissionAmount = amountNum * (commission / 100);
    const total = amountNum + commissionAmount;

    let outputAmount: number;
    if (direction.from === 'RUB' && direction.to.includes('CNY')) {
      outputAmount = amountNum / rate;
    } else if (direction.from === 'CNY' && direction.to === 'RUB') {
      outputAmount = amountNum * rate;
    } else if (direction.from === 'USDT' && direction.to.includes('CNY')) {
      outputAmount = amountNum * rate;
    } else {
      outputAmount = amountNum / rate;
    }

    return {
      inputAmount: amountNum,
      outputAmount,
      rate,
      commission,
      commissionAmount,
      total,
      youGet: outputAmount,
    };
  }, [amountNum, direction]);

  const fromSymbol = direction.from === 'RUB' ? '₽' : direction.from === 'CNY' ? '¥' : direction.from === 'USDT' ? '$' : '';
  const toSymbol = direction.to.includes('CNY') ? '¥' : direction.to === 'RUB' ? '₽' : '$';
  const toLabel = direction.to.includes('Alipay') ? 'Alipay' : direction.to.includes('WeChat') ? 'WeChat' : direction.to;

  const meetsMinimum = amountNum >= direction.minAmount || (direction.id === 'rub-alipay' || direction.id === 'rub-wechat');

  const handleCalculate = () => {
    if (amountNum > 0) {
      setShowResult(true);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="bg-blob w-96 h-96 bg-brand-300/15 top-10 right-10" />

        <div className="content-layer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 glass-orange px-4 py-2 rounded-full mb-6">
            <CalcIcon className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-medium text-brand-700">Калькулятор обмена</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mb-6 max-w-3xl">
            Рассчитайте платёж{' '}
            <span className="text-brand-600">в Китай</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Выберите направление обмена, введите сумму — и узнаете, сколько получит получатель в Китае. Точный курс менеджер зафиксирует на момент заявки.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-7 sticky top-24">
                <h2 className="font-display font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <ArrowLeftRight className="w-6 h-6 text-brand-500" />
                  Параметры обмена
                </h2>

                <div className="space-y-5">
                  {/* Direction */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Направление обмена
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {EXCHANGE_DIRECTIONS.map((dir) => {
                        const Icon = ICON_MAP[dir.icon] ?? ArrowLeftRight;
                        const isActive = directionId === dir.id;
                        return (
                          <button
                            key={dir.id}
                            onClick={() => { setDirectionId(dir.id); setShowResult(false); }}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                              isActive
                                ? 'glass-orange border-brand-300/60'
                                : 'bg-white/50 border-brand-100/50 hover:border-brand-200/40'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                isActive ? 'gradient-orange' : 'gradient-orange-light border border-brand-200/50'
                              }`}>
                                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-600'}`} />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-sm">{dir.from}</span>
                                <ArrowRight className="w-3 h-3 text-brand-400" />
                                <span className="font-semibold text-gray-900 text-sm">{dir.to}</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{dir.rate}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Сумма ({direction.from})
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Например, 50000"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-brand-100 focus:border-brand-400 focus:ring-2 focus:ring-brand-300/50 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-lg font-semibold"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                        {fromSymbol}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Способ получения в Китае
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {PAYMENT_METHODS.map((method) => {
                        const Icon = ICON_MAP[method.icon] ?? Wallet;
                        const isActive = paymentMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                              isActive
                                ? 'glass-orange border-brand-300/60'
                                : 'bg-white/50 border-brand-100/50 hover:border-brand-200/40'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isActive ? 'gradient-orange' : 'gradient-orange-light border border-brand-200/50'
                            }`}>
                              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-600'}`} />
                            </div>
                            <span className="text-xs font-semibold text-gray-900">{method.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={handleCalculate}
                    disabled={amountNum <= 0}
                    className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <CalcIcon className="w-5 h-5" />
                    Рассчитать
                  </button>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-brand-50/50 border border-brand-100/50">
                    <Info className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Расчёт предварительный. Курс фиксируется менеджером на момент заявки в Telegram. Минимальная сумма — {COMPANY.minSum} {COMPANY.minSumCurrency} (для Alipay/WeChat от 100 ¥).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {showResult && amountNum > 0 ? (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="glass-card p-7">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-sm text-gray-500">Вы отправляете</div>
                        <div className="text-3xl font-display font-extrabold text-gray-900">
                          {formatNumber(amountNum)} {fromSymbol}
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center shadow-lg shadow-brand-500/20">
                        <ArrowLeftRight className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Получатель получает</div>
                        <div className="text-3xl font-display font-extrabold text-brand-600">
                          {formatNumber(result.youGet, 2)} {toSymbol}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-brand-100/50">
                        <span className="text-sm text-gray-600">Направление</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {direction.from} → {direction.to}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-brand-100/50">
                        <span className="text-sm text-gray-600">Курс обмена</span>
                        <span className="text-sm font-semibold text-gray-900">{direction.rate}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-brand-100/50">
                        <span className="text-sm text-gray-600">Комиссия ({result.commission}%)</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {formatNumber(result.commissionAmount, 2)} {fromSymbol}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-brand-100/50">
                        <span className="text-sm text-gray-600">Способ получения</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                        </span>
                      </div>
                    </div>

                    <div className="gradient-orange-light rounded-2xl p-6 border border-brand-200/50 mb-6">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Итоговая сумма к получению</div>
                        <div className="text-5xl font-display font-extrabold text-brand-600 mb-2">
                          {formatNumber(result.youGet, 2)} {toSymbol}
                        </div>
                        <div className="text-sm text-gray-500">
                          Вы отправляете: {formatNumber(amountNum)} {fromSymbol}
                        </div>
                      </div>
                    </div>

                    {!meetsMinimum && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200/50 mb-6">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-700 leading-relaxed">
                          Минимальная сумма для этого направления — {direction.minAmount} {direction.from}. Текущая сумма ниже минимума.
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={openManagerTelegram} className="btn-primary flex-1">
                        <Send className="w-5 h-5" />
                        Написать менеджеру
                      </button>
                      <button onClick={openChannelTelegram} className="btn-glass flex-1">
                        <Star className="w-5 h-5 text-brand-500" />
                        Наши отзывы
                      </button>
                    </div>
                  </div>

                  {/* Rate info */}
                  <div className="glass-card p-6">
                    <h3 className="font-display font-bold text-lg text-gray-900 mb-4">
                      Информация по курсу
                    </h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-brand-50/50 border border-brand-100/50">
                        <div className="text-2xl font-display font-bold text-gray-900">{direction.rate}</div>
                        <div className="text-xs text-gray-500 mt-1">Курс {direction.from}→{toLabel}</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-brand-50/50 border border-brand-100/50">
                        <div className="text-2xl font-display font-bold text-gray-900">{direction.commission}%</div>
                        <div className="text-xs text-gray-500 mt-1">Комиссия</div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-brand-50/50 border border-brand-100/50">
                        <div className="text-2xl font-display font-bold text-gray-900">~1 час</div>
                        <div className="text-xs text-gray-500 mt-1">Время перевода</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-12 text-center">
                  <div className="w-20 h-20 rounded-3xl gradient-orange-light border border-brand-200/50 flex items-center justify-center mx-auto mb-6">
                    <CalcIcon className="w-10 h-10 text-brand-500" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                    Заполните параметры обмена
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    Выберите направление обмена, введите сумму и способ получения в Китае — узнаете итоговую сумму к получению.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                    {EXCHANGE_DIRECTIONS.slice(0, 3).map((dir) => (
                      <div key={dir.id} className="glass rounded-xl p-4 text-center">
                        <div className="font-bold text-gray-900 text-sm">{dir.from} → {dir.to}</div>
                        <div className="text-xs text-gray-500 mt-1">курс: {dir.rate}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={openManagerTelegram} className="btn-glass">
                      <Send className="w-5 h-5 text-brand-500" />
                      Написать менеджеру
                    </button>
                    <button onClick={openChannelTelegram} className="btn-glass">
                      <Star className="w-5 h-5 text-brand-500" />
                      Наши отзывы
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-7">
              <Info className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="font-display font-bold text-lg text-gray-900 mb-3">Как считается курс?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Курс обмена фиксируется менеджером на момент заявки в Telegram. В калькуляторе показан текущий ориентировочный курс. Финальная сумма может незначительно отличаться.
              </p>
            </div>
            <div className="glass-card p-7">
              <CheckCircle2 className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="font-display font-bold text-lg text-gray-900 mb-3">Что включено в расчёт?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                В расчёт включены курс обмена и комиссия сервиса. Никаких скрытых платежей — вы видите финальную сумму до подтверждения заявки.
              </p>
            </div>
            <div className="glass-card p-7">
              <AlertCircle className="w-8 h-8 text-brand-500 mb-4" />
              <h3 className="font-display font-bold text-lg text-gray-900 mb-3">Минимальная сумма</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Минимальная сумма для обмена — {COMPANY.minSum} {COMPANY.minSumCurrency}. Для пополнения Alipay и WeChat Pay — от 100 ¥.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 text-center">
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">
              Нужна помощь с расчётом?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Напишите менеджеру — зафиксируем курс и проведём платёж в течение часа.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={openManagerTelegram} className="btn-primary">
                <Send className="w-5 h-5" />
                Написать менеджеру
              </button>
              <Link to="/services" className="btn-glass">
                Все услуги
                <ArrowRight className="w-4 h-4 text-brand-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
