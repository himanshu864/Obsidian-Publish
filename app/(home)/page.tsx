import Link from 'next/link'
import { GraphView } from '@/components/graph-view'
import { buildGraph } from '@/lib/build-graph'

export default function HomePage() {
  return (
    <div className="m-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">
        Welcome to my Second Brain 🧠
      </h1>
      <p className="text-sm text-fd-muted-foreground md:text-base">
        You can open{' '}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          /docs
        </Link>{' '}
        and see the documentation.
      </p>
      <article className="container flex flex-col pt-8">
          <GraphView graph={buildGraph()} />
      </article>
    </div>
  )
}