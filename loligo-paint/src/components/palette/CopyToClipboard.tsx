import { useCanvas } from "../canvas/CanvasContext";
import CopyIcon from '@atlaskit/icon/glyph/copy'

export default function CopyToClipboard() {
  const { canvasRef } = useCanvas();


  const copyImage = async (img:any) => {
    try {
    img.toBlob(async (blob:any)=>{
        console.log(blob.type)
        await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ])
        alert("Drowing added to the clipbard");
    })

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button type="button" onClick={() => copyImage(canvasRef.current)}>
        <CopyIcon label="Copy Canva"/>
      </button>
    </>
  );
}
