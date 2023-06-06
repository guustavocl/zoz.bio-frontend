import Main from "@/components/Main/Main";
import Home from "./home/Home";
import Users from "./home/Users";

// export const metadata: Metadata = {
//   title: "Home",
//   description: "Home page",
// };

export default function HomePage() {
  return (
    <>
      <Main className="py-24">
        <Home />
        <Users />
      </Main>
    </>
  );
}
