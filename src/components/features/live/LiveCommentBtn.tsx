export const LiveComment = () => {
  const liveId = 'yf5NOyy1SXU'; // YouTube Live Video ID
  return (
    <div className="relative mx-auto h-full w-full overflow-auto bg-blue-700">
      <iframe
        src={`https://www.youtube.com/live_chat?v=${liveId}&embed_domain=localhost`}
        className="absolute top-[-16%] h-full w-full"
      ></iframe>
    </div>
  );
};
