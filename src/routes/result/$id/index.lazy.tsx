import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { DecoratedBox } from '@/components/DecoratedBox.tsx';
import { axiosClient } from '@/feature/axios/axios-client.ts';
import { FortuneData } from '@/feature/form/form-response-schema.ts';

export const Route = createLazyFileRoute('/result/$id/')({
  component: Result,
});

function Result() {
  const navigate = useNavigate();
  const [fortuneData, setFortuneData] = useState<FortuneData | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const { id } = Route.useParams();

  const { data, isSuccess } = useQuery({
    queryKey: ['fortune-data'],
    queryFn: async () => await axiosClient.post<FortuneData>(`results/${id}`),
  });

  useEffect(() => {
    if (!id || !isSuccess) {
      return;
    }

    const res = data.data;
    setFortuneData(res);
    const score = Math.floor(
      (res?.health_score +
        res?.job_score +
        res?.love_score +
        res?.money_score) /
        4
    );

    setTotalScore(isNaN(score) ? 0 : score);
  }, [id, data, isSuccess]);

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-[60px] w-full flex-none items-center border-b-[2px] border-solid border-gray-300 px-6 text-[32px] text-[#394F6E]">
        <h1>올해의 운세 완성</h1>
      </div>
      <article className="my-4 flex h-full w-full flex-col items-stretch px-6">
        <DecoratedBox type="short">
          <div className="flex flex-col items-center gap-3 py-6 text-center text-[#363E76]">
            <p className="text-2xl">
              <span className="font-semibold">{fortuneData?.username}</span>{' '}
              님의 <br /> 2025년 운세 총 점수
            </p>
            <p className="text-5xl font-bold">{totalScore}점</p>
          </div>
        </DecoratedBox>
        <section>
          <ul className="mx-auto mt-10 flex max-w-[400px] flex-wrap justify-between gap-8">
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_health.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl text-[#7DBEFF]">
                  {fortuneData?.health_score}점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_money.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl text-[#64CAE2]">
                  {fortuneData?.money_score}점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">재물운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_love.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl text-[#809BFF]">
                  {fortuneData?.love_score}점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">애정운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_job.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl text-[#3DA9F2]">
                  {fortuneData?.job_score}점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">직업운</p>
            </li>
          </ul>
        </section>
      </article>
      <div className="h-[15%] w-full flex-none">
        <button
          className="flex h-12 w-full px-6"
          type="button"
          onClick={() => navigate({ to: `/result/${id}/detail` })}
        >
          <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#363E76] text-white">
            운세 상세 풀이보기
          </div>
        </button>
      </div>
    </section>
  );
}
