import { Plus, X } from 'lucide-react';
import { useRef } from 'react';

interface FeedImageUploadProps {
  images?: string[];
  onChange?: (images: string[]) => void;
}

export default function FeedImageUpload({
  images = [],
  onChange,
}: FeedImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !onChange) return;

    // 파일을 URL로 변환 (실제로는 서버 업로드 후 URL 받아야 함)
    const newImages: string[] = [];

    Array.from(files).forEach(file => {
      if (images.length + newImages.length < 5) {
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      }
    });

    onChange([...images, ...newImages]);

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddImage = () => {
    if (images.length >= 5) return;
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index: number) => {
    if (!onChange) return;
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="w-full px-5">
      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* 상단 - 제목과 안내 텍스트 */}
      <div className="mb-3 flex h-6 items-center gap-1">
        <span className="text-lg font-semibold text-black">사진등록</span>
        <span className="text-sm text-[#C3C3C3]">
          (최대 5장입니다) {images.length}/5
        </span>
      </div>

      {/* 하단 - 사진 업로드 UI */}
      <div className="flex gap-3 overflow-x-auto">
        {/* 선택된 이미지들 */}
        {images.map((image, index) => (
          <div key={index} className="relative flex-shrink-0">
            <img
              src={image}
              alt={`업로드 이미지 ${index + 1}`}
              className="h-[100px] w-[100px] rounded-lg object-cover"
            />
            {/* 삭제 버튼 */}
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {/* 빈 슬롯들 (최대 5개까지) */}
        {Array.from({ length: 5 - images.length }, (_, index) => (
          <button
            key={`empty-${index}`}
            onClick={handleAddImage}
            className="flex h-[100px] w-[100px] flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-[#C3C3C3] hover:border-[#FE508B]"
          >
            <Plus size={24} className="text-[#C3C3C3]" />
          </button>
        ))}
      </div>
    </div>
  );
}
