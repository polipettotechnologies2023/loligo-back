
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {

 const fetchRes = await fetch(
    `${process.env.PLASMO_PUBLIC_JIRA_API}/issue/${req.body.issueKey}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.PLASMO_PUBLIC_JIRA_USERNAME}:${process.env.PLASMO_PUBLIC_JIRA_API_TOKEN}`
        ).toString("base64")}`,
        Accept: "application/json",
        "X-Atlassian-Token": "no-check"
      }
    }
  )

  let tmp = await fetchRes.json()
  let subtaskList = tmp.fields.subtasks

  let newObj = subtaskList.map((sub)=>{
    return {
            "label" : sub.fields.summary,
            "value" : sub.key
        }
  })


  const storage = new Storage()
  await storage.setItem("subtaskList", `${JSON.stringify(newObj)}`)

  res.send({
    subtaskList: `${JSON.stringify(newObj)}`
  })

}




export default handler



