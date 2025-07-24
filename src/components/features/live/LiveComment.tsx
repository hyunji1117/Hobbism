'use client';

export const LiveComment = ({ liveId }: { liveId: string }) => {
  const embedDomain = process.env.NEXT_PUBLIC_EMBED_DOMAIN;

  return (
    <div className="relative mx-auto h-full w-full overflow-auto">
      <iframe
        src={`https://www.youtube.com/live_chat?v=${liveId}&embed_domain=${embedDomain}`}
        className="absolute top-[-16%] h-full w-full"
      ></iframe>
    </div>
  );
};
