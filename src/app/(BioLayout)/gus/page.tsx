import { QueryClientProviderComponent } from "@/providers/QueryClientProvider";
import { BioComponent } from "./BioSsr";
import { getPage } from "@/services/PageService";

export default async function BioPage() {
  const res = await getPage("gustavo");
  return (
    <main className="flex flex-col items-center justify-between">
      <QueryClientProviderComponent>
        {res?.page ? <BioComponent page={res?.page} /> : <div>... loading</div>}
      </QueryClientProviderComponent>
    </main>
  );
}
