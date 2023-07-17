import { animated, useIsomorphicLayoutEffect, useSpringValue } from "@react-spring/web";
import { useMousePosition } from "./hooks/useMousePosition";
import { useWindowResize } from "./hooks/useWindowResize";
import { useDock } from "./DockContext";
import { ReactNode, useState, useRef, useEffect } from "react";

interface DockCardProps {
  children: ReactNode;
}

const INITIAL_WIDTH = 48;

export const DockCard = ({ children }: DockCardProps) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [elCenterX, setElCenterX] = useState<number>(0);

  const size = useSpringValue(INITIAL_WIDTH, {
    config: {
      mass: 0.1,
      tension: 320,
    },
  });

  const opacity = useSpringValue(0);
  const y = useSpringValue(0, {
    config: {
      friction: 29,
      tension: 238,
    },
  });

  const dock = useDock();
  useMousePosition(
    {
      onChange: ({ value }) => {
        const mouseX = value.x;
        if (dock.width > 0) {
          const transformedValue =
            INITIAL_WIDTH + 12 * Math.cos((((mouseX - elCenterX) / dock.width) * Math.PI) / 2) ** 24;

          if (dock.hovered) {
            size.start(transformedValue);
          }
        }
      },
    },
    [elCenterX, dock]
  );

  useIsomorphicLayoutEffect(() => {
    if (!dock.hovered) {
      size.start(INITIAL_WIDTH);
    }
  }, [dock.hovered]);

  useWindowResize(() => {
    if (cardRef?.current?.getBoundingClientRect) {
      const { x } = cardRef.current.getBoundingClientRect();
      setElCenterX(x + INITIAL_WIDTH / 2);
    }
  });

  const timeoutRef = useRef<number | NodeJS.Timeout>();
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div>
      <animated.button
        ref={cardRef}
        style={{
          width: size,
          height: size,
          y,
        }}
      >
        {children}
      </animated.button>
      <animated.div style={{ opacity }} />
    </div>
  );
};
