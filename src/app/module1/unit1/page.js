import { days } from "@/data/days";

export default function Unidad1() {
  const unitDays = days["m1-u1"] || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Modulo 1 - Unidad 1
      </h1>

      {unitDays.map((day) => (
        <div key={day.id} className="p-4 bg-zinc-900 rounded-xl space-y-2">
          <h2 className="text-xl font-semibold">{day.title}</h2>

          {day.instructions && (
            <p className="text-zinc-300">{day.instructions}</p>
          )}

          {day.videoLinks?.map((v, i) => (
            <a key={i} href={v} className="text-blue-400">
              Video {i + 1}
            </a>
          ))}

          {day.exerciseLinks?.map((e, i) => (
            <a key={i} href={e} className="text-green-400">
              Exercise {i + 1}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}