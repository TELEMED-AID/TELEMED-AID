import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/get", {
        msg: input,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response.data.response },
      ]);
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error: Unable to connect to the server." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 py-8">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-6 rounded-t-3xl shadow-md">
          <h1 className="text-4xl font-bold tracking-wide mb-1">AI Chatbot</h1>
          <p className="text-sm text-indigo-100">Your friendly assistant</p>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 custom-scrollbar">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } px-5 py-3 rounded-2xl max-w-sm shadow-md`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 px-6 py-4 bg-white border-t rounded-b-3xl shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner text-sm"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            <FaPaperPlane className="mr-2" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;