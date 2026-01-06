// jest to mówienie jakiego typu maja być elementy
type StatCardProps = {
  icon: React.ReactNode;
  value: string | number;
  label: string;
};

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div>
      <div className="bg-slate-200 w-32 h-32 border border-slate-300 rounded-2xl flex flex-col justify-center items-center mt-8 ">
        <div className="">{icon}</div>
        <div className="pt-2">{value}</div>
        <div className="pt-">{label}</div>
      </div>
    </div>
  );
}
export default StatCard;
