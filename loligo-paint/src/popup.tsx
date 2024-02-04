import { useEffect } from "react"
import { windowCanvas } from "./contents/window-canvas"

function IndexPopup() {
  useEffect(()=>{
    (() => {
      chrome.tabs.captureVisibleTab(null, {}, function (image) {
        navigator.clipboard.writeText(image)
        windowCanvas(image)
     });
    })();
  },[])
    
  return (
    <>
    </>
  )
}

export default IndexPopup
