import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, useWatch } from 'react-hook-form';
import { axiosClient } from '../../feature/axios/axios-client';
import { FortuneData } from '../../feature/form/form-response-schema';
import { cn } from '../../utils/tw-merge';

interface DefaultFormValues {
  name: string;
  gender: 'Male' | 'Female';
  birthday: string;
  birthtime: string;
  isLunar: boolean;
}

export const Route = createFileRoute('/form/')({
  component: Form,
});

function Form() {
  const navigate = useNavigate();
  const { mutateAsync: submitFortune, isPending } = useMutation({
    mutationFn: async (formData: DefaultFormValues) => {
      const response = await axiosClient.post<FortuneData>(
        '/results',
        formData
      );
      return response.data;
    },
    onError: (error: unknown) => {
      alert('운세 정보 제출에 실패했습니다. 다시 시도해주세요.');
    },
  });
  const queryClient = useQueryClient();
  const [isAlertOpen, setAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<DefaultFormValues>({
    defaultValues: {
      name: '',
      gender: 'Male',
      birthday: '',
      birthtime: '',
      isLunar: false,
    },
  });
  const [gender, isLunar] = useWatch({
    control,
    name: ['gender', 'isLunar'],
  });

  const onSubmit = async (data: DefaultFormValues) => {
    try {
      const res = await submitFortune(data);
      const id = res.id;
      queryClient.setQueryData(['fortune-data'], res);
      navigate({ to: '/result/$id', params: { id } });
    } catch (error) {}
  };

  const onError = (errors: any) =>
    (errors.name || errors.birthday || errors.birthtime) && setAlertOpen(true);

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
              onClick={() => setValue('gender', 'Male')}
              className={cn('h-full flex-1 rounded-[8px] bg-[#EDEDED]', {
                'bg-[#394F6E]': gender === 'Male',
                'text-white': gender === 'Male',
              })}
            >
              남자
            </button>
            <button
              type="button"
              onClick={() => setValue('gender', 'Female')}
              className={cn('h-[37px] flex-1 rounded-[8px] bg-[#EDEDED]', {
                'bg-[#394F6E]': gender === 'Female',
                'text-white': gender === 'Female',
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
              {...register('birthtime', {
                required: '태어난 시간을 입력해주세요',
                pattern: {
                  value: /^([01][0-9]|2[0-3]):([0-5][0-9])$/,
                  message: `올바른 시간 형식으로 입력해주세요(예: 18:20)`,
                },
              })}
            ></input>
          </div>
        </section>
      </article>
      <div className="h-[15%] w-full flex-none">
        <button className="flex h-12 w-full px-6" type="submit">
          <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#29518C] text-white">
            2025년 운세 확인하기
          </div>
        </button>
      </div>
      <CustomAlertDialog
        isOpen={isAlertOpen}
        errors={errors}
        setAlertOpen={setAlertOpen}
      />
      <LoadingOverlay isPending={isPending} />
    </form>
  );
}

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LoadingSnake } from '@/feature/lottie/loading';
import { useState } from 'react';

export function CustomAlertDialog({
  isOpen,
  errors,
  setAlertOpen,
}: {
  isOpen: boolean;
  errors: any;
  setAlertOpen: (isOpen: boolean) => void;
}) {
  const getFirstErrorMessege = (errors: any) => {
    if (errors?.name) {
      return errors.name.message;
    }
    if (errors?.birthday) {
      return errors.birthday.message;
    }
    if (errors?.birthtime) {
      return errors.birthtime.message;
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setAlertOpen}>
      <AlertDialogContent className="w-[90%] max-w-[400px] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-[#394F6E]">
            {getFirstErrorMessege(errors)}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex h-10 w-full justify-center sm:justify-center">
          <AlertDialogCancel
            className="w-[100px] justify-center self-center border-[2px] border-solid border-[#394F6E] text-center"
            onClick={() => setAlertOpen(false)}
          >
            닫기
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function LoadingOverlay({ isPending }: { isPending: boolean }) {
  return (
    <AlertDialog open={isPending}>
      <AlertDialogTitle hidden={true} />
      <AlertDialogContent className="h-full max-w-[500px]">
        <AlertDialogDescription className="flex h-full w-full flex-col items-center justify-center">
          사주분석중...
          {isPending && (
            <div className="my-10">
              <LoadingSnake />
            </div>
          )}
          2025년은 소띠, 뱀띠 닭띠의 운세가 좋아요
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
