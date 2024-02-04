import { useCanvas } from "./CanvasContext";
import Button from '@atlaskit/button';

export const ClearCanvasButton = (prop :any) => {
  const { clearCanvas } = useCanvas();

  const confirmErase = () => {
    if (confirm("Do you wanna erase the canava? At the current state this will also remove the image")) clearCanvas();
  };

  return (
    <Button className={`${prop.className}`} appearance="danger" onClick={confirmErase}>
      Clear
    </Button>
  );
};
