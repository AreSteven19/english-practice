import { days } from "@/data/days";

export default function UnitPage({ moduleKey, unitKey, title }) {
    const key = `${moduleKey}-${unitKey}`;
    const unitDays = days[key] || [];

    function getYouTubeId(url) {
        const match = url.match(/(?:youtube\.com.*v=|youtu\.be\/)([^&]+)/);
        return match ? match[1] : null;
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">{title}</h1>

            {unitDays.map((day) => (
                <div
                    key={day.id}
                    className="p-4 bg-zinc-900 rounded-xl space-y-6"
                >
                    <h2 className="text-xl font-semibold">{day.title}</h2>

                    {/* INSTRUCTIONS */}
                    {day.instructions?.map((section, i) => (
                        <div key={i} className="space-y-2">

                            <h3 className="text-sm font-semibold text-zinc-200">
                                {section.title}
                            </h3>

                            <div className="space-y-1">
                                {section.content.map((item, j) => {
                                    const isLink = item.startsWith("http");

                                    return (
                                        <p key={j} className="text-zinc-300 leading-relaxed break-all">
                                            {isLink ? (
                                                <>
                                                    <span className="text-green-400 font-medium">Link:</span>{" "}
                                                    <a
                                                        href={item}
                                                        target="_blank"
                                                        className="text-blue-400 hover:underline"
                                                    >
                                                        {item}
                                                    </a>
                                                </>
                                            ) : (
                                                item
                                            )}
                                        </p>
                                    );
                                })}
                            </div>

                        </div>
                    ))}

                    {/* VIDEOS */}
                    {day.videoLinks?.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm uppercase text-zinc-400">
                                Videos
                            </h3>

                            <div className="flex flex-col gap-3">
                                {day.videoLinks.map((url, i) => {
                                    const id = getYouTubeId(url);

                                    return (
                                        <a
                                            key={i}
                                            href={url}
                                            target="_blank"
                                            className="flex items-center gap-3"
                                        >
                                            {id && (
                                                <img
                                                    src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                                                    className="w-20 h-12 rounded-md object-cover"
                                                    alt="video thumbnail"
                                                />
                                            )}

                                            <span className="text-blue-400 text-sm">
                                                Link {i + 1}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* EXERCISES */}
                    {/* EXERCISES */}
                    {day.exerciseLinks?.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm uppercase text-zinc-400">
                                Exercises
                            </h3>

                            <div className="flex flex-col gap-2">
                                {day.exerciseLinks.map((url, i) => (
                                    <div key={i} className="text-sm flex gap-2 items-start">

                                        <span className="text-green-400 font-medium shrink-0">
                                            Link {i + 1}:
                                        </span>

                                        <a
                                            href={url}
                                            target="_blank"
                                            className="!text-blue-400 hover:!text-blue-300 underline break-all"
                                        >
                                            {url}
                                        </a>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}