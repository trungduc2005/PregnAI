// script.js

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  chatInput.value = '';
  chatInput.disabled = true;

  try {
    const response = await fetch('https://your-api-url.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    appendMessage('ai', data.reply);
  } catch (error) {
    appendMessage('ai', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    console.error('Lỗi khi gửi yêu cầu:', error);
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
