export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-20 p-4 w-full shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-900 dark:border-gray-600">
      <span className="text-sm text-gray-400 sm:text-center dark:text-gray-400">
        © 2022
        <a href="https://flowbite.com/" className="px-2 hover:underline">
          ZOZ.GG
        </a>
        <span>
          Developed by
          <a href="guustavocl" className="px-1 hover:underline">
            @guustavocl
          </a>
        </span>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="/terms" className="mr-4 hover:underline md:mr-6">
            Terms of service
          </a>
        </li>
        <li>
          <a href="/privacy" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}
