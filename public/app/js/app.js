var messageInput = document.querySelector('.message');

function postMessage (msg) {
  fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: msg
    })
  })
}

function keyWasPressed(event) {
  if (event.key === "Enter") {
    postMessage(messageInput.value);
    messageInput.value = '';
  }
}