import { DecoratedBox } from '@/components/DecoratedBox';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/download/')({
  component: FortuneImage,
});

function FortuneImage({ imgType }: { imgType: string }) {
  return (
    <div className="h-full w-full">
      <DecoratedBox>
        <div className="h-screen w-full">
          <section className="flex h-full w-full flex-col items-center justify-center">
            <img src={'/' + imgType}>이미지</img>
            <button>저장하기</button>
          </section>
        </div>
      </DecoratedBox>
    </div>
  );
}
