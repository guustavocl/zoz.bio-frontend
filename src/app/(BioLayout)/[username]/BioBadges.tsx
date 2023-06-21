import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { getBadge } from "@/utils/IconsList";
import { memo } from "react";

const BioBadges = ({ page }: { page: PageProps }) => {
  const badges = page?.badges?.length > 0 ? page.badges : defaultPage.pageBadges;
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;

  return (
    <div className="py-2 flex flex-row flex-wrap justify-center gap-2">
      {badges &&
        badges.map((badge, idx) =>
          getBadge(badge) ? (
            <span
              key={idx}
              className="whitespace-nowrap rounded px-1 py-0.5 text-xs font-semibold shadow-sm shadow-black/50 border-[1.5px]"
              style={{
                borderColor: `rgb(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},${secondaryColor.a})`,
                color: fontColor,
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
