export {}
import { sendToBackground } from "@plasmohq/messaging"
import { windowCanvas } from "~contents/window-canvas"
// export const config: PlasmoCSConfig = {
//   matches: ["https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?selectedIssue=*"],
//   all_frames: true
// }

// chrome.tabs.onUpdated.addListener(function
//    (tabId, changeInfo, tab) {

//      const url = changeInfo.url.split('=')

//      if (url[0] == "https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?selectedIssue") {
//       console.log('hello')

//      }
//    }
//  );

// TODO: find a way to call the plug in by commands
chrome.commands.onCommand.addListener((command, tab) => {
    if(command == "Screenshot"){
    chrome.tabs.captureVisibleTab(null, {}, (base64) => {
    chrome.scripting.executeScript({
      args: [base64],
      target: { tabId: tab.id },
      func: async (args) => {
        try {
          console.log("injected")
          console.log(args)
          navigator.clipboard.writeText(args)
          const file1Url = chrome.runtime.getURL("tabs/AppCanvas.html")

          chrome.runtime.sendMessage({
            action: "createWindow",
            argument: file1Url
          }, function(response) {
            console.log("Response from background script:", response);
          });
          


        } catch (error) {
          console.error("Error capturing screenshot:", error)
        }
      }
    })
  })
}else if (command == "WhiteCanvas") {
   
        chrome.scripting.executeScript({
          args: ['hello'],
          target: { tabId: tab.id },
          func: async (args) => {
            try {''
              console.log("injected")
              console.log(args)
              navigator.clipboard.writeText("nulla")
              const file1Url = chrome.runtime.getURL("tabs/AppCanvas.html")
    
              chrome.runtime.sendMessage({
                action: "createWindow",
                argument: file1Url
              }, function(response) {
                console.log("Response from background script:", response);
              });
              
    
    
            } catch (error) {
              console.error("Error capturing screenshot:", error)
            }
          }
        })

}
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "createWindow") {
        chrome.windows.create(
            { url: message.argument, type: "popup", width: 1920, height: 1080 },)
    }
  });
