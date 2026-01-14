import { Mail, BookOpen, Award, CalendarDays } from "lucide-react";
import Button from "~/components/ui/Button";
import StatCard from "~/components/ui/StatCard";
import Avatar from "~/img/avatar.jpg";

function Profile() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm relative">
        <div className="bg-(--nord14) w-full max-h-[180px] h-[180px]" />
        {/* Avatar  */}
        <div className="absolute left-8 top-[140px] h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-sm">
          <img
            src={Avatar}
            alt={"Avatar"}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Dane */}
        <div className="px-8 pb-8 pt-12">
          <div className="flex items-start justify-between gap-4 flex-col">
            <h2>Anna Makłowska</h2>
            <div className="flex text-slate-500 justify-center items-center">
              <Mail size={18} />
              <p className="pl-3">Makłowska1992@gmail.com</p>
            </div>
          </div>
          {/*  */}
          <div className="min-w-0 gap-8 flex justify-betwee">
            <StatCard
              icon={<BookOpen size={20} />}
              value={24}
              label="Recenzje"
            />
            <StatCard icon={<Award size={20} />} value="1,250" label="Punkty" />
            <StatCard
              icon={<CalendarDays size={20} />}
              value="Sty 2024"
              label="Członek od"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
