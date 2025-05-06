document.addEventListener('DOMContentLoaded', () => {
  const apiUrlInput = document.getElementById('apiUrl');
  const apiKeyInput = document.getElementById('apiKey');
  const saveConfigBtn = document.getElementById('saveConfig');
  const chatWindow = document.getElementById('chatWindow');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');

  // Load saved config
  apiUrlInput.value = localStorage.getItem('apiUrl') || '';
  apiKeyInput.value = localStorage.getItem('apiKey') || '';

  saveConfigBtn.addEventListener('click', () => {
    localStorage.setItem('apiUrl', apiUrlInput.value);
    localStorage.setItem('apiKey', apiKeyInput.value);
    alert('Configuration saved!');
  });

  sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    const apiUrl = localStorage.getItem('apiUrl');
    const apiKey = localStorage.getItem('apiKey');

    if (!apiUrl || !apiKey) {
      alert('Please set your API URL and API Key.');
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'your-model-name',
          messages: [{ role: 'user', content: message }]
        })
      });

      const data = await response.json();
      const reply = data.choices[0].message.content;
      appendMessage('assistant', reply);
    } catch (error) {
      appendMessage('assistant', 'Error: ' + error.message);
    }
  });

  uploadBtn.addEventListener('click', () => {
    const files = fileInput.files;
    if (!files.length) {
      alert('Please select files to upload.');
      return;
    }

    // Placeholder for file upload logic
    alert('File upload functionality is not implemented yet.');
  });

  function appendMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);
    messageDiv.textContent = `${role === 'user' ? 'You' : 'Assistant'}: ${text}`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
});
