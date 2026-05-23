import { days } from "@/data/days";

export default function Unidad1() {
  const unitDays = days["m2-u1"] || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Modulo 2 - Unidad 1
      </h1>

      {unitDays.map((day) => (
        <div key={day.id} className="p-4 bg-zinc-900 rounded-xl">
          <h2 className="text-xl font-semibold">{day.title}</h2>
        </div>
      ))}
    </div>
  );
}