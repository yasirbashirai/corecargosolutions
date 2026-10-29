import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import { IconArrow, IconCheck } from "@/components/icons";
import { formatDate, getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every article at build time
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date, images: [post.image] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `${site.url}${post.image}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      <header className="bg-navy-gradient text-white">
        <div className="container-x max-w-4xl py-16 sm:py-20">
          <nav className="text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link> / <Link href="/blog" className="hover:text-white">Blog</Link>
          </nav>
          <p className="eyebrow mt-6 text-azure-light">{post.keyword}</p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-sm text-white/60">{formatDate(post.date)} · {post.readMins} min read · {site.name}</p>
        </div>
      </header>

      <div className="container-x -mt-1 max-w-6xl">
        <div className="relative -mt-0 aspect-[21/9] overflow-hidden rounded-b-[2rem]">
          <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width:1152px) 1152px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="container-x grid max-w-6xl gap-12 py-16 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <p className="text-xl leading-relaxed text-graphite">{post.intro}</p>
          {post.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-2xl font-extrabold">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-lg leading-relaxed text-steel">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-5 space-y-3">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 text-lg text-graphite">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white"><IconCheck className="h-3.5 w-3.5" /></span>
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* Sticky quote form beside the article */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <QuoteForm title="Need it moved today?" />
        </aside>
      </div>

      {/* Related articles */}
      <section className="bg-mist py-16">
        <div className="container-x max-w-6xl">
          <h2 className="text-2xl font-extrabold">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex gap-5 rounded-3xl border border-line bg-white p-4 transition hover:shadow-xl">
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="112px" className="object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="eyebrow text-azure">{p.keyword}</p>
                  <h3 className="mt-2 font-bold leading-snug">{p.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-azure">Read <IconArrow className="h-4 w-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
