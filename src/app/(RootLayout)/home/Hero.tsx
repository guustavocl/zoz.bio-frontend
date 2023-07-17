import Socials from "./Socials";

const Hero = () => {
  return (
    <section className="mb-12 grid grid-cols-12">
      <div className="mr-auto place-self-center col-span-12 w-full text-center">
        <Socials />
        <h1 className="mb-4 text-6xl font-extrabold tracking-tight leading-none text-center w-full gap-2 justify-center items-center">
          Link all your socials in one place
        </h1>
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-center w-full">
          <span className="text-violet-400">zoz.bio/</span>
          <span className="text-secondary">username</span>
        </h1>
        <p className="mb-6 font-light text-gray-500 lg:mb-8 text-2xl lg:text-xl dark:text-gray-400">
          From checkout to global sales tax compliance, companies around the world use Flowbite to simplify their
          payment stack.
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          Create Account
        </a>
      </div>
    </section>
  );
};
export default Hero;
