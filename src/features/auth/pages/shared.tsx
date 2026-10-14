import type { ReactNode } from 'react'

export function AuthHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: ReactNode }) {
  return <div className="auth-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="heading-description">{description}</p></div>
}
