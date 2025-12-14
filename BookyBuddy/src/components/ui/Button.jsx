// UI przycisku

function Button({ text }) {
  return (
    <>
      <button
        className="rounded-lgtext-white rounded-lg hover:opacity-90 transition-opacity mb-4 bg-amber-400"
        type="button"
      >
        <p>{text}</p>
      </button>
    </>
  );
}

export default Button;
