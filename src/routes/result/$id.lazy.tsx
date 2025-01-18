import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/result/$id')({
  component: Result,
});

function Result() {
  const { id } = Route.useParams();
  console.log(id);

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-[60px] w-full flex-none items-center border-b-[2px] border-solid border-gray-300 px-6 text-[32px] text-[#394F6E]">
        <h1>올해의 운세 완성</h1>
      </div>
      <article className="my-4 flex h-full w-full flex-col items-stretch px-6">
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
                <img src="/images/snake_love.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl">
                  54점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_love.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl">
                  54점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_love.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl">
                  54점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_love.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl">
                  54점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
          </ul>
        </section>
      </article>
      <div className="h-[15%] w-full flex-none">
        <button className="flex h-10 w-full px-6" type="button">
          <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#29518C] text-white">
            운세 상세 풀이보기
          </div>
        </button>
      </div>
    </section>
  );
}
