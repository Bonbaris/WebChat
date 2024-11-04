const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
  let messageData = event.data;

  // Если сообщение в формате Blob, преобразуем его в строку
  if (messageData instanceof Blob) {
    const reader = new FileReader();
    reader.onload = function() {
      displayMessage(reader.result);
    };
    reader.readAsText(messageData);
  } else {
    displayMessage(messageData);
  }
};

function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}


    function sendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText === '') return;

  // Отправляем текстовое сообщение
  ws.send(messageText.toString());

  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'user');
  messageElement.style.textAlign = "right";
  messageElement.textContent = messageText;
  chatBox.appendChild(messageElement);

  messageInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}