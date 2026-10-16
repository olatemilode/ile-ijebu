export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-dashed border-cocoa/20 px-8 py-16 text-center dark:border-ivory/20">
      <p className="font-display text-xl">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-cocoa/60 dark:text-ivory/60">
        {description}
      </p>
    </div>
  );
}
