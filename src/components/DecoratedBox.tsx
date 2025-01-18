import { ReactNode } from 'react';

interface DecoratedBoxInterface {
  type?: 'short' | 'long';
  children: ReactNode;
}

export function DecoratedBox({
  type = 'long',
  children,
}: DecoratedBoxInterface) {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-0 flex justify-between">
        <img
          src={`/images/frame_${type}.png`}
          className="w-[108px] scale-x-[-1]"
          alt=""
        />
        <img src={`/images/frame_${type}.png`} className="w-[108px]" alt="" />
      </div>
      {children}
      <div className="absolute bottom-0 left-0 right-0 flex scale-y-[-1] justify-between">
        <img
          src={`/images/frame_${type}.png`}
          className="w-[108px] scale-x-[-1]"
          alt=""
        />
        <img src={`/images/frame_${type}.png`} className="w-[108px]" alt="" />
      </div>
    </div>
  );
}
