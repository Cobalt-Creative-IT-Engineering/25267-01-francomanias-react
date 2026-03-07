import { useEffect } from "react";
import { useRoute } from "./hooks/useRoute";
import { Nav, Footer } from "./components/layout";
import { ErrorBanner } from "./components/ui";
import { HomePage }          from "./pages/HomePage";
import { ProgrammationPage } from "./pages/ProgrammationPage";
import { InfosPratiquesPage }     from "./pages/InfosPratiquesPage";
import { InfosPratiques2Page }    from "./pages/InfosPratiques2Page";
import { LeFestivalPage }         from "./pages/LeFestivalPage";
import { LeFestival2Page }        from "./pages/LeFestival2Page";
import { AncieneEditionPage }     from "./pages/AncieneEditionPage";
import { ActualiteDetailPage }    from "./pages/ActualiteDetailPage";
import { WPPageView }        from "./pages/WPPageView";
import { ACTIVE_THEME }      from "./config/site";
import { THEMES }            from "./themes/index";
import { Decorations }       from "./themes/Decorations";
import { initMeta, setPageMeta } from "./lib/meta";

// ─── Application du thème ─────────────────────────────────────────────────────
const _theme = THEMES[ACTIVE_THEME];
document.documentElement.classList.add(_theme.cssClass);
if (_theme.fontsUrl) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = _theme.fontsUrl;
  document.head.appendChild(link);
}
// ──────────────────────────────────────────────────────────────────────────────

const PAGE_LABELS: Record<string, string> = {
  "#/programmation":  "Programmation",
  "#/informations":   "Infos pratiques",
  "#/festival":       "Le Festival",
  "#/le-festival":    "Le Festival",
  "#/billetterie":    "Billetterie",
};

function getPageLabel(route: string): string | undefined {
  if (route === "#/" || route === "") return undefined;
  if (PAGE_LABELS[route]) return PAGE_LABELS[route];
  if (route.startsWith("#/programmation/")) return "Programmation";
  if (route.startsWith("#/edition/"))       return "Archives";
  if (route.startsWith("#/actualite/"))     return "Actualités";
  return undefined;
}

export default function App() {
  const { route, slug, anchor } = useRoute();

  // Infos du site WordPress (une seule fois) → initialise le module meta
  useEffect(() => {
    fetch("/wp-json/")
      .then((r) => r.json())
      .then((d) => { initMeta(d?.name ?? "", d?.description ?? ""); })
      .catch(() => {});
  }, []);

  // Meta par défaut selon la route (les pages de détail écrasent avec leurs propres infos)
  useEffect(() => {
    setPageMeta({ title: getPageLabel(route) });
  }, [route]);

  // Scroll : ancre si présente, sinon remonte en haut
  useEffect(() => {
    if (anchor) {
      const t = setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [route, anchor]);

  return (
    <div className="app">
      <Decorations />
      <Nav />
      <PageView route={route} slug={slug} />
      <Footer />
    </div>
  );
}

function PageView({ route, slug }: { route: string; slug: string | null }) {
  if (route === "#/" || route === "")        return <HomePage />;
  if (route === "#/programmation")           return <ProgrammationPage />;
  if (route.startsWith("#/programmation/"))  return <ProgrammationPage initialSlug={route.replace("#/programmation/", "")} />;
  if (route === "#/informations")            return <InfosPratiquesPage />;
  if (route === "#/festival")                return <LeFestivalPage />;
  if (route === "#/le-festival")             return <LeFestivalPage />;
  if (route === "#/festival-2")              return <LeFestival2Page />;
  if (route === "#/informations-2")          return <InfosPratiques2Page />;
  if (route.startsWith("#/edition/"))        return <AncieneEditionPage slug={route.replace("#/edition/", "")} />;
  if (route.startsWith("#/actualite/"))      return <ActualiteDetailPage slug={route.replace("#/actualite/", "")} />;
  if (route.startsWith("#/page/") && slug)   return <WPPageView slug={slug} />;
  return <ErrorBanner message="Page non trouvée" />;
}
