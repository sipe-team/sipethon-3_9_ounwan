import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/form/')({
  component: Form,
});

function Form() {
  return (
    <section className="h-full w-full justify-center">
      <h1 className="flex h-[40px] w-full items-center p-4">
        올해의 운세 완성
      </h1>
      <hr />
      <article className="flex h-full w-full flex-col bg-slate-50 p-4">
        <div className="flex h-full w-full justify-center text-[28px] text-blue-700">
          새로운 사주 정보를 입력해주세요!
        </div>
        <div className="mb-5 flex flex-col">
          <span className="mb-3">이름</span>
          <div className="flex h-10 w-full justify-center">
            <input
              className="h-full w-full rounded-md border border-solid p-3"
              placeholder="홍길동"
            ></input>
          </div>
        </div>

        <div className="mb-5 flex flex-col">
          <span className="mb-3">성별</span>
          <div className="flex h-10 w-full justify-center">
            <button className="mr-5 h-full w-[40%] rounded-md bg-slate-200 hover:bg-blue-500">
              남자
            </button>
            <button className="h-full w-[40%] rounded-md bg-slate-200 hover:bg-blue-500">
              여자
            </button>
          </div>
        </div>

        <div className="flex h-full w-full justify-center text-[28px] text-blue-700"></div>
        <div className="mb-5 flex flex-col">
          <span className="mb-3">생년월일</span>
          <div className="flex h-10 w-full justify-center">
            <input
              className="h-full w-full rounded-md border border-solid p-3"
              placeholder="e.g.20000215"
            ></input>
          </div>
        </div>

        <div className="flex">
          <div>
            <button>양력</button>
          </div>
          <div>
            <button>음력</button>
          </div>
        </div>

        <div className="flex h-full w-full justify-center text-[28px] text-blue-700"></div>
        <div className="mb-5 flex flex-col">
          <span className="mb-3">태어난 시간</span>
          <div className="flex h-10 w-full justify-center">
            <input
              className="h-full w-full rounded-md border border-solid p-3"
              placeholder="e.g. 19:20"
            ></input>
          </div>
        </div>
        {/* 태어난 시간 Input */}
      </article>
      <div className="flex items-center justify-center p-4">
        <button
          className="h-10 w-full rounded-md bg-[#29518C] text-white"
          type="submit"
        >
          2025년 운세 확인하기
        </button>
      </div>
    </section>
  );
}
