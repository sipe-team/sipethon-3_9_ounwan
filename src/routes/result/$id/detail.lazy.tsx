import { useEffect, useState } from 'react';

import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQuery } from '@tanstack/react-query';

import { FortuneData } from '@/feature/form/form-response-schema.ts';
import { axiosClient } from '@/feature/axios/axios-client.ts';
import { mapFortuneData, MappedFortune } from '@/utils/fortuneMapper.ts';
import { cn } from '@/utils/tw-merge.ts';

export const Route = createLazyFileRoute('/result/$id/detail')({
  component: Detail,
});

const tabs = [
  {
    type: 'health',
    displayName: '건강운',
  },
  {
    type: 'money',
    displayName: '재물운',
  },
  {
    type: 'love',
    displayName: '애정운',
  },
  {
    type: 'job',
    displayName: '직업운',
  },
];

function Detail() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [fortuneData, setFortuneData] = useState<MappedFortune[]>([]);
  const [selectedData, setSelectedData] = useState<MappedFortune>();
  const { data, isSuccess } = useQuery({
    queryKey: ['fortune-data'],
    queryFn: async () => await axiosClient.post<FortuneData>(`results/${id}`),
  });

  useEffect(() => {
    if (data) {
      setFortuneData(mapFortuneData(data?.data));
    }
    setSelectedTab('health');
  }, [isSuccess]);

  useEffect(() => {
    setSelectedData(fortuneData.find((data) => data.type === selectedTab));
  }, [fortuneData, selectedTab]);

  function navigateTo() {
    if (fortuneData.length === 0) return null;

    const lowestScoreFortune = fortuneData.reduce((lowest, current) =>
      current.score < lowest.score ? current : lowest
    );

    navigate({ to: `/download/${lowestScoreFortune.type}` });
  }

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-[60px] w-full flex-none items-center border-b-[2px] border-solid border-gray-300 px-6 text-[32px] text-[#394F6E]">
        <h1>올해의 운세 완성</h1>
      </div>
      <article className="my-4 flex h-full w-full flex-col items-stretch px-6">
        <ul className="flex border-b border-[#757AA0] text-center text-lg font-semibold text-[#363E76]">
          {tabs.map(({ type, displayName }) => (
            <li
              key={type}
              className={cn('flex-1', {
                'border-b-[2px] border-[#757AA0]': type === selectedTab,
              })}
            >
              <button
                type="button"
                className="py-1"
                onClick={() => setSelectedTab(type)}
              >
                {displayName}
              </button>
            </li>
          ))}
        </ul>
        <section className="flex flex-col items-center justify-center py-6 text-center text-[#363E76]">
          <p className="text-[46px] font-bold">{selectedData?.score}점</p>
          <p className="mt-4 text-xl font-semibold">{selectedData?.comment}</p>
          <img
            src="/images/snake_normal.png"
            alt=""
            className="mt-4 max-w-44"
          />
        </section>
        <section className="mt-5 flex flex-col justify-center gap-4 text-[#363E76]">
          <div className="flex flex-col gap-2">
            <p className="mt-4 font-semibold">운세 설명</p>
            <p>{selectedData?.desc}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="mt-4 font-semibold">이렇게 보완해 보세요!</p>
            <p>{selectedData?.oneLineComment}</p>
          </div>
        </section>
      </article>
      <div className="h-[15%] w-full flex-none">
        <button className="flex h-12 w-full px-6" type="button">
          <div
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#363E76] text-white"
            onClick={() => navigateTo()}
          >
            운세 업그레이드 부적 ㄱㄱ
          </div>
        </button>
      </div>
    </section>
  );
}
