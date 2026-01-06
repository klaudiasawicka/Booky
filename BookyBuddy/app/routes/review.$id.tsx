import React from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  User,
  StickyNote,
} from "lucide-react";

type ReviewDetailsData = {
  coverUrl: string;
  authorLabel: string; // np. "Autor"
  authorName: string; // np. "jjj"
  rating: number; // 0..5
  dateLabel: string; // np. "8 grudnia 2025"
  aboutTitle: string; // np. "O treści"
  aboutSubtitle?: string; // np. "jjj"
  aboutText: string;

  review: {
    title: string; // np. "Recenzja"
    personName: string; // np. "Anna Kowalska"
    personRole: string; // np. "Recenzent"
    text: string;
  };

  keyPointsTitle: string; // np. "Kluczowe punkty"
  keyPoints: string[];

  tagsTitle: string; // np. "Tagi"
  tags: string[];
};

function StarRow({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        return (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${
              filled ? "fill-yellow-400" : "fill-slate-600"
            }`}
            aria-hidden="true"
          >
            <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      })}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-700">
      {children}
    </span>
  );
}

function AvatarCircle({ letter }: { letter: string }) {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-full bg-violet-600 text-sm font-semibold text-white">
      {letter}
    </div>
  );
}

const demo: ReviewDetailsData = {
  coverUrl:
    "https://images.unsplash.com/photo-1520975963133-a737c8df2d28?auto=format&fit=crop&w=1400&q=60",
  authorLabel: "Autor",
  authorName: "jjj",
  rating: 5,
  dateLabel: "8 grudnia 2025",
  aboutTitle: "O treści",
  aboutSubtitle: "jjj",
  aboutText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  review: {
    title: "Recenzja",
    personName: "Anna Kowalska",
    personRole: "Recenzent",
    text: "To niezwykle wartościowa pozycja, która zmienia perspektywę na temat. Autor w mistrzowski sposób łączy teorię z praktyką, dostarczając czytelnikom nie tylko wiedzę, ale również inspirację do dalszych poszukiwań. Szczególnie doceniam dogłębną analizę i przystępny język. Gorąco polecam każdemu, kto interesuje się tą tematyką.",
  },
  keyPointsTitle: "Kluczowe punkty",
  keyPoints: [
    "Innowacyjne podejście do tematu",
    "Solidne podstawy naukowe i badania",
    "Praktyczne przykłady i zastosowania",
    "Przystępny język dla szerokiej publiczności",
    "Wartościowe wnioski i rekomendacje",
  ],
  tagsTitle: "Tagi",
  tags: [
    "#edukacja",
    "#nauka",
    "#inspiracja",
    "#rozwój osobisty",
    "#literatura",
  ],
};

export default function ReviewDetails() {
  const data = demo; // <- podmień na dane z API / loadera / propsów

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto w-full max-w-4xl">
        {/* Back */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Powrót do listy
          </Link>
        </div>

        {/* Card wrapper */}
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 shadow-lg">
          {/* Hero */}
          <div className="relative">
            <div className="aspect-[16/6] w-full overflow-hidden bg-slate-800">
              <img
                src={data.coverUrl}
                alt="Okładka"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />

            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-200 ring-1 ring-amber-400/30">
                <StickyNote className="h-3.5 w-3.5" />
                Notatka
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta row */}
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <User className="h-4 w-4" />
                  <span className="opacity-80">{data.authorLabel}:</span>
                  <span className="font-medium text-slate-100">
                    {data.authorName}
                  </span>
                </div>

                <div className="space-y-1">
                  <StarRow value={data.rating} />
                  <div className="text-sm text-slate-300">
                    Ocena:{" "}
                    <span className="font-semibold">{data.rating}/5</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Calendar className="h-4 w-4" />
                {data.dateLabel}
              </div>
            </div>

            <div className="my-6 h-px w-full bg-slate-800" />

            {/* About */}
            <div className="space-y-3">
              <h2 className="text-base font-semibold">{data.aboutTitle}</h2>
              {data.aboutSubtitle ? (
                <div className="text-sm font-medium text-slate-200">
                  {data.aboutSubtitle}
                </div>
              ) : null}
              <p className="text-sm leading-relaxed text-slate-300">
                {data.aboutText}
              </p>
            </div>

            {/* Review box */}
            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="mb-4 text-sm font-semibold text-slate-200">
                {data.review.title}
              </div>

              <div className="mb-3 flex items-center gap-3">
                <AvatarCircle
                  letter={(data.review.personName?.[0] || "A").toUpperCase()}
                />
                <div>
                  <div className="text-sm font-semibold">
                    {data.review.personName}
                  </div>
                  <div className="text-xs text-slate-400">
                    {data.review.personRole}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-300">
                {data.review.text}
              </p>
            </div>

            {/* Key points */}
            <div className="mt-8 space-y-3">
              <h3 className="text-base font-semibold">{data.keyPointsTitle}</h3>

              <ul className="space-y-2">
                {data.keyPoints.map((kp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-400" />
                    <span className="text-sm text-slate-300">{kp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="mt-8 space-y-3">
              <h3 className="text-base font-semibold">{data.tagsTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
