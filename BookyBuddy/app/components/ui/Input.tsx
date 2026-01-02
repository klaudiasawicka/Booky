function Input({ ...props }) {
  return (
    <input
      className={
        "w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 "
      }
      {...props}
    />
  );
}
export default Input;
