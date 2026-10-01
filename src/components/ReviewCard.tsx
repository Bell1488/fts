import { Star } from 'lucide-react';
import type { Review } from '@/data/content';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-brand-500 text-brand-500" />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">
        "{review.text}"
      </p>
      <div className="pt-4 border-t border-brand-100/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center flex-shrink-0">
            <span className="text-white font-display font-bold text-lg">
              {review.author.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{review.author}</div>
            <div className="text-xs text-gray-500">{review.position}</div>
            <div className="text-xs text-brand-600 font-medium">{review.company}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>{review.service}</span>
          <span>{new Date(review.date).toLocaleDateString('ru-RU')}</span>
        </div>
      </div>
    </div>
  );
}
