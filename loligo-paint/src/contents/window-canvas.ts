import { sendToBackground } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const windowCanvas = async (imgSrc) => {
  const file1Url = chrome.runtime.getURL("tabs/AppCanvas.html")

  const res = await sendToBackground({
    name: "createWindow",
    body: {
      url: file1Url
    }
  })


}
