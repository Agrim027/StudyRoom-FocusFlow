import React, { useRef, useEffect, useState } from 'react';
import { Send, MessageSquare, Reply, X } from 'lucide-react';

/**
 * LiveChatBox Component
 * Handles the display of real-time messages, reply threads, and the input form.
 * 
 * @param {Object} props
 * @param {Array} props.messages - List of chat messages
 * @param {string} props.currentUsername - The logged-in user's username
 * @param {string} props.inputMessage - Current value of the message input
 * @param {Function} props.setInputMessage - Setter for the message input
 * @param {Function} props.onSendMessage - Handler for submitting a message
 * @param {Object} props.replyTo - The message object currently being replied to
 * @param {Function} props.setReplyTo - Setter for the replyTo state
 */
const LiveChatBox = ({ 
  messages, 
  currentUsername, 
  inputMessage, 
  setInputMessage, 
  onSendMessage,
  replyTo,
  setReplyTo
}) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full lg:w-96 glass-panel rounded-3xl flex flex-col h-[600px] lg:h-full shrink-0 relative z-10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Header */}
      <div className="p-4 border-b border-aurora-border bg-aurora-surface/90 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
        <h3 className="font-extrabold text-lg text-aurora-text flex items-center tracking-tight">
          <MessageSquare className="h-5 w-5 mr-2 text-aurora-accent" />
          Live Chat
        </h3>
        <span className="text-xs font-semibold bg-aurora-bg px-2.5 py-1 rounded-lg text-aurora-text-muted border border-aurora-border">
          {messages.length} msgs
        </span>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-aurora-bg/30">
        {messages.map((msg, idx) => {
          const isSystem = msg.type === 'JOIN' || msg.type === 'LEAVE';
          const isMe = msg.sender === currentUsername;

          if (isSystem) {
            return (
              <div key={idx} className="flex flex-col items-center my-3">
                <span className="text-xs text-aurora-text-muted bg-aurora-surface/80 backdrop-blur-sm px-4 py-1.5 rounded-full font-medium border border-aurora-border shadow-sm">
                  {msg.sender} {msg.type === 'JOIN' ? 'joined' : 'left'} the room
                </span>
              </div>
            );
          }

          return (
            <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300 group`}>
              <div className="flex items-center gap-2 mb-1">
                {!isMe && <span className="text-xs font-bold text-aurora-accent ml-1">{msg.sender}</span>}
                <button 
                  onClick={() => setReplyTo(msg)}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity text-aurora-text-muted hover:text-aurora-accent p-1 rounded-md ${isMe ? 'mr-1' : 'ml-1'}`}
                  title="Reply"
                >
                  <Reply className="h-3 w-3" />
                </button>
              </div>

              <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm relative ${
                isMe 
                  ? 'bg-gradient-to-br from-aurora-primary to-[#8A73E6] text-white rounded-tr-sm' 
                  : 'bg-aurora-surface border border-aurora-border text-aurora-text rounded-tl-sm'
              }`}>
                {/* Quoted Reply Block */}
                {msg.replyToContent && (
                  <div className={`mb-2 pl-3 py-1.5 border-l-2 text-xs rounded-r-md ${isMe ? 'border-white/50 bg-black/10 text-white/90' : 'border-aurora-accent bg-aurora-bg/50 text-aurora-text-muted'}`}>
                    <span className="font-bold mb-0.5 block">{msg.replyToSender}</span>
                    <p className="truncate max-w-[200px]">{msg.replyToContent}</p>
                  </div>
                )}
                
                <p className="text-[15px] leading-relaxed break-words">{msg.content}</p>
                <span className={`text-[10px] mt-1.5 block font-medium text-right ${isMe ? 'text-white/70' : 'text-aurora-text-muted/70'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-aurora-surface/90 backdrop-blur-md border-t border-aurora-border flex flex-col">
        {/* Reply Preview Box */}
        {replyTo && (
          <div className="px-4 py-2 bg-aurora-bg/80 border-b border-aurora-border flex items-start justify-between animate-in slide-in-from-bottom-2">
            <div className="flex-1 overflow-hidden pr-2">
              <div className="flex items-center text-xs font-bold text-aurora-accent mb-0.5">
                <Reply className="h-3 w-3 mr-1" />
                Replying to {replyTo.sender}
              </div>
              <p className="text-xs text-aurora-text-muted truncate">
                {replyTo.content}
              </p>
            </div>
            <button 
              onClick={() => setReplyTo(null)}
              className="text-aurora-text-muted hover:text-red-400 p-1 transition-colors rounded-md"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <form onSubmit={onSendMessage} className="p-3 flex space-x-2 relative items-end">
          <textarea
            rows="1"
            className="flex-1 glass-input rounded-2xl px-4 py-3 min-h-[46px] max-h-[120px] text-sm resize-none custom-scrollbar"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (inputMessage.trim()) onSendMessage(e);
              }
            }}
          />
          <button
            type="button"
            onClick={onSendMessage}
            disabled={!inputMessage.trim()}
            className="shrink-0 h-[46px] w-[46px] flex items-center justify-center bg-gradient-to-r from-aurora-primary to-[#8A73E6] hover:from-aurora-primary-hover hover:to-aurora-primary text-white rounded-xl shadow-[0_0_10px_rgba(110,86,207,0.4)] disabled:opacity-50 disabled:shadow-none transition-all"
          >
            <Send className="h-5 w-5 transform -translate-y-[1px] translate-x-[1px]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChatBox;
