// https://polipetto-lolligo.atlassian.net/rest/api/3/issue/key

// payload = {
//     "fields": {
//      "customfield_10070": {
//     "content": [
//         {
//         "content": [
//             {
//             "text": f"{formatted_data}",
//             "type": "text"
//             }
//         ],
//         "type": "paragraph"
//         }
//     ],
//     "type": "doc",
//     "version": 1
//     }
// }
// } 

import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {


    const file = DataURIToBlob(req.body.dataURLB64)
    const form = new FormData();


    //TODO: img.png is the name of the image. ask the user to give it a name before submitting it
    
    form.append('file', file, 'img.png');

    const fetchRes = await fetch(`${process.env.PLASMO_PUBLIC_JIRA_API}/issue/${req.body.issueKey}/attachments`, {
        method: 'POST',
        //@ts-ignore
        body: form,
        headers: {
            'Authorization': `Basic ${Buffer.from(
                `${process.env.PLASMO_PUBLIC_JIRA_USERNAME}:${process.env.PLASMO_PUBLIC_JIRA_API_TOKEN}`
            ).toString('base64')}`,
            'Accept': 'application/json',
            'X-Atlassian-Token': 'no-check'
        }
    })
    console.log(fetchRes)

  res.send({
    fetchRes
  })
  
}


function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)
    return new Blob([ia], { type: mimeString })
  }

export default handler