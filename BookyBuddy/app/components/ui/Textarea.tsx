function Textarea({ ...props }) {
  return (
    <textarea
      className={
        "w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 pl-10"
      }
      {...props}
    />
  );
}
export default Textarea;
