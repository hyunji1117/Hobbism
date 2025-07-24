// 서버에서 받은 url을 File 객체로 변환
export const converUrlToFile = async (url: string) => {
  const response = await fetch(url);
  const data = await response.blob();
  const extend = url.split('.').pop();
  const fileName = url.split('/').pop();
  const meta = { type: `image/${extend}` };

  return new File([data], fileName as string, meta);
};
// 여러 개의 이미지 URL이 있을 때, 각각을 File로 변환하여 File[] 배열로 반환합니다.
// 반환된 배열은 FormData나 파일업로드에 사용
export const convertUrlsToFile = async (urls: string[]) => {
  const files: File[] = [];
  for (const url of urls) {
    const file = await converUrlToFile(url);
    files.push(file);
  }
  return files;
};

export function getUserImageUrl(image?: string): string {
  console.log('image', image);
  if (!image) return '/images/default-profile-image.webp';

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  if (image.startsWith('files')) {
    return `https://fesp-api.koyeb.app/market/${image}`;
  }

  return '/images/default-profile-image.webp';
}
