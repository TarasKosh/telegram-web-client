// script.js
document.addEventListener('DOMContentLoaded', () => {
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messagesDiv = document.getElementById('messages');

    function fetchMessages() {
        fetch('/messages')
            .then(response => response.json())
            .then(data => {
                messagesDiv.innerHTML = '';
                data.messages.forEach(msg => {
                    const messageElement = document.createElement('div');
                    messageElement.textContent = `${msg.from}: ${msg.text}`;
                    messagesDiv.appendChild(messageElement);
                });
            });
    }

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `message=${encodeURIComponent(message)}`,
        })
        .then(response => response.text())
        .then(data => {
            messageInput.value = '';
            fetchMessages();
        });
    });

    fetchMessages();
});
