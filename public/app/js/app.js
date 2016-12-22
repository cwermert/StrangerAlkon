var messageInput = document.querySelector('.message');
var unreadEl = document.querySelector('.unread');
var msgCenter = document.querySelector('.message-center');

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function postMessage (msg) {
  return fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: msg
    })
  })
}

function getUnread () {
  fetch('/api/messages/unread')
  .then(function (data) {  
    console.log('Request succeeded with JSON response', data);
    return data.length;
  })  
  .catch(function (error) {  
    console.log('Request failed', error);  
  });
};

function getAll () {
  fetch('/api/messages')
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      console.log(json);
      return json;
    })
    .catch(function(ex) {
      console.log('parsing failed', ex)
    })
};

function keyWasPressed(event) {
  if (event.keyCode === 13) {
    postMessage(messageInput.value)
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      if (data.profanity) {
        msgCenter.innerHTML = data.profanity;
      }
    }).catch(function(error) {
      console.log('request failed', error)
    })
    messageInput.value = '';
    // getUnread();
  }
}

// unreadEl.addEventListener('click', getAll);

// (function () { getUnread() })()