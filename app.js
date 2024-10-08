const johnSelectorBtn = document.querySelector("#john-selector");
const janeSelectorBtn = document.querySelector("#jane-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

const createChatMessageElement = (message) => `
    <div class="message ${message.sender === "John" ? "blue-bg" : "gray-bg"}">
      <div class="message-sender">${message.sender}</div>
      <div class="message-text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
    </div>
`;

let messageSender = "John";

const updateMessageSender = (name) => {
  messageSender = name;

  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === "John") {
    johnSelectorBtn.classList.add("active-person");
    janeSelectorBtn.classList.remove("active-person");
  }
  if (name === "Jane") {
    janeSelectorBtn.classList.add("active-person");
    johnSelectorBtn.classList.remove("active-person");
  }

  chatInput.focus();
};

johnSelectorBtn.onclick = () => updateMessageSender("John");
janeSelectorBtn.onclick = () => updateMessageSender("Jane");

// function to load stored messages from localStorage
const loadMessages = () => {
  // get messages from localStorage - or initialize as empty arr if none exist
  const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

  // render all messages to the chat window
  storedMessages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  // get the current messages from localStorage - or initialize with an empty arr.
  const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

  // add the new message to the array
  storedMessages.push(message);

  localStorage.setItem("messages", JSON.stringify(storedMessages));

  chatMessages.innerHTML += createChatMessageElement(message);

  // clear chat input after submiting each message
  chatInputForm.reset();

  // keep pushing up to top the messages to see the last added messages
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

window.onload = loadMessages;

chatInputForm.addEventListener("submit", sendMessage);

clearChatBtn.addEventListener("click", () => {
  localStorage.clear();
  chatMessages.innerHTML = "";
});
