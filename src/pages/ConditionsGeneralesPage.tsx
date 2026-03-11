import { useGraphQLSiteOptions } from "../hooks/useWordPress";
import { WPContent, Skeleton } from "../components/ui";

export function ConditionsGeneralesPage() {
  const { data, status } = useGraphQLSiteOptions();
  const contenu = data?.conditionsGenerales?.conditionsGeneralesContent?.presentationContenu;

  return (
    <main className="page-content">
      <h1>Conditions générales</h1>
      {status === "loading" && !data ? (
        <div className="prose-custom">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-4 w-full mb-3" />)}
        </div>
      ) : contenu ? (
        <WPContent html={contenu} className="prose-custom" />
      ) : null}
    </main>
  );
}
