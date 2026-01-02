// Card.tsx
import React from "react";

type CardProps = {
  imageUrl: string;
  category?: string; // np. "Książka"
  title: string;
  author: string;
  description: string;
  rating: number; // 0..5
  reviewBy?: string; // np. "Anna Kowalska"
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

export default function Card({
  imageUrl,
  category = "Książka",
  title,
  author,
  description,
  rating,
  reviewBy,
  className = "",
}: CardProps) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <div
      className={
        "w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm " +
        className
      }
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover"
          loading="lazy"
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

        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

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

        {reviewBy ? (
          <p className="text-sm text-slate-700">
            Recenzja: <span className="font-medium">{reviewBy}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
