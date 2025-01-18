import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/form/')({
  component: Form,
});

function Form() {
  return <h1>오운완 form입력 페이지</h1>;
}