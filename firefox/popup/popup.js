const msg = document.getElementById('msg');
const message1 = `Captured!`;
const message2 = `Capturing... The image will open in a new tab when it's ready.`;
const message3 = `Something went wrong`;

async function capture() {
    try {
        msg.style.color = 'white';
        msg.textContent = message2;
        const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
        const tabResponse = await browser.tabs.sendMessage(tab.id, {});
        const dataURI = await browser.tabs.captureTab({ rect: tabResponse });
        await browser.tabs.create({ url: dataURItoBlobURL(dataURI) });
        msg.style.color = 'lightgreen';
        msg.textContent = message1;
    } catch (e) {
        console.error(e);
        msg.style.color = 'red';
        msg.textContent = message3;
    }
}

function dataURItoBlobURL(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = Uint8Array.from(byteString, (c) => c.charCodeAt(0)).buffer;
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return URL.createObjectURL(blob);
}

capture();