import { QueryClientProviderComponent } from "@/providers/QueryClientProvider";
import { fetchEditPage } from "@/services/PageService";
import { PageProps } from "@/types/PageProps";
import { ZOZ_META_DESCRIPTION, ZOZ_META_TITLE } from "@/utils/Constants";
// import "./page.css";
import { EditComponent } from "./Edit";
import { NotFound } from "../../[username]/NotFound";

let pageData: PageProps | undefined = undefined;

export async function generateMetadata({ params }: { params: { username: string } }) {
  if (pageData) {
    return {
      // TODO - generate profile img, change title
      title: `zoz.bio - ${params.username}`,
      description: pageData.bio || ZOZ_META_DESCRIPTION,
      // openGraph: {
      //   images: ['/some-specific-page-image.jpg', ...previousImages],
      // },
    };
  }

  return {
    title: ZOZ_META_TITLE,
    description: ZOZ_META_DESCRIPTION,
  };
}

export default async function BioPage({ params }: { params: { username: string } }) {
  const res = await fetchEditPage(params.username);
  pageData = res?.page;

  return (
    <main className="flex flex-col items-center justify-between">
      <QueryClientProviderComponent>
        {pageData ? <EditComponent page={pageData} /> : <NotFound username={params.username} />}
      </QueryClientProviderComponent>
    </main>
  );
}
