import { getBadge } from "@/utils/IconsList";
import { memo } from "react";
import { RgbaColor } from "react-colorful";

const BioBadges = ({ badges, color }: { badges?: string[]; color: RgbaColor }) => {
  return (
    <div className="mt-3 flex flex-row flex-wrap justify-center gap-2">
      {badges &&
        badges.map((badge, idx) =>
          getBadge(badge) ? (
            <span
              key={idx}
              className="whitespace-nowrap rounded px-1 py-0.5 text-xs font-semibold shadow-sm shadow-black/50 border-[1.5px]"
              style={{
                borderColor: `rgb(${color.r},${color.g},${color.b},${color.a})`,
              }}
            >
              {getBadge(badge)?.label}
            </span>
          ) : null
        )}
    </div>
  );
};
export default memo(BioBadges);
