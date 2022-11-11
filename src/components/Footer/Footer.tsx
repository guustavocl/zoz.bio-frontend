export default function Footer() {
  return (
    <footer className="bottom-0 text-base relative md:fixed left-0 p-4 w-full shadow md:flex md:items-center md:justify-between md:p-5 bg-secondary">
      <span className="text-md text-gray-500 sm:text-center">
        © 2022
        <span className="px-2 hover:text-gray-100">ZOZ.GG</span>
        <span>
          Developed by
          <a
            href="gustavo"
            className="px-1 hover:underline hover:text-gray-100"
          >
            @gustavo
          </a>
        </span>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-md text-gray-500 sm:mt-0">
        <li>
          <a href="/about" className="mr-4 hover:underline hover:text-gray-100">
            About
          </a>
        </li>
        <li>
          <a href="/terms" className="mr-4 hover:underline hover:text-gray-100">
            Terms of service
          </a>
        </li>
        <li>
          <a
            href="/privacy"
            className="mr-4 hover:underline hover:text-gray-100"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="/contact"
            className="mr-4 hover:underline hover:text-gray-100"
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}
