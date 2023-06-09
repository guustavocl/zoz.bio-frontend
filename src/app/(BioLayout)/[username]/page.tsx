import { QueryClientProviderComponent } from "@/providers/QueryClientProvider";
import { BioComponent } from "./Bio";

export default function BioPage({ params }: { params: { username: string } }) {
  return (
    <main className="flex flex-col items-center justify-between">
      <QueryClientProviderComponent>
        <BioComponent username={params.username} />
      </QueryClientProviderComponent>
    </main>
  );
}
