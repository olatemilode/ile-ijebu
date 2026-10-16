export function BeadedDivider() {
  return (
    <div className="beaded-divider" aria-hidden="true">
      {Array.from({ length: 15 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
