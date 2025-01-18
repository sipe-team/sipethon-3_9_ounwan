import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/result/$id')({
  component: Result,
});

function Result() {
  const { id } = Route.useParams();
  console.log(id);

  return (
    <section className="h-full w-full">
      <h1 className="flex h-[40px] w-full items-center p-4">올해 운세 완성</h1>
      <article className="flex h-full w-full flex-col items-stretch p-4">
        <section className="flex flex-col items-center gap-3 text-center text-[#363E76]">
          <p className="text-2xl">
            <span className="font-semibold">홍길동</span> 님의 <br /> 2025년
            운세 총 점수
          </p>
          <p className="text-5xl font-bold">85점</p>
        </section>
        <section>
          <ul className="mx-auto mt-10 flex max-w-[400px] flex-wrap justify-between gap-8">
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/snake_skyblue.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl">
                  54점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/snake_skyblue.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl">
                  54점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/snake_skyblue.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl">
                  54점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/snake_skyblue.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl">
                  54점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
          </ul>
        </section>
      </article>
      <div className="flex items-center justify-center p-4">
        <button className="w-full rounded bg-slate-400" type="submit">
          운세 상세 풀이보기
        </button>
      </div>
    </section>
  );
}
