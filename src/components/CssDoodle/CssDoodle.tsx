/* eslint-disable */
"use client";
import Doodle from "@/utils/doodle";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const CssDoodle = ({ className }: { className?: string }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div
      className={twMerge("select-none fixed top-0", className)}
      style={{
        objectFit: "cover",
        opacity: 0.05,
        backgroundColor: "#000",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {ready && (
        <Doodle
          rule={`
            @grid: 1 / 100vw 100vh / #0a0c27;
            background-repeat: repeat;
            background-size: cover;
            background-size: 200px 200px;
            background-image: @doodle(
              @grid: 6 / 100%;
              @size: 4px;
              font-size: 4px;
              color: hsl(@r240, 30%, 50%);
              box-shadow: @m3x5(
                calc(4em - @nx * 1em) calc(@ny * 1em)
                  @p(@m3(currentColor), @m2(transparent)),
                calc(2em + @nx * 1em) calc(@ny * 1em)
                  @lp
              );
            );
          `}
        />
      )}
    </div>
  );
};
export default CssDoodle;
