import { CanvasProvider } from "../components/canvas/CanvasContext";
import { Canvas } from "../components/canvas/Canvas";
import Palette from "../components/palette/Palette";

function AppCanvas() {

  return (
    <>
    
    <CanvasProvider>
    <Palette />
    <Canvas />
    </CanvasProvider>
    </>
  )
}

export default AppCanvas;
