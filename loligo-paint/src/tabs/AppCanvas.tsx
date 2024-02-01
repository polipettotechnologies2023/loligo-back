import { CanvasProvider } from "../components/canvas/CanvasContext";
import { Canvas } from "../components/canvas/Canvas";
import {ClearCanvasButton} from "../components/canvas/ClearCanvasButton"
import Palette from "../components/palette/Palette";
import Embed from "../components/palette/CopyToClipboard";

function AppCanvas() {

  return (
    <>
    
    <CanvasProvider>
    <Embed/>
    <Palette />
    <Canvas />
    <ClearCanvasButton/>
    </CanvasProvider>
    </>
  )
}

export default AppCanvas;
