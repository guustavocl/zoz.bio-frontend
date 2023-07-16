import Redirect from "@/components/Redirect";
import AccountComponent from "./Account";
import { cookies } from "next/headers";
import { QueryClientProviderComponent } from "@/providers/QueryClientProvider";
import Main from "@/components/Main/Main";

export default function AccountPage() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  // TODO - userCookie is enought to validate this I think, just test and remove const user
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  if (user)
    return (
      <Main>
        <QueryClientProviderComponent>
          <AccountComponent />
        </QueryClientProviderComponent>
      </Main>
    );
  else return <Redirect />;
}
