import { COMPANY } from '@/data/content';

export function trackMetrikaGoal(goal: string) {
  window.ym?.(113278379, 'reachGoal', goal);
}

export function openManagerTelegram() {
  trackMetrikaGoal('telegram_manager_click');
  window.open(import.meta.env.VITE_MANAGER_TELEGRAM_URL || COMPANY.managerTelegram, '_blank', 'noopener,noreferrer');
}

export function openChannelTelegram() {
  window.open(import.meta.env.VITE_CHANNEL_TELEGRAM_URL || COMPANY.channelTelegram, '_blank', 'noopener,noreferrer');
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
