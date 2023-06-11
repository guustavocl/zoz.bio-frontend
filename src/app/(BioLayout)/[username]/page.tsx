import { QueryClientProviderComponent } from "@/providers/QueryClientProvider";
import { fetchBioPage } from "@/services/PageService";
import { PageProps } from "@/types/PageProps";
import { ZOZ_META_DESCRIPTION, ZOZ_META_TITLE } from "@/utils/Constants";
import { BioComponent } from "./Bio";
import { NotFound } from "./NotFound";
import "./page.css";

let pageData: PageProps | undefined = undefined;

export async function generateMetadata({ params }: { params: { username: string } }) {
  try {
    if (pageData) {
      return {
        // TODO - generate profile img, change title
        title: `Username: ${params.username}`,
        description: pageData.bio || ZOZ_META_DESCRIPTION,
        // openGraph: {
        //   images: ['/some-specific-page-image.jpg', ...previousImages],
        // },
      };
    }
  } catch (err) {
    console.log(err);
  }

  return {
    title: ZOZ_META_TITLE,
    description: ZOZ_META_DESCRIPTION,
  };
}

export default async function BioPage({ params }: { params: { username: string } }) {
  const res = await fetchBioPage(params.username);
  pageData = res?.page;

  return (
    <main className="flex flex-col items-center justify-between">
      <QueryClientProviderComponent>
        {pageData ? <BioComponent page={pageData} /> : <NotFound username={params.username} />}
      </QueryClientProviderComponent>
    </main>
  );
}
