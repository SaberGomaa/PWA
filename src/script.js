if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js?V=4.0.10').then(reg => {
        reg.update();
    }).catch(err => {
        alert(err);
    });
}

function sendMessageToFlutter(data) {
    alert(data);
    FlutterChannel.postMessage(data);
}

function receiveMessageFromFlutter(message) {
    const event = new CustomEvent('messageFromMobileApp', {
        detail: message // The data you want to send
    });
    window.dispatchEvent(event);
}