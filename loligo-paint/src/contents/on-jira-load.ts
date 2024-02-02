import { Storage } from "@plasmohq/storage"
import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?selectedIssue=*"],
  all_frames: true
}

const storage = new Storage()

//TODO: the load event runs only when the page opens. The URL changes, but the page is not reloaded. 
// find a way to fix this and retrieve always the latests URL
window.addEventListener('load', async function () {
    let issueURL = window.location.href
    
    let issueKey = issueURL.split('=')
    if(issueKey) await storage.setItem("issueKey", `${issueKey[1]}`)
    }
)

