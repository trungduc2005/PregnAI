const chatInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

let isSending = false;

async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message || isSending) return;

  appendMessage('user', message); 
  chatInput.value = '';
  chatInput.focus();
  isSending = true;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY' // ← thay API key thật vào đây
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Không nhận được phản hồi.';
    appendMessage('ai', reply);
  } catch (error) {
    console.error('Lỗi gửi tin nhắn:', error);
    appendMessage('ai', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
  } finally {
    isSending = false;
    chatInput.focus();
  }
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
