import { useCanvas } from "./CanvasContext";
import "./ClearCanvasButton.css";

export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas();

  const confirmErase = () => {
    if (confirm("Do you wanna erase the canava?")) clearCanvas();
  };

  return (
    <button className="eraseButton" onClick={confirmErase}>
      Clear
    </button>
  );
};
