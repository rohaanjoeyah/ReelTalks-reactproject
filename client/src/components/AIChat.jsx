// src/components/AiChat.jsx
import React, { useState } from "react";

const AiChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse(""); // clear previous response

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 200,
        }),
      });

      const data = await res.json();
      console.log("OpenAI API response:", data); // debug log

      if (data.error) {
        setResponse(`Error: ${data.error.message}`);
      } else if (data.choices && data.choices.length > 0) {
        setResponse(data.choices[0].message.content);
      } else {
        setResponse("No response from AI.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setResponse("Error: could not get response from AI.");
    }

    setLoading(false);
  };

  return (
    <div className="ai-chat">
      <h3>Ask AI</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your question..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
      {response && <div className="ai-response">{response}</div>}
    </div>
  );
};

export default AiChat;
