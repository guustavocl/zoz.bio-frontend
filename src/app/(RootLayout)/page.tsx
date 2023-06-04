import Home from "./home/Home";
import Users from "./home/Users";

// export const metadata: Metadata = {
//   title: "Home",
//   description: "Home page",
// };

export default function PageComponent() {
  return (
    <>
      <main className="mx-8 flex w-full flex-col items-center justify-between py-24 md:mx-14 lg:max-w-6xl">
        <Home />
        <Users />
      </main>
    </>
  );
}
