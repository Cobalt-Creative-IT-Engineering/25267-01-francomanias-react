import { useGraphQLSiteOptions } from "../hooks/useWordPress";

export function BilletteriePage() {
  const { data } = useGraphQLSiteOptions();
  const ticketUrl =
    data?.billetterie?.billeterieOptions?.url ||
    (import.meta.env.VITE_TICKETING_URL as string | undefined) ||
    "";

  return (
    <main className="page-content">
      <div className="page-header">
        <h1 className="page-title">Billetterie</h1>
        <p className="page-subtitle">Réserve tes places en ligne</p>
      </div>

      <section className="ticket-info">
        <div>
          <h2 className="ticket-title">Pass festival &amp; journée</h2>
          <p className="ticket-copy">
            Accès à toutes les scènes, zones chill et expériences immersives. Places limitées.
          </p>
        </div>
        <div className="ticket-grid">
          <TicketCard label="Pass 3 jours" price="89 CHF" />
          <TicketCard label="Journée"      price="35 CHF" />
          <TicketCard label="Étudiant"     price="25 CHF" />
        </div>
      </section>

      {ticketUrl && (
        <div className="ticket-cta-wrapper">
          <a
            href={ticketUrl}
            target="_blank"
            rel="noreferrer"
            className="ticket-cta-btn"
          >
            Réserver mes places →
          </a>
        </div>
      )}
    </main>
  );
}

function TicketCard({ label, price }: { label: string; price: string }) {
  return (
    <div className="ticket-card">
      <p className="ticket-label">{label}</p>
      <p className="ticket-price">{price}</p>
    </div>
  );
}
