import React, { useEffect, useState } from "react";
import { CSSProperties } from "react";
import { DraggableCore, DraggableData, DraggableEvent } from "react-draggable";

interface Size {
  width?: number | string;
  height?: number | string;
}

const HandlerStyle: CSSProperties = {
  height: "100%",
  position: "absolute",
  right: -0.5,
  width: 1,
  backgroundColor: "#000000",
  cursor: "ew-resize",
};

const ResizableStyle: CSSProperties = {
  display: "flex",
};

const DraggableCoreProps = {
  scale: 1,
  grid: [1, 1] as [number, number],
  // onStart={}
  // onStop={}
  // onMouseDown={}
  // allowAnyClick: false,
  // cancel: string,
  // disabled: boolean,
  // enableUserSelectHack: boolean,
  // offsetParent: HTMLElement,
  // handle: string,
};

const ContainerSize: Size = {
  width: 300,
  height: 300,
};

const calculateWidth = (
  ratio: number,
  parentWidth: number
): { leftWidth: number; rightWidth: number } => {
  return {
    leftWidth: ratio * parentWidth,
    rightWidth: (1 - ratio) * parentWidth,
  };
};

const calculateRatio = (
  ratio: number,
  parentWidth: number,
  event: DraggableData
): number => {
  let deltaPercent = (100 * event.deltaX) / parentWidth; // ! Must be refactored
  let ratioOffset = deltaPercent / 100;
  let newRatio = ratio + ratioOffset;

  return newRatio > 1 ? 1 : newRatio;
};

const Resizable = () => {
  const [leftSize, setLeftSize] = useState<Size>({});
  const [rightSize, setRightSize] = useState<Size>({});
  const [ratio, setRatio] = useState<number>(0.5);

  const nodeRef = React.useRef(null);

  useEffect(() => {
    const sizes = calculateWidth(ratio, +(ContainerSize.width || 0));

    setLeftSize({ width: sizes.leftWidth });
    setRightSize({ width: sizes.rightWidth });
  }, [ratio]);

  return (
    <div className="resizable" style={{ ...ResizableStyle, ...ContainerSize }}>
      <div
        className="left"
        style={{ ...leftSize, backgroundColor: "red", position: "relative" }}
      >
        <DraggableCore
        {...DraggableCoreProps}
        nodeRef={nodeRef}
        onDrag={(event, data) => {
          const newRatio = calculateRatio(ratio, +(ContainerSize.width || 0), data);
          console.log(
            "🚀 ~ file: Resizable.tsx ~ line 86 ~ Resizable ~ newRatio",
            newRatio
          );

          setRatio(newRatio);
        }}
      >
        <div style={HandlerStyle} ref={nodeRef}></div>
      </DraggableCore>
      </div>

      

      <div
        className="right"
        style={{ ...rightSize, backgroundColor: "green" }}
      ></div>
    </div>
  );
};

export default Resizable;
