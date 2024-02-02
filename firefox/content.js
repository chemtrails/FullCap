browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse({
        x: 0,
        y: 0,
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
    });
});