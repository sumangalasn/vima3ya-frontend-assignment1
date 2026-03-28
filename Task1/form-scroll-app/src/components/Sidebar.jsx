export default function Sidebar({ active }) {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full border-2 transition
          ${
            active.includes(i)
              ? "bg-blue-500 border-blue-500"
              : "border-gray-400"
          }`}
        />
      ))}
    </div>
  );
}