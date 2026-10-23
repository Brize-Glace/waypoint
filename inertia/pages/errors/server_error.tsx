import MarketingLayout from '~/layouts/marketing'

export default function ServerError() {
  return (
    <main className="landing landing--message">
      <div>
        <p className="landing__code">500</p>
        <h1 className="landing__title">Something went wrong on the server.</h1>
        <p className="landing__lead">
          Your logbook is safe. Reload the page in a moment; if it keeps happening, the server logs
          show the exact error.
        </p>
      </div>
    </main>
  )
}

ServerError.layout = [MarketingLayout]
