export default function ChatMessage({ message }: { message: { role: 'user' | 'assistant'; content: string } }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isUser ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-200'} rounded-2xl px-4 py-2 text-sm max-w-[85%] whitespace-pre-wrap`}>
        {message.content}
      </div>
    </div>
  )
}
