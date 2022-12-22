type ZozTooltipProps = {
  label?: string;
  className?: string;
};

const ZozTooltip = ({ label = "", className = "" }: ZozTooltipProps) => {
  return (
    <span
      className={
        "z-10 select-none hidden absolute group-hover:flex transition-opacity text-sm font-mono " +
        "text-gray-100 backdrop-blur-3xl rounded-md px-3 py-1 whitespace-nowrap " +
        `${className}`
      }
      style={{ backgroundColor: "#00000099" }}
    >
      {label}
    </span>
  );
};

export default ZozTooltip;
