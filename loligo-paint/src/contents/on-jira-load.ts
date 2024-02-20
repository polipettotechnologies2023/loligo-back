import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: [
    "https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?selectedIssue=*"
  ],
  all_frames: true
}

const storage = new Storage()

window.addEventListener("load", async function () {
  let issueURL = window.location.href

  let issueKey = issueURL.split("=")
  if (
    issueKey.length == 2 &&
    issueKey[0] ==
      "https://polipetto-lolligo.atlassian.net/jira/software/projects/LOL/boards/1?selectedIssue"
  ) {
    await storage.setItem("issueKey", `${issueKey[1]}`)
  }
})
