import React, { useState } from 'react';
import { Send, MessageSquare, ShieldCheck, Tag, Check, X } from 'lucide-react';
import { useStore, formatINR } from '../../context/StoreContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const MessagesPage = () => {
  const { messages, sendMessage, offers, respondOffer } = useStore();
  const [activeThreadId, setActiveThreadId] = useState(messages[0]?.id || '');
  const [inputText, setInputText] = useState('');

  const activeThread = messages.find(m => m.id === activeThreadId) || messages[0];
  const activeOffer = offers.find(o => o.productTitle === activeThread?.itemTitle);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThreadId) return;

    sendMessage(activeThreadId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="space-y-6 font-sans">
      
      <div className="pb-4 border-b border-cx-800">
        <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
          MESSAGES & OFFERS
        </h1>
        <p className="text-xs text-cx-400 font-mono mt-1">
          Direct communication with verified students to negotiate price, arrange campus handover, and review offers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[620px] rounded-cx-xl border border-cx-750 bg-cx-900 overflow-hidden shadow-cx-card-dark">
        
        {/* Left Threads List */}
        <div className="lg:col-span-4 border-r border-cx-800 flex flex-col bg-cx-950">
          <div className="p-4 border-b border-cx-800 font-mono text-xs text-cx-400 uppercase font-semibold">
            CONVERSATIONS ({messages.length})
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-cx-800">
            {messages.map(thread => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`p-4 cursor-pointer transition-colors space-y-1.5 ${
                    isActive ? 'bg-cx-850 border-l-2 border-cx-0' : 'hover:bg-cx-900'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <img src={thread.participant.avatar} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs font-bold text-cx-0">{thread.participant.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cx-500">{thread.timestamp}</span>
                  </div>
                  <div className="text-[11px] font-mono text-cx-400 font-semibold truncate">{thread.itemTitle}</div>
                  <p className="text-xs text-cx-500 truncate font-sans">{thread.lastMessage}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Thread */}
        <div className="lg:col-span-8 flex flex-col bg-cx-900">
          {activeThread ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-cx-800 flex items-center justify-between bg-cx-950">
                <div className="flex items-center space-x-3">
                  <img src={activeThread.participant.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover border border-cx-700" />
                  <div>
                    <h3 className="text-sm font-bold text-cx-0">{activeThread.participant.name}</h3>
                    <p className="text-[10px] font-mono text-cx-400">{activeThread.participant.college}</p>
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <span className="text-cx-0 font-bold">{activeThread.itemTitle}</span>
                  <span className="block text-[10px] text-cx-500">Verified Campus Trade</span>
                </div>
              </div>

              {/* Offer Card Banner if active offer exists */}
              {activeOffer && (
                <div className="p-3 bg-cx-850 border-b border-cx-750 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center space-x-2 text-cx-0">
                    <Tag className="w-4 h-4 text-cx-0 shrink-0" />
                    <span>Offer Status for "{activeOffer.productTitle}": <strong>{formatINR(activeOffer.offerPrice)}</strong> ({activeOffer.status})</span>
                  </div>
                  {activeOffer.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => respondOffer(activeOffer.id, 'Accepted')}
                        className="px-2.5 py-1 bg-cx-0 text-cx-950 font-bold rounded text-[11px] flex items-center space-x-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => respondOffer(activeOffer.id, 'Rejected')}
                        className="px-2.5 py-1 bg-cx-950 border border-cx-750 text-cx-300 rounded text-[11px] flex items-center space-x-1"
                      >
                        <X className="w-3 h-3" />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Chat Messages Log */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-cx-950/40">
                {activeThread.chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3 rounded-cx-lg text-xs leading-relaxed ${
                        msg.sender === 'me'
                          ? 'bg-cx-0 text-cx-950 font-medium'
                          : 'bg-cx-850 text-cx-0 border border-cx-750'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] font-mono text-cx-500 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Message Input Bar */}
              <form onSubmit={handleSend} className="p-3 border-t border-cx-800 flex items-center space-x-2 bg-cx-950">
                <input
                  type="text"
                  placeholder="Type message to schedule campus handover..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3 py-2 bg-cx-900 border border-cx-700 text-cx-0 text-xs rounded-cx-md placeholder-cx-500 focus:outline-none focus:border-cx-0 font-sans"
                />
                <Button type="submit" variant="primary" size="md" className="font-mono text-xs uppercase">
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-cx-500 font-mono text-xs">
              Select a conversation to open messages.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
