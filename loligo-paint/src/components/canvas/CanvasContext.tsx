import React, { useContext, useRef, useState } from "react"

import { Storage } from "@plasmohq/storage"

// interface canvasRef{
//   width: number;
//   height: number;
//   style: {
//     width : string;
//     height: string
//   };
//   getContext: ( twoD: string)=>{
//     scale: (param1: number, param2: number) => {};
//     lineCap: string;
//     strokeStyle: string;
//     lineWidth: number;
//     fillStyle : string;
//     fillRect : (parm1: number, parm2:number, parm3: number, parm4: number)=>{}
//   } | null
// }

interface CanvasContex {
  canvasRef: any
  contextRef: any
  prepareCanvas: any
  write: any
  startDrawing: any
  finishDrawing: any
  startWriting?:any
  stopWriting?: any
  clearCanvas: any
  draw: any
  tool: string
  setTool: any
  color: string
  setColor: any
  text: string
  setText: any
}

const defaultContextValue: CanvasContex = {
  canvasRef: {
    width: 0,
    height: 0,
    style: {
      width: "0px",
      height: "0px"
    },
    getContext: () => {
      return null
    }
  },

  contextRef: null,
  prepareCanvas: null,
  write: null,
  startDrawing: null,
  finishDrawing: null,
  // startWriting:null,
  // stopWriting: null,
  clearCanvas: null,
  draw: null,
  tool: "hand",
  setTool: () => {},
  color: "#000000",
  setColor: () => {},
  text: "",
  setText: () => {}
}

const CanvasContext = React.createContext(defaultContextValue)

export const CanvasProvider = ({ children }: any) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [isWriting, setIsWriting] = useState(false)
  const canvasRef = useRef(defaultContextValue.canvasRef)
  const contextRef = useRef(defaultContextValue.contextRef)
  const [tool, setTool] = useState(defaultContextValue.tool)
  const [color, setColor] = useState(defaultContextValue.color)
  const [text, setText] = useState(defaultContextValue.text)

  const storage = new Storage()

  const prepareBackground = async (ctx: any, canvas: any) => {
    const tempCanvas = document.createElement("canvas")
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const tempContext = tempCanvas.getContext("2d")
    if (tempContext) {
      tempContext.fillStyle = "white"
      tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
      ctx.drawImage(tempCanvas, 0, 0)
    }

    let image = await navigator.clipboard.readText()
      const img = new Image()
      img.src = image
      img.onload = () => {
        ctx.drawImage(img, 0, 0, window.innerWidth, innerHeight)
      }
      
    }
  

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext("2d")
    if (context) {
      prepareBackground(context, canvas)
      context.scale(2, 2)
      context.lineCap = "round"
      context.strokeStyle = "black"
      context.lineWidth = 5
      contextRef.current = context
    }
  }

  const startDrawing = ({ nativeEvent }: any) => {
    if (tool == "pen" || tool == "eraser") {
      const { offsetX, offsetY } = nativeEvent
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)
      setIsDrawing(true)
    }
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    if (tool == "eraser") {
      contextRef.current.strokeStyle = "#ffffff"
    } else {
      contextRef.current.strokeStyle = color
    }

    contextRef.current.stroke()
  }

  // const startWriting = ({ nativeEvent }: any) => {
  //   if (tool !== "text") return
  //   const { offsetX, offsetY } = nativeEvent
  //   contextRef.current.moveTo(offsetX, offsetY)
  //   contextRef.current.font = "30px Arial"
  //   setIsWriting(true)
  // }

  // const stopWriting = ({ nativeEvent }: any) => {
  //   //contextRef.current.closePath()
  //   setIsWriting(false)
  // }

  const write = ({ nativeEvent }: any) => {
    if (tool !== "text") return
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.moveTo(offsetX, offsetY)
    contextRef.current.font = "30px Arial"
    contextRef.current.fillText(text, offsetX, offsetY)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (context) {
      context.fillStyle = "white"
      context.fillRect(0, 0, canvas.width, canvas.height)
      prepareBackground(context, canvas)
    }
  }

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        write,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        tool,
        setTool,
        color,
        setColor,
        // startWriting,
        // stopWriting,
        text,
        setText,
      }}>
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => useContext(CanvasContext)
