import Main from "@/components/Main/Main";
import Home from "./home/Home";

// export const metadata: Metadata = {
//   title: "Home",
//   description: "Home page",
// };

export default function HomePage() {
  return (
    <Main className="my-10">
      <Home />
    </Main>
  );
}
