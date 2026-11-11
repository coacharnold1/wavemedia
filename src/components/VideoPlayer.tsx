import Image from "next/image";
import { getEmbedUrl } from "@/lib/portfolio";

interface VideoPlayerProps {
  url?: string;
  title: string;
  poster?: string;
}

export default function VideoPlayer({ url, title, poster }: VideoPlayerProps) {
  const embed = url ? getEmbedUrl(url) : null;

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-wave-dark">
      {embed ? (
        <iframe
          src={embed}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          {poster && <Image src={poster} alt={title} fill className="object-cover" />}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-wave-gold/10 to-wave-dark">
            <div className="text-5xl text-wave-gold mb-2">▶</div>
            <p className="text-wave-gray text-sm">Video coming soon</p>
          </div>
        </>
      )}
    </div>
  );
}
