import "./Palette.css"
import { useEffect, useState } from "react"

import { useCanvas } from "../canvas/CanvasContext"
import { ClearCanvasButton } from "../canvas/ClearCanvasButton"
import AppendToJira from "./AppendToJira"
import CopyToClipboard from "./CopyToClipboard"

export default function Palette() {
  let { tool, setTool, color, setColor, text, setText } = useCanvas()

  useEffect(() => {
    console.log(text)
  }, [tool, color, text])

  //tool picker
  const selectedValue = (e: any) => {
    setTool(e.target.value)
  }

  //color picker
  const selectColor = (e: any) => {
    setColor(e.target.value)
  }

  const writeText = (e: any) => {
    setText(e.target.value)
  }

  return (
    <>
      <div className="paletteContainer">
        <AppendToJira />
        <br />
        <CopyToClipboard />
        <br />
        <select
          className="paletteItem"
          defaultValue={tool}
          onChange={(event) => selectedValue(event)}>
          <option value="hand">✋</option>
          <option value="pen">🖍️</option>
          <option value="text">🇹</option>
          <option value="eraser">❌</option>
        </select>

        {tool == "pen" && (
          <input
            style={{width: "100%"}}
            className="paletteItem"
            list="data"
            type="color"
            name="colorPicker"
            id="colorPicker"
            onChange={selectColor}
          />
        )}

        {tool == "text" ? (
          <textarea
            name="text-area"
            id="text-area"
            onChange={writeText}></textarea>
        ) : (
          <></>
        )}
        <br />
        <br />
        <br />
        <ClearCanvasButton className="paletteItem" />
      </div>
    </>
  )
}
