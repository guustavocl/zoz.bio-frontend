export default function Footer() {
  return (
    <footer className="w-full bg-secondary relative md:fixed md:bottom-0 h-auto md:h-14 items-center justify-center content-center text-base p-2">
      {/* <footer className="w-full flex flex-row items-center justify-center bottom-0 text-base relative md:fixed left-0 p-2 shadow md:flex md:items-center md:justify-between md:p-4 bg-secondary"> */}
      <div className="w-full h-full flex flex-row items-center justify-center">
        <div className="w-full lg:max-w-7xl flex flex-col md:flex-row justify-between items-center">
          <span className="text-md text-gray-400 text-center">
            © 2022
            <span className="px-2 hover:text-violet-600">ZOZ.GG</span>
            <span>
              Developed by
              <a
                href="gustavo"
                rel="noopener noreferrer"
                className="px-1 hover:underline hover:text-violet-600"
              >
                @gustavo
              </a>
            </span>
          </span>
          <ul className="flex flex-wrap items-center justify-center mt-3 text-md text-gray-400 sm:mt-0">
            <li>
              <a
                href="/about"
                rel="noopener noreferrer"
                className="mr-4 hover:underline hover:text-violet-600"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/terms"
                rel="noopener noreferrer"
                className="mr-4 hover:underline hover:text-violet-600"
              >
                Terms of service
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                rel="noopener noreferrer"
                className="mr-4 hover:underline hover:text-violet-600"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/contact"
                rel="noopener noreferrer"
                className="mr-4 hover:underline hover:text-violet-600"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
