import { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    startWriting,
    stopWriting,
    draw,
    write,
  } = useCanvas();

  

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <>
    <canvas
      style={{backgroundColor: "white", touchAction: "none"}}
      onPointerDown={startDrawing}
      onPointerUp={finishDrawing}
      onPointerMove={draw}
      onClick={write}
      // onKeyDown={startWriting}
      // onKeyUp={stopWriting}
      ref={canvasRef}
      
    />


</>
  );
}