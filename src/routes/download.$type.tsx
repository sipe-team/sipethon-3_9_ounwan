import { DecoratedBox } from '@/components/DecoratedBox';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/download/$type')({
  component: FortuneImage,
});

function FortuneImage() {
  // Add type to useParams
  const { type } = Route.useParams();

  const handleDownload = async () => {
    try {
      // 이미지 URL
      const imageUrl = `/images/charm_${type}.png`;

      // 이미지를 Blob으로 가져오기
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // 다운로드 링크 생성
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `fortune_charm_${type}.png`; // 다운로드될 파일명

      // 다운로드 트리거
      document.body.appendChild(link);
      link.click();

      // 클린업
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('이미지 다운로드 중 오류가 발생했습니다:', error);
      alert('이미지 다운로드에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="h-screen w-full">
      <DecoratedBox>
        <div className="h-[calc(100vh-100px)] w-full">
          <section className="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
            <div className="text-[24px] font-bold text-[#363E76]">
              청사(靑蛇)의 해
            </div>
            <div className="text-[24px] font-bold text-[#363E76]">만사형통</div>
            <img
              src={`/images/charm_${type}.png`}
              alt="운세 이미지"
              width={260}
              height={347}
              className="h-auto max-w-full"
            />
          </section>
        </div>
      </DecoratedBox>
      <div className="flex h-[80px] w-full items-center justify-center">
        <button
          className="h-10 w-[100px] rounded-[12px] bg-[#363E76] text-white"
          type="button"
          onClick={handleDownload}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default FortuneImage;
