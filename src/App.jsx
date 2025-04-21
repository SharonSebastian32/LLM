import { useEffect, useState, useRef } from "react";
import "./app.scss";
import { FiSend } from "react-icons/fi";
import * as webllm from "@mlc-ai/web-llm";

function App() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi, how can I help you?" },
    { role: "user", content: "What is your name?" },
    { role: "assistant", content: "I am an AI system." },
    { role: "user", content: "What can you do?" },
    { role: "assistant", content: "I can help you with various tasks." },
    { role: "user", content: "Tell me a joke." },
    {
      role: "assistant",
      content:
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
    },
  ]);

  const [engine, setEngine] = useState(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const selectedModel = "TinyLlama-1.1B-Chat-v1.0-q4f32_1-MLC";
    webllm
      .CreateMLCEngine(selectedModel, {
        initProgressCallback: (initProgress) => {
          console.log("initProgress", initProgress);
        },
      })
      .then((engineInstance) => {
        setEngine(engineInstance);
        console.log("Engine initialized:", engineInstance);
      })
      .catch((err) => console.error("Engine initialization failed:", err));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessageToLLM() {
    if (!input.trim() || !engine) return;

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");

    try {
      const reply = await engine.chat.completions.create({
        messages: updatedMessages,
        maxTokens: 100,
      });

      const assistantReply = reply.choices[0].message;
      setMessages([...updatedMessages, assistantReply]);
    } catch (error) {
      console.error("LLM response error:", error);
    }
  }

  return (
    <main>
      <section>
        <div className="conversation-area">
          <div className="messages">
            {messages.map((message, index) => (
              <div className={`message ${message.role}`} key={index}>
                <strong>{message.role}:</strong> {message.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Message LLM"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessageToLLM();
              }}
            />
            <button onClick={sendMessageToLLM}>
              <FiSend className="send-icon" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
