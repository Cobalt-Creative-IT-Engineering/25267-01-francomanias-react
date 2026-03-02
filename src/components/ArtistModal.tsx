import { acfImage } from "./ACFRenderer";
import { WPContent } from "./UI";

type ProgrammationEntry = {
  id: number;
  slug: string;
  date?: string;
  title?: { rendered?: string };
  acf?: Record<string, unknown>;
  jour?: number[];
  lieu?: number[];
};

function readACFString(acf: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = acf[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

export default function ArtistModal({
  item,
  jourMap,
  lieuMap,
  onClose,
}: {
  item: ProgrammationEntry;
  jourMap: Map<number, string>;
  lieuMap: Map<number, string>;
  onClose: () => void;
}) {
  const acf = item.acf ?? {};
  const artiste = readACFString(acf, "artiste") || item.title?.rendered || "Artiste";
  const image = acfImage(acf, "image") ?? acfImage(acf, "photo") ?? acfImage(acf, "visuel");
  const bio = readACFString(acf, "infos", "description", "bio");
  const style = readACFString(acf, "style", "genre");
  const horaire = readACFString(acf, "horaire", "heure");
  const jourLabels = (item.jour ?? []).map((id) => jourMap.get(id)).filter(Boolean) as string[];
  const lieuLabels = (item.lieu ?? []).map((id) => lieuMap.get(id)).filter(Boolean) as string[];

  return (
    <div className="artist-modal-backdrop" onClick={onClose}>
      <div className="artist-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="artist-modal-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        {image && (
          <img
            src={image.url}
            alt={image.alt || artiste}
            className="artist-modal-image"
            loading="lazy"
            decoding="async"
          />
        )}
        <h3 className="artist-modal-title">{artiste}</h3>

        <div className="artist-modal-tags">
          {jourLabels.map((label) => (
            <span key={`modal-jour-${label}`} className="tag">
              {label}
            </span>
          ))}
          {lieuLabels.map((label) => (
            <span key={`modal-lieu-${label}`} className="tag tag-muted">
              {label}
            </span>
          ))}
        </div>

        {(style || horaire) && (
          <div className="artist-modal-meta">
            {style && (
              <p>
                <strong>Style:</strong> {style}
              </p>
            )}
            {horaire && (
              <p>
                <strong>Horaire:</strong> {horaire}
              </p>
            )}
          </div>
        )}

        {bio ? (
          <WPContent html={bio} className="artist-modal-content" />
        ) : (
          <p className="artist-modal-empty">Aucune information complementaire.</p>
        )}
      </div>
    </div>
  );
}
