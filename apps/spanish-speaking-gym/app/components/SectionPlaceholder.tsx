export function SectionPlaceholder({
  title,
  description =
    'This section works with local defaults. Any voice, sync, or external integrations remain optional and can be enabled later in settings.',
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
