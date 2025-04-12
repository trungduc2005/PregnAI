const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');  // Để phục vụ các file tĩnh như HTML, CSS, JS

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));  // public là thư mục chứa frontend

// Route cho trang chủ (trả về HTML cho frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Trả về index.html trong thư mục public
});

// Route cho việc gửi tin nhắn và nhận phản hồi từ AI
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Gọi OpenAI API (hoặc API AI của bạn) ở đây
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',  // Dùng GPT-3.5 hoặc GPT-4 tùy vào yêu cầu
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Thay bằng API key của bạn
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Lỗi khi gọi OpenAI API:', error);
    res.status(500).json({ reply: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
