function Button({ className = "", ...props }) {
  return (
    <button
      className={
        "h-11 rounded-xl px-4 text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed " +
        className
      }
      {...props}
    />
  );
}

export default Button;
