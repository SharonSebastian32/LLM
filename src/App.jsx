import { useState } from "react";
import "./app.scss";
import { FiSend } from "react-icons/fi";

function App() {
  const [messages, setMessages] = useState([
    { role: "user", content: "Hello" },
    { role: "model", content: "Hi, how can I help you?" },
    { role: "user", content: "What is your name?" },
    { role: "model", content: "I am an AI model." },
    { role: "user", content: "What can you do?" },
    { role: "model", content: "I can help you with various tasks." },
    { role: "user", content: "Tell me a joke." },
    {
      role: "model",
      content:
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
    },
  ]);
  return (
    <>
      <main>
        <section>
          <div className="conversation-area">
            <div className="messages">
              {messages.map((message, index) => {
                return (
                  <div className={`message ${message.role}`} key={index}>
                    {message.content}
                  </div>
                );
              })}
            </div>{" "}
            <div className="input-area">
              <input type="text" placeholder="message LLM" />
              <button>
                <FiSend className="send-icon" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
