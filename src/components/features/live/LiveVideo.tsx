import { LiveBuyBtn } from '@/components/features/live/LiveBuyBtn';

export const LiveVideo = ({
  livePath,
  id,
}: {
  livePath: string;
  id: string;
}) => {
  return (
    <div className="relative mx-auto h-full w-full md:w-full">
      {/* 상품 설명, 제품 보기 링크 */}
      <div className="absolute top-[calc(70%)] z-1 flex w-full justify-between px-3.5 text-white">
        <span className="flex flex-col justify-end text-xs leading-loose text-[#6B7280]">
          <p>1</p>
        </span>
        <span>
          <p className="text-[40px] font-semibold text-[#FE508B]">1%</p>
          <LiveBuyBtn id={id} />
        </span>
      </div>
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
