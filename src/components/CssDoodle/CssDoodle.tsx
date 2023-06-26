/* eslint-disable */
"use client";
import Doodle from "@/utils/doodle";
import { useEffect, useState } from "react";

const CssDoodle = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div
      className="default-bg absolute h-screen w-screen select-none"
      style={{
        objectFit: "cover",
        opacity: 0.4,
        backgroundColor: "#080808",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      {ready && (
        <Doodle
          rule={`
            @grid: 1 / 100vw 100vh / #0a0c27;
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
