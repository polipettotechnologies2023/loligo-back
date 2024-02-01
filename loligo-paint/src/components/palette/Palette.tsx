import "./Palette.css";
import { useEffect } from "react";
import { useCanvas } from "../canvas/CanvasContext";

export default function Palette() {
  let { tool, setTool, color, setColor, text, setText } = useCanvas();

  useEffect(() => {
    console.log(text)
  }, [tool,color,text]);

  //tool picker
  const selectedValue = (e: any) => {
    setTool(e.target.value);
  };

  //color picker
  const selectColor = (e:any) => {
    setColor(e.target.value)
  }

  const writeText = (e:any) => {
    setText(e.target.value)
  }


  return (
    <>
    <div className="paletteContainer">
      <select
        className="paletteItem"
        defaultValue={tool}
        
        onChange={(event) => selectedValue(event)}
      >
        <option value="hand">✋</option>
        <option value="pen">🖍️</option>
        <option value="text">🇹</option>
        <option value="eraser">❌</option>
      </select>

      <input className="paletteItem" type="color" name="colorPicket" id="colorPicket" onChange={selectColor}/>
      <textarea name="text-area" id="text-area" onChange={writeText}></textarea> 
      </div>
    </>
  );
}
