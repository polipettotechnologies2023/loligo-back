import type { PlasmoMessaging } from "@plasmohq/messaging"
 
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

  chrome.windows.create(
    { url: req.body.url, type: "popup", width: 1280, height: 720 },
    function (win) {
      res.send({
        win
      })
    }
  )
  
}
 
export default handler