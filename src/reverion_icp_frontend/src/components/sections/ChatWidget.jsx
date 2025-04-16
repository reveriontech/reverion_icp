import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane, FaSmile, FaRobot } from 'react-icons/fa';
import axios from 'axios';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const miniPromptRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [miniMessages, setMiniMessages] = useState([]);
  const inputRef = useRef(null);

  // Force clear localStorage for testing
  useEffect(() => {
    localStorage.removeItem('chatInteracted');
    console.log("Cleared localStorage");
  }, []);

  // Check local storage on component mount and delay mini prompt appearance
  useEffect(() => {
    console.log("Setting up prompt timer...");
    
    // For testing purposes, let's bypass the localStorage check
    // and always show the prompt after 3 seconds
    const promptTimer = setTimeout(() => {
      console.log("Timer fired - showing prompt");
      setShowPrompt(true);
    }, 3000);
    
    return () => {
      console.log("Cleaning up timer");
      clearTimeout(promptTimer);
    };
  }, []);

  // Handle click outside to close mini prompt
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniPromptRef.current && !miniPromptRef.current.contains(event.target) && 
          !event.target.closest('.chat-toggle-btn')) {
        setShowPrompt(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Show welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && !welcomeShown) {
      setIsTyping(true);
      
      // Simulate AI typing example
      const timer = setTimeout(() => {
        setIsTyping(false);
        
        // If there are mini messages, use those instead of the welcome message
        if (miniMessages.length > 0) {
          setMessages([...miniMessages]);
        } else {
          setMessages([
            {
              role: 'assistant',
              content: 'Hello! I\'m your ReverionAI Assistant. How can I help you today?'
            }
          ]);
        }
        
        setWelcomeShown(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, welcomeShown, miniMessages]);

  // Add effect for handling Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && document.activeElement === inputRef.current) {
        if (!isOpen) {
          // Store the current input before opening main chat
          const currentInput = userInput;
          
          // Clear input
          setUserInput('');
          
          // Add user message to miniMessages first to display in mini chat
          const userMessage = { role: 'user', content: currentInput };
          setMiniMessages([...miniMessages, userMessage]);
          
          // Open the main chat
          setIsOpen(true);
          
          // Use a timeout to ensure state updates before submitting
          setTimeout(() => {
            // Add the same user message to main messages
            setMessages(prev => [...miniMessages, userMessage]);
            
            // Set loading state
            setLoading(true);
            
            // Make the API call
            handleAPICall(currentInput);
          }, 100);
        } else {
          handleSubmit();
        }
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [userInput, messages, isOpen, miniMessages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    if (!hasInteracted) {
      setHasInteracted(true);
      localStorage.setItem('chatInteracted', 'true');
    }
    
    // Hide mini prompt when main chat is opened
    if (!isOpen) {
      setShowPrompt(false);
    }
  };

  const openChatFromPrompt = () => {
    setShowPrompt(false);
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    
    // Store the current input before clearing it
    const currentInput = userInput;
    
    // Add user message to messages
    const userMessage = { role: 'user', content: currentInput };
    setMessages([...messages, userMessage]);
    
    setUserInput('');
    setLoading(true);
    
    // Handle the API call in a separate function
    handleAPICall(currentInput);
  };
  
  const handleAPICall = async (input) => {
    try {
      const response = await axios.post(
        `https://chatbot-fawn-ten-62.vercel.app/chat`,
        { prompt: input },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data?.message) {
        // Get the AI response text
        const aiResponseText = response.data.message[0].text;
        
        // Function to gradually reveal the AI's response character by character
        const typeWriterEffect = (text, index = 0) => {
          if (index <= text.length) {
            const partialMessage = { role: 'assistant', content: text.substring(0, index) };
            
            // Replace the last message if it's from the assistant and still typing
            setMessages(prev => {
              const newMessages = [...prev];
              if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'assistant') {
                newMessages[newMessages.length - 1] = partialMessage;
              } else {
                newMessages.push(partialMessage);
              }
              return newMessages;
            });
            
            // Continue typing with random delay for natural effect
            if (index < text.length) {
              const randomDelay = Math.floor(Math.random() * 30) + 10; // 10-40ms
              setTimeout(() => typeWriterEffect(text, index + 1), randomDelay);
            }
          }
        };
        
        // Remove loading state before starting the typewriter effect
        setLoading(false);
        
        // Start with an empty message from the assistant
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
        
        // Start the typewriter effect after a small delay
        setTimeout(() => typeWriterEffect(aiResponseText), 500);
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return content.split(urlRegex).map((part, index) =>
      part.match(urlRegex) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="chat-widget-container">
      {/* Mini Chat Prompt */}
      {showPrompt && !isOpen && (
        <div className="mini-chat-prompt" ref={miniPromptRef}>
          <div className="mini-chat-header">
            <div className="mini-chat-avatar">
              <FaRobot />
            </div>
            <div className="mini-chat-user-info">
              <div className="mini-chat-name">ReverionAI Assistant</div>
              <div className="mini-chat-status">
                <span className="mini-status-dot"></span>
                Online
              </div>
            </div>
            <button onClick={() => setShowPrompt(false)} className="mini-chat-close">
              <FaTimes />
            </button>
          </div>
          
          <div className="mini-chat-content">
            {miniMessages.length === 0 ? (
              <div className="mini-chat-message assistant">
                <span>Hello! I'm your ReverionAI Assistant. How can I help you today?</span>
              </div>
            ) : (
              miniMessages.map((msg, index) => (
                <div key={index} className={`mini-chat-message ${msg.role}`}>
                  <div className="message-content">{renderMessageContent(msg.content)}</div>
                </div>
              ))
            )}
            
            {loading && !isOpen && (
              <div className="mini-chat-message assistant">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div className="mini-chat-input-form">
              <FaSmile className="mini-chat-emoji" />
              <input 
                type="text" 
                name="quickMessage"
                placeholder="Ask me anything..." 
                className="mini-chat-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                ref={inputRef}
              />
              <button 
                onClick={() => {
                  if (userInput.trim()) {
                    // Store current input
                    const currentInput = userInput;
                    
                    // Add to mini messages
                    const userMessage = { role: 'user', content: currentInput };
                    setMiniMessages([...miniMessages, userMessage]);
                    
                    // Clear input
                    setUserInput('');
                    
                    // Open main chat
                    setIsOpen(true);
                    
                    // Use timeout to ensure state updates 
                    setTimeout(() => {
                      // Set messages in the main chat
                      setMessages([...miniMessages, userMessage]);
                      
                      // Set loading state to true
                      setLoading(true);
                      
                      // Make API call
                      handleAPICall(currentInput);
                    }, 100);
                  }
                }} 
                className="mini-chat-send"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-user">
              <div className="user-avatar">
                <FaRobot className="robot-avatar" />
              </div>
              <div className="user-info">
                <div className="user-name">ReverionAI Assistant</div>
                <div className="user-status">
                  <span className="status-indicator"></span>
                  Online
                </div>
              </div>
            </div>
            <div className="chat-actions">
              <button className="action-btn" onClick={toggleChat}>
                <FaTimes />
              </button>
            </div>
          </div>
          
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <div className="message-content">{renderMessageContent(msg.content)}</div>
              </div>
            ))}
            
            {loading && isOpen && (
              <div className="chat-message assistant">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-footer">
            <div className="chat-input-form">
              <button type="button" className="tool-btn">
                <FaSmile />
              </button>
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)} 
                className="chat-input"
                ref={inputRef}
              />
              <button onClick={handleSubmit} className="send-btn">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Chat Toggle Button */}
      <button 
        className={`chat-toggle-btn ${isOpen ? 'active' : ''}`} 
        onClick={toggleChat}
        aria-label="Chat with assistant"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>
    </div>
  );
};

export default ChatWidget;