export function PageHeader({title, lead}: {title: string; lead?: string}) {
  return (
    <header className="border-b border-brown bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <h1 className="font-serif text-4xl leading-tight text-charcoal md:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal-soft">
            {lead}
          </p>
        ) : null}
      </div>
    </header>
  );
}
