import { animated, useSpringValue } from "@react-spring/web";
import { ReactNode, useCallback, useRef, useState } from "react";
import { clamp } from "@react-spring/shared";
import { DockContext } from "./DockContext";

export const DOCK_ZOOM_LIMIT = [-20, 20];

const Dock = ({ children }: { children: ReactNode }) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const isZooming = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);

  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      setWidth(dockRef?.current?.clientWidth || 0);
    },
  });

  const setIsZooming = useCallback((value: boolean) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel }}>
      <animated.div
        ref={dockRef}
        className="dock"
        onMouseOver={() => {
          if (!isZooming.current) {
            setWidth(dockRef?.current?.clientWidth || 0);
            setHovered(true);
          }
        }}
        onMouseOut={() => {
          setWidth(dockRef?.current?.clientWidth || 0);
          setHovered(false);
        }}
        style={{
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to(value => clamp(0.5, 2, value)),
        }}
      >
        {children}
      </animated.div>
    </DockContext.Provider>
  );
};
export default Dock;
