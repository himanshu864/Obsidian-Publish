import { notFound } from 'next/navigation'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { aboutSource } from '@/lib/source'

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const page = aboutSource.getPage([params.slug])

  if (!page) notFound()
  const Mdx = page.data.body

  return (
    <div className="max-w-3xl m-auto">
      <div className="container rounded-xl border py-12 md:px-8 mt-8">
        <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
        <p className="text-fd-muted-foreground">{page.data.description}</p>
        {/* <Link href="/blog">Back</Link> */}
      </div>
      <article className="container flex flex-col px-4 py-8">
        <div className="prose min-w-0">
          {/* <InlineTOC items={page.data.toc} /> */}
          <Mdx components={defaultMdxComponents} />
        </div>
        {/* <div className="flex flex-col gap-4 text-sm">
          <div>
            <p className="mb-1 text-fd-muted-foreground">Written by</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
            <p className="font-medium">
              {new Date(page.data.date).toDateString()}
            </p>
          </div>
        </div> */}
      </article>
    </div>
  )
}

export function generateStaticParams(): { slug: string }[] {
  return aboutSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }))
}
