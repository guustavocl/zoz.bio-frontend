import Redirect from "@/components/Redirect";
import AccountComponent from "./Account";
import { cookies } from "next/headers";
import { QueryClientProviderComponent } from "@/providers/QueryClientProvider";

export default function AccountPage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  if (user)
    return (
      <main className="mx-8 flex w-full flex-col items-center justify-between md:mx-14 lg:max-w-6xl">
        <QueryClientProviderComponent>
          <AccountComponent />
        </QueryClientProviderComponent>
      </main>
    );
  else return <Redirect />;
}
