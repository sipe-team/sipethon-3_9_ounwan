import { useEffect, useState } from 'react';

import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

import { FortuneData } from '@/feature/form/form-response-schema.ts';
import { axiosClient } from '@/feature/axios/axios-client.ts';

import { DecoratedBox } from '@/components/DecoratedBox.tsx';

export const Route = createLazyFileRoute('/result/$id')({
  component: Result,
});

function Result() {
  const navigate = useNavigate();
  const [data, setData] = useState<FortuneData | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const { id } = Route.useParams();
  const { mutateAsync: getFortuneData, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosClient.post<FortuneData>(`results/${id}`);
      return response.data;
    },
    onError: () => {
      alert('운세 정보 조회에 실패했습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await getFortuneData(id);
          setData(res);
          setTotalScore(
            Math.floor(
              (res.health_score +
                res.job_score +
                res.love_score +
                res.money_score) /
                4
            )
          );
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-[60px] w-full flex-none items-center border-b-[2px] border-solid border-gray-300 px-6 text-[32px] text-[#394F6E]">
        <h1>올해의 운세 완성</h1>
      </div>
      <article className="my-4 flex h-full w-full flex-col items-stretch px-6">
        <DecoratedBox type="short">
          <div className="flex flex-col items-center gap-3 py-6 text-center text-[#363E76]">
            <p className="text-2xl">
              <span className="font-semibold">{data?.username}</span> 님의{' '}
              <br /> 2025년 운세 총 점수
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
                  {data?.health_score}점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">건강운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_money.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl text-[#64CAE2]">
                  {data?.money_score}점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">재물운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_love.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl text-[#809BFF]">
                  {data?.love_score}점
                </span>
              </div>
              <p className="ml-auto w-[80%] pt-1 text-center text-xl">애정운</p>
            </li>
            <li className="max-w-[180px] flex-[30%]">
              <div className="relative">
                <img src="/images/snake_job.png" alt="" />
                <span className="absolute left-[34%] top-[19%] flex h-[66%] w-[53%] items-center justify-center text-2xl text-[#3DA9F2]">
                  {data?.job_score}점
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
