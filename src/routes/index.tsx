import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="h-full w-full">
      <h1 className="flex h-[40px] w-full items-center p-4">올해 운세 완성</h1>
      <article className="flex h-full w-full flex-col p-4">컨텐츠영역</article>
      <div className="flex items-center justify-center p-4">
        <button className="w-[80%] bg-slate-400 roudn" type="submit">
          {' '}
          2025년 내 사주정보 입력하기
        </button>
      </div>
    </section>
  );
}
