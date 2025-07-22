export const LiveVideo = ({ livePath }: { livePath: string }) => {
  return (
    <div className="mx-auto h-full w-full md:w-full">
      {/* 라이브 영상 */}
      {/* 자동재생 방법: &autoplay=1&mute=1, 대부분의 브라우저에서 자동재생을 음소거 상태에서만 제공 */}
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${livePath}&autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};
