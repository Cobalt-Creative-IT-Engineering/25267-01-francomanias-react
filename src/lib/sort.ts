/** Tri par acf.ordre (0 = non défini → en dernier), puis par acf.nom alphabétique */
export function byOrdreNom<T extends { acf?: Record<string, unknown> }>(a: T, b: T): number {
  const ao = Number(a.acf?.ordre) || 0;
  const bo = Number(b.acf?.ordre) || 0;
  if (ao !== bo) {
    if (ao === 0) return 1;
    if (bo === 0) return -1;
    return ao - bo;
  }
  const an = String(a.acf?.nom ?? "");
  const bn = String(b.acf?.nom ?? "");
  return an.localeCompare(bn, "fr", { sensitivity: "base" });
}

/** Tri par acf.ordre (0 = non défini → en dernier), puis par title.rendered alphabétique */
export function byOrdreTitre<T extends { acf?: Record<string, unknown>; title?: { rendered?: string } }>(a: T, b: T): number {
  const ao = Number(a.acf?.ordre) || 0;
  const bo = Number(b.acf?.ordre) || 0;
  if (ao !== bo) {
    if (ao === 0) return 1;
    if (bo === 0) return -1;
    return ao - bo;
  }
  const an = String(a.title?.rendered ?? "");
  const bn = String(b.title?.rendered ?? "");
  return an.localeCompare(bn, "fr", { sensitivity: "base" });
}
