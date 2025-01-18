import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { DecoratedBox } from '@/components/DecoratedBox.tsx';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-[60px] w-full flex-none items-center border-b-[2px] border-solid border-gray-300 px-6 text-[32px] text-[#394F6E]">
        <h1>올해의 운세 완성</h1>
      </div>
      <article className="my-4 flex h-full w-full flex-col items-stretch px-6">
        <DecoratedBox>
          <div className="flex flex-col items-center gap-8 py-28">
            <img
              src="/images/snake_gradient.png"
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
      <div className="h-[15%] w-full flex-none">
        <button
          className="flex h-12 w-full px-6"
          type="button"
          onClick={() => navigate({ to: '/form' })}
        >
          <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#363E76] text-white">
            2025년 내 사주정보 입력하기
          </div>
        </button>
      </div>
    </section>
  );
}
