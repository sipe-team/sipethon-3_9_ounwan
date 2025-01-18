import { ReactNode } from 'react';

interface DecoratedBoxInterface {
  children: ReactNode;
}

export function DecoratedBox({ children }: DecoratedBoxInterface) {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-0 flex justify-between">
        <img src="/src/assets/deco.png" alt="" />
        <img src="/src/assets/deco.png" className="scale-x-[-1]" alt="" />
      </div>
      {children}
      <div className="absolute bottom-0 left-0 right-0 flex scale-y-[-1] justify-between">
        <img src="/src/assets/deco.png" alt="" />
        <img src="/src/assets/deco.png" className="scale-x-[-1]" alt="" />
      </div>
    </div>
  );
}
