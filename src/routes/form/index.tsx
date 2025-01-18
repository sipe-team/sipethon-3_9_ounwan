import { createFileRoute } from '@tanstack/react-router';
import { useForm, useWatch } from 'react-hook-form';
import { cn } from '../../utils/tw-merge';

interface DefaultFormValues {
  name: string;
  gender: 'man' | 'woman';
  birthday: string;
  birthTime: string;
  isLunar: boolean;
}

export const Route = createFileRoute('/form/')({
  component: Form,
});

function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<DefaultFormValues>({
    defaultValues: {
      name: '',
      gender: 'man',
      birthday: '',
      birthTime: '',
      isLunar: true,
    },
  });
  const [gender, isLunar] = useWatch({
    control,
    name: ['gender', 'isLunar'],
  });

  const onSubmit = () => {};

  const onError = (errors: any) => {
    // name, birthday, birthTime 순서로 에러 체크
    if (errors.name) {
      alert(errors.name.message || '하이');
      return;
    }
    if (errors.birthday) {
      alert(errors.birthday.message);
      return;
    }
    if (errors.birthTime) {
      alert(errors.birthTime.message);
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex h-full w-full flex-col"
    >
      <div className="flex h-[60px] w-full flex-none items-center border-b-[2px] border-solid border-gray-300 px-6 text-[32px] text-[#394F6E]">
        <h1>올해의 운세 완성</h1>
      </div>
      <div className="my-4 flex w-full grow-0 items-center justify-start px-6 text-[24px] font-semibold text-[#363E76]">
        새로운 사주 정보를 입력해주세요!
      </div>
      <article className="flex h-[calc(100%-115px)] w-full flex-1 flex-col px-6">
        <section className="mb-6 flex flex-col">
          <span className="mb-1 font-medium">이름</span>
          <div className="flex h-10 w-full justify-center">
            <input
              className="w-full rounded-md border border-solid p-3"
              placeholder="홍길동"
              {...register('name', {
                required: '이름을 입력해주세요',
                validate: {
                  nameValidator: (value: string) =>
                    /^[가-힣]+$/.test(value) || '정확한 이름을 입력해주세요',
                },
              })}
            ></input>
          </div>
        </section>

        <section className="mb-6 flex w-full flex-col">
          <div className="mb-1 font-medium">성별</div>
          <div className="flex h-[37px] w-full justify-between gap-2">
            <button
              type="button"
              onClick={(e) => setValue('gender', 'man')}
              className={cn('h-full flex-1 rounded-[8px] bg-[#EDEDED]', {
                'bg-[#394F6E]': gender === 'man',
                'text-white': gender === 'man',
              })}
            >
              남자
            </button>
            <button
              type="button"
              onClick={() => setValue('gender', 'woman')}
              className={cn('h-[37px] flex-1 rounded-[8px] bg-[#EDEDED]', {
                'bg-[#394F6E]': gender === 'woman',
                'text-white': gender === 'woman',
              })}
            >
              여자
            </button>
          </div>
        </section>

        <section className="mb-6 flex flex-col">
          <span className="mb-1 font-medium">생년월일</span>
          <div className="flex h-10 w-full justify-center">
            <input
              className="h-full w-full rounded-md border border-solid p-3"
              placeholder="e.g.20000215"
              {...register('birthday', {
                required: '생년월일을 입력해주세요',
                pattern: {
                  value: /^\d{8}$/,
                  message: '8자리 숫자로 입력해주세요',
                },
              })}
            ></input>
          </div>
        </section>

        <section className="mb-6 flex">
          <div
            onClick={() => setValue('isLunar', false)}
            className={cn(
              'box-border flex h-10 w-[83px] cursor-pointer items-center justify-center rounded-l-[100px] border border-solid',
              {
                'border-[#394F6E] bg-[#394F6E]': isLunar === false,
              }
            )}
          >
            <button
              type="button"
              className={cn('font-medium', {
                'text-white': isLunar === false,
              })}
            >
              양력
            </button>
          </div>

          <section
            onClick={() => setValue('isLunar', true)}
            className={cn(
              'cursor-poi~nter box-border flex h-10 w-[83px] items-center justify-center rounded-r-[100px] border border-solid',
              {
                'bg-[#394F6E]': isLunar === true,
              }
            )}
          >
            <button
              type="button"
              className={cn('font-medium', {
                'text-white': isLunar === true,
              })}
            >
              음력
            </button>
          </section>
        </section>

        <section className="mb-5 flex flex-col">
          <span className="mb-1 font-medium">태어난 시간</span>
          <div className="flex h-10 w-full justify-center">
            <input
              className="h-full w-full rounded-md border border-solid p-3"
              placeholder="e.g. 19:20"
              {...register('birthTime', {
                required: '태어난 시간을 입력해주세요',
                pattern: {
                  value: /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
                  message: '올바른 시간 형식으로 입력해주세요 (예: 18:20)',
                },
              })}
            ></input>
          </div>
        </section>
      </article>
      <div className="h-[15%] w-full flex-none">
        <button className="flex h-10 w-full px-6" type="submit">
          <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#29518C] text-white">
            2025년 운세 확인하기
          </div>
        </button>
      </div>
    </form>
  );
}
