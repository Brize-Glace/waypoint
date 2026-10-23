import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'

/**
 * The frame for an app page: sets the document title and renders the page
 * heading, an optional description and optional actions (buttons, links)
 * aligned to the right. Pass `hideTitle` to only set the document title,
 * and `back` for a link to the parent page, shown above the heading.
 */
export default function Page({
  title,
  hideTitle = false,
  back,
  description,
  actions,
  children,
}: {
  title: string
  hideTitle?: boolean
  back?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}) {
  const hasHeader = !hideTitle || description || actions

  return (
    <div className="page">
      <Head title={title} />
      {back}
      {hasHeader && (
        <header className="page__header">
          <div>
            {!hideTitle && <h1 className="page__title">{title}</h1>}
            {description && <p className="page__description">{description}</p>}
          </div>
          {actions && <div className="page__actions">{actions}</div>}
        </header>
      )}
      {children}
    </div>
  )
}
