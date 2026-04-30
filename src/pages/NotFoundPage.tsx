import { navigate } from "../hooks/useRoute";

export function NotFoundPage() {
  return (
    <main className="page-content not-found-page">
      <div className="not-found-inner">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page introuvable</h1>
        <p className="not-found-text">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>
      </div>
    </main>
  );
}
