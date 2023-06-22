import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { getBadge } from "@/utils/IconsList";
import { memo } from "react";

const BioBadges = ({ page }: { page: PageProps }) => {
  console.log(page?.badges);
  const badges = page.badges || defaultPage.pageBadges;
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;

  if (badges && badges.length === 0) return null;

  return (
    <div className="py-2 flex flex-row flex-wrap justify-center gap-2">
      {badges?.map((badge, idx) =>
        getBadge(badge) ? (
          <span
            key={idx}
            className="whitespace-nowrap rounded px-1 py-0.5 text-xs font-semibold shadow-sm shadow-black/50"
            style={{
              backgroundColor: `rgb(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},${secondaryColor.a})`,
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
