import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow text-azure">404</p>
      <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">This route does not exist.</h1>
      <p className="mt-4 text-steel">The page you are looking for has moved or was never here.</p>
      <div className="mt-8"><Button href="/">Back to home</Button></div>
    </section>
  );
}
