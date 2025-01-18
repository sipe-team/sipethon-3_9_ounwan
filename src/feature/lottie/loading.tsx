import Lottie from 'react-lottie';
import animationData from './loading_snake_lottie.json';

export function LoadingSnake() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <Lottie options={defaultOptions} height={150} width={155} />
    </>
  );
}
