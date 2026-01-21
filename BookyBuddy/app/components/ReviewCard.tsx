// Card.tsx
import React from "react";

type CardProps = {
  bookId: string;
  coverUrl: string;
  category?: string;
  title: string;
  author: string;
  comment?: string;
  rating: number;
  className?: string;
};

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={filled ? "h-4 w-4 fill-yellow-400" : "h-4 w-4 fill-slate-200"}
      aria-hidden="true"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function Card({
  bookId,
  coverUrl = "",
  category = "Książka",
  title,
  author,
  comment,
  rating,
  className = "",
}: CardProps) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      className={
        " max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm group hover:shadow-gray-600" +
        className
      }
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={coverUrl}
          alt={coverUrl}
          className="object-cover hover:scale-125 h-64 w-64"
        />
        <span className="absolute right-3 top-3 rounded-full bg-slate-900/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>

        <p className="mt-2 text-sm text-slate-700">
          Autor: <span className="font-medium">{author}</span>
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < safeRating} />
            ))}
          </div>
          <span className="text-sm font-medium text-slate-700">
            {safeRating}/5
          </span>
        </div>

        <hr className="my-4 border-slate-200" />
      </div>
    </div>
  );
}
export default Card;
