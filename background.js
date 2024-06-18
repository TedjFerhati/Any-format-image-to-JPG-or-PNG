let currentImageUrl = null;

// Create context menu entries
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openImageInNewTab",
        title: chrome.i18n.getMessage("openImageInNewTab"),
        contexts: ["all"]
    });
    chrome.contextMenus.create({
        id: "downloadImageAsJPG",
        title: chrome.i18n.getMessage("downloadImageAsJPG"),
        contexts: ["all"],
        visible: false
    });
    chrome.contextMenus.create({
        id: "downloadImageAsPNG",
        title: chrome.i18n.getMessage("downloadImageAsPNG"),
        contexts: ["all"],
        visible: false
    });
});

// Listener to handle clicks on the context menu entries
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openImageInNewTab" && currentImageUrl) {
        chrome.tabs.create({ url: currentImageUrl });
    } else if ((info.menuItemId === "downloadImageAsJPG" || info.menuItemId === "downloadImageAsPNG") && currentImageUrl) {
        const format = info.menuItemId === "downloadImageAsJPG" ? "jpg" : "png";
        chrome.tabs.sendMessage(tab.id, {
            command: 'downloadImage',
            url: currentImageUrl,
            format: format
        });
    }
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.imageUrl) {
        currentImageUrl = message.imageUrl;
        chrome.contextMenus.update("downloadImageAsJPG", { visible: true });
        chrome.contextMenus.update("downloadImageAsPNG", { visible: true });
    } else {
        currentImageUrl = null;
        chrome.contextMenus.update("downloadImageAsJPG", { visible: false });
        chrome.contextMenus.update("downloadImageAsPNG", { visible: false });
    }
});
