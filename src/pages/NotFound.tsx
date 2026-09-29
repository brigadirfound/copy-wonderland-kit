import { ButtonLink } from "@/components/ButtonLink";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Страница не найдена");

  return (
    <section className="relative isolate flex min-h-[85svh] items-center overflow-hidden">
      <div className="glow-fallback absolute inset-0 -z-10 opacity-60" />
      <div className="grain" />
      <div className="container-page py-32 text-center">
        <p className="font-display text-[clamp(6rem,26vw,16rem)] font-semibold leading-none tracking-tighter text-primary">404</p>
        <h1 className="display-md mt-6">Такой страницы нет</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Возможно, ссылка устарела. Зато есть кейсы и способ со мной связаться.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink to="/">На главную</ButtonLink>
          <ButtonLink to="/cases" variant="secondary">
            Смотреть кейсы
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
