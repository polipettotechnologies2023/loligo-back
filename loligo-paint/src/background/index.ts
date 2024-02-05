export {}
import { Storage } from "@plasmohq/storage"

  const storage = new Storage()

  //this function looks at the extension load if there is an open jira board tab
chrome.tabs.query({}, async tabs => {
    let loligoTabIsOpen = tabs.filter((tab) => {
      if(tab.url) {
        let urlKey = tab.url.split('=')
        if (urlKey.length == 2 &&  urlKey[0] == 'https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?selectedIssue'){
          return urlKey[1]
        }
      }
    })
    console.log(loligoTabIsOpen)
    if(loligoTabIsOpen[0]?.url) {
      let urlKey = loligoTabIsOpen[0].url.split('=')
      if (urlKey.length == 2 &&  urlKey[0] == 'https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?selectedIssue'){
        await storage.setItem("issueKey", `${urlKey[1]}`)
      }
    }

});

//this is checking when the ticket id changes
chrome.tabs.onUpdated.addListener(async function
   (tabId, changeInfo, tab) {
     if(changeInfo.url){
     const url = changeInfo.url
     let splitURL = []
        if (url){
          splitURL = url.split('=')
          if (splitURL.length > 1){
            await storage.setItem("issueKey", `${splitURL[1]}`)
          }
        }
     }
   }
 );

chrome.commands.onCommand.addListener((command, tab) => {
  console.log(command)
    if(command == "Screenshot"){
    chrome.tabs.captureVisibleTab(null, {}, (base64) => {
    chrome.scripting.executeScript({
      args: [base64],
      target: { tabId: tab.id },
      func: async (args) => {
        try {
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
} else if(command == "WhiteCanvas") {
        chrome.scripting.executeScript({
          args: [null],
          target: { tabId: tab.id },
          func: async (args) => {
            try {

              navigator.clipboard.writeText("")
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
