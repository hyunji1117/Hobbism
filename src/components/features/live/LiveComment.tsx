'use client';

export const LiveComment = ({ liveId }: { liveId: string }) => {
  const embedDomain = process.env.NEXT_PUBLIC_EMBED_DOMAIN;

  return (
    // <div className="relative bottom-0 mx-auto h-full w-full overflow-hidden">
    //   <iframe
    //     src={`https://www.youtube.com/live_chat?v=${liveId}&embed_domain=${embedDomain}`}
    //     className="absolute bottom-0 left-0 h-[calc(100%+64px)] w-full"
    //   ></iframe>
    // </div>
    <iframe
      src={`https://www.youtube.com/live_chat?v=${liveId}&embed_domain=${embedDomain}`}
      className="h-full w-full"
    ></iframe>
  );
};
