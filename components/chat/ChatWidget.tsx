'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import ChatMessage from './ChatMessage'
import QuickActions from './QuickActions'

type Msg = { role: 'user' | 'assistant'; content: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      content:
        "Hey! Tell me the movie name + which plan (₹39/₹59/₹89). I can bargain and generate a DM template for you.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text: string) => {
    const content = text.trim()
    if (!content || loading) return
    const userMsg: Msg = { role: 'user', content }
    setMessages((p) => [...p, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Chat error')
      setMessages((p) => [...p, { role: 'assistant', content: data.reply || '…' }])
    } catch (e: any) {
      setMessages((p) => [...p, { role: 'assistant', content: 'Chat failed. Check OPENROUTER_API_KEY and try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 btn-primary shadow-xl z-50 flex items-center gap-2"
        aria-label="Open chat"
      >
        {/* Lively badge (local asset, no external fetch) */}
        <img src="/chatbot.gif" alt="" className="h-6 w-6" />
        <span>Chat</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div>
                <div className="font-bold">MovieMart AI</div>
                <div className="text-xs text-slate-600">Bargain + DM message</div>
              </div>
              <button onClick={() => setOpen(false)} className="btn-soft px-3 py-2" aria-label="Close chat">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
              {loading && (
                <div className="text-sm text-slate-600">Typing…</div>
              )}
              <div ref={endRef} />
            </div>

            <QuickActions onAction={send} />

            <div className="p-4 border-t border-slate-200 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder="Type here…"
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              />
              <button className="btn-primary px-4" onClick={() => send(input)} disabled={loading} aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
