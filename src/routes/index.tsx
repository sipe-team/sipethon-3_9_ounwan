import { createFileRoute } from '@tanstack/react-router';
import { DecoratedBox } from '../components/DecoratedBox.tsx';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="h-full w-full">
      <h1 className="flex h-[40px] w-full items-center p-4">올해 운세 완성</h1>
      <article className="flex h-full w-full flex-col items-stretch p-4">
        <DecoratedBox>
          <div className="flex flex-col items-center gap-8 py-28">
            <img
              src="/src/assets/cuteSnake.png"
              className="w-[103px]"
              alt=""
            ></img>
            <p className="text-center text-2xl font-semibold">
              건강, 사랑, 일, 금전까지! <br />
              2025년의 운세를 확인하고 <br />
              부족한 운세는 채워주는 <br />
              나만의 부적 받아가세요~!
            </p>
          </div>
        </DecoratedBox>
        <p className="pt-4 text-gray-500">* 운세는 재미로 보기! 맹신금지X</p>
      </article>
      <div className="flex items-center justify-center p-4">
        <button className="w-full rounded bg-slate-400" type="submit">
          2025년 내 사주정보 입력하기
        </button>
      </div>
    </section>
  );
}
