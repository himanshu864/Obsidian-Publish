// import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsLayout } from 'fumadocs-ui/layouts/notebook'
import type { ReactNode } from 'react'
import { baseOptions } from '@/app/layout.config'
import { source } from '@/lib/source'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      githubUrl="https://github.com/himanshu864/DevObs"
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  )
}
