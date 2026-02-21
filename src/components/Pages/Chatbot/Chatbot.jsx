import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, X } from "lucide-react";
import axios from "axios";

// Check browser support
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const Chatbot = ({ openAIKey }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);

    // Speech recognition
    const recognition = useRef(null);
    if (SpeechRecognition && !recognition.current) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = false;
        recognition.current.lang = "en-US";
        recognition.current.interimResults = false;
    }

    // Load messages from localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("zestora_messages")) || [
            {
                text: "Hi 👋 Welcome to Zestora! How can I help you today?",
                sender: "bot",
                time: getTime()
            }
        ];
        setMessages(saved);
    }, []);

    // Save messages to localStorage
    useEffect(() => {
        localStorage.setItem("zestora_messages", JSON.stringify(messages));
        scrollToBottom();
    }, [messages, isTyping]);

    function getTime() {
        return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const detectIntent = (message) => {
        const text = message.toLowerCase();
        if (text.includes("order")) return "track_order";
        if (text.includes("delivery")) return "delivery_time";
        if (text.includes("payment")) return "payment_info";
        return "general";
    };

    const handleVoiceInput = () => {
        if (!recognition.current) return alert("Your browser does not support speech recognition");
        setIsListening(true);
        recognition.current.start();

        recognition.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            sendMessage(transcript);
            setIsListening(false);
        };

        recognition.current.onerror = () => {
            setIsListening(false);
        };
    };

    const sendMessage = async (textMessage) => {
        const messageText = textMessage || input;
        if (!messageText.trim()) return;

        const userMessage = { text: messageText, sender: "user", time: getTime() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        const intent = detectIntent(messageText);

        let botText = "";

        // Simple order tracking simulation
        if (intent === "track_order") {
            botText = "Your last order is out for delivery 🚚. ETA 25-35 mins.";
        } else if (intent === "delivery_time") {
            botText = "Delivery usually takes 30-40 mins ⏳";
        } else if (intent === "payment_info") {
            botText = "We accept Card, UPI, Wallet & Cash on Delivery 💳";
        } else {
            // Call OpenAI API
            try {
                const response = await axios.post(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: messageText }]
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${openAIKey}`
                        }
                    }
                );

                botText = response.data.choices[0].message.content;
            } catch (err) {
                botText = "Sorry, I am unable to process your request right now 😢";
            }
        }

        const botMessage = { text: botText, sender: "bot", time: getTime() };
        setTimeout(() => {
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    console.log("OpenAI Key:", openAIKey);

    return (
        <>
            {/* Floating button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-2xl z-50"
            >
                💬
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-20 right-6 w-96 h-[500px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 z-50"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">Zestora Assistant 🤖</h2>
                                <p className="text-xs opacity-80">Online • Ready to help</p>
                            </div>
                            <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow
                    ${msg.sender === "user"
                                            ? "bg-indigo-600 text-white rounded-br-none"
                                            : "bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-bl-none"
                                        }`}
                                    >
                                        <p>{msg.text}</p>
                                        <span className="text-[10px] opacity-60 block mt-1">{msg.time}</span>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-700 px-4 py-2 rounded-2xl text-sm shadow">
                                        Typing...
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef}></div>
                        </div>

                        {/* Input */}
                        <div className="p-3 flex gap-2 border-t dark:border-slate-700 bg-white dark:bg-slate-900">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Type your message..."
                                className="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50"
                            />
                            <button onClick={handleVoiceInput} className={`bg-green-500 text-white p-2 rounded-full ${isListening ? "animate-pulse" : ""}`}>
                                <Mic size={18} />
                            </button>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => sendMessage()} className="bg-indigo-600 text-white p-2 rounded-full">
                                <Send size={18} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
