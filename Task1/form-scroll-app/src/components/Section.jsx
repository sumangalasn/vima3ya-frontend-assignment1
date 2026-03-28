export default function Section({ title, innerRef, children }) {
  return (
    <div
      ref={innerRef}
      className="py-10 px-6 border-b max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}