import { Mail, BookOpen, Award, CalendarDays, User } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "~/components/ui/Button";
import StatCard from "~/components/ui/StatCard";
import UserService from "~/services/UserService";

function Profile() {
  type takeUser = {
    email: string;
    nameAndSurname: string;
  };

  const [userMe, setUserMe] = useState<takeUser>();

  useEffect(() => {
    const fetchData = async () => {
      let user = await UserService.getMe();
      setUserMe(user);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm relative">
        <div className="bg-(--nord14) w-full max-h-[180px] h-[180px]" />
        {/* Avatar  */}
        <div className="absolute left-8 top-[140px] h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-sm"></div>
        {/* Dane */}
        <div className="px-8 pb-8 pt-12">
          <div className="flex items-start gap-2 flex-col">
              <div className="flex justify-center items-center">
                  <User size={18} className="text-slate-500"/>
                <p className="pl-3 text-[14px]">
                  {userMe?.nameAndSurname}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Mail size={18} className="text-slate-500"/>
                <p className="pl-3 text-[14px]">
                  {userMe?.email}
                </p>
              </div>
          </div>
          {/*  */}
          <div className="min-w-0 gap-8 flex justify-between">
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
