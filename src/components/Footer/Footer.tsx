import { memo } from "react";
import { Link } from "@/components/Buttons";
import { DISCORD_INVITE } from "@/utils/Constants";

const FooterComponent = () => {
  return (
    <footer className="relative bottom-0 w-full bg-primary-lighter text-gray-400 md:fixed md:whitespace-nowrap">
      <div className="container py-4 flex flex-col lg:flex-row w-full justify-between">
        <span className="text-md select-none text-center">
          © 2023{" - "}
          <span>
            Developed by <Link href="gustavo" label="@gustavo" />
          </span>
        </span>
        <ul className="text-md mx-2 mt-3 flex flex-col items-center sm:flex-row justify-center gap-2 sm:mt-0 lg:gap-4">
          <li>
            <Link href={DISCORD_INVITE} label="Discord" />
          </li>
          <li>
            <Link href="about" label="About" />
          </li>
          <li>
            <Link href="pricing" label="Pricing" />
          </li>
          <li>
            <Link href="terms" label="Terms of Service" />
          </li>
          <li>
            <Link href="privacy" label="Privacy Policy" />
          </li>
          <li>
            <Link href="contact" label="Contact" />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default memo(FooterComponent);
