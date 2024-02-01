

import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?selectedIssue=*"],
  all_frames: true
}

window.addEventListener('load', function () {
    //TODO: extract the key to perform the post from the backend
    let issueURL = window.location.href
    console.log(issueURL)
    
    
    }
)

