import type { VideoEmbed } from "@/lib/video-embed";

type ContentVideoEmbedProps = {
  embed: VideoEmbed;
};

export function ContentVideoEmbed({ embed }: ContentVideoEmbedProps) {
  return (
    <figure className="my-5 overflow-hidden rounded-2xl border border-afca-navy/10 bg-afca-navy shadow-sm">
      <div className="relative aspect-video w-full">
        <iframe
          src={embed.src}
          title={embed.title || "Video"}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {embed.title && (
        <figcaption className="px-4 py-3 text-sm font-medium text-white/90">{embed.title}</figcaption>
      )}
    </figure>
  );
}
