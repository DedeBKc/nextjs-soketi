"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "~/lib/soketi";

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const channel = pusherClient.subscribe("chat-channel");
    console.log("Subscribed to channel:", channel);

    channel.bind("message-event", (data) => {
      console.log("message-event", data.message);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      channel.unbind_all(); // Pastikan unbind semua
      channel.unsubscribe(); // Unsubscribe dari saluran
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Websocket <span className="text-[hsl(280,100%,70%)]">Soketi</span> App
        </h1>
        <div>
          <ul className="my-4 list-disc space-y-2 pl-6">
            {messages.map((message, index) => (
              <li key={index} className="text-3xl text-white">
                {message}
              </li>
            ))}
          </ul>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              className="mb-4 rounded border border-gray-300 p-2 text-black"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
