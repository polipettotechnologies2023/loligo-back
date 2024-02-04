

// chrome.tabs.captureVisibleTab(null, {}, function (image) {
//     // Send image data to content script for clipboard handling
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       chrome.tabs.sendMessage(tabs[0].id, { message: "copyImageToClipboard", imageData: image });
//     });
//   });