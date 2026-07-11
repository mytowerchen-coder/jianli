import { useState, useRef, useEffect, useCallback } from "react"
import { resumeData } from "@/data/resume"
import { Send, MessageCircle, User, Bot, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
  id: number
}

function matchAnswer(input: string): string {
  const lower = input.toLowerCase()

  // Exact keyword matching
  for (const qa of resumeData.chatQA) {
    for (const keyword of qa.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        return qa.answer
      }
    }
  }

  // Fuzzy fallback — partial match
  for (const qa of resumeData.chatQA) {
    for (const keyword of qa.keywords) {
      const chars = keyword.split("")
      const matched = chars.filter((c) => lower.includes(c)).length
      if (matched / chars.length > 0.6) {
        return qa.answer
      }
    }
  }

  return "这是一个好问题！虽然我的预设回答中没有完全匹配的内容，但我建议您可以尝试问我：\n\n- 自我介绍\n- 团队建设经验\n- 数据架构设计\n- ERP 数据清洗\n- BI 看板设计\n- 技术栈与技能\n- 项目成果\n- 核心竞争优势\n\n点击上方快捷按钮也可以快速提问哦！"
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
      <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse animate-delay-200" />
      <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse animate-delay-400" />
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  // Parse markdown bold
  const formattedContent = message.content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
    .replace(/\n/g, "<br/>")

  return (
    <div
      className={`flex gap-3 animate-slide-in-${isUser ? "right" : "left"} ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
          isUser
            ? "bg-primary/20 text-primary"
            : "bg-neon-purple/20 text-neon-purple"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-primary/15 text-foreground border border-primary/20"
            : "surface-elevated border border-border text-foreground/90"
        }`}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    </div>
  )
}

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "您好！我是陈先生的 AI 简历助手。您可以向我提问任何关于他的专业技能、项目经验、团队管理等方面的问题。试试下方的快捷按钮，或直接输入您的问题！",
      id: 0,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return

      const userMsg: Message = {
        role: "user",
        content: text.trim(),
        id: nextId.current++,
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      // Simulate typing delay
      const delay = Math.min(800 + text.length * 30, 2000)
      setTimeout(() => {
        const answer = matchAnswer(text)
        const assistantMsg: Message = {
          role: "assistant",
          content: answer,
          id: nextId.current++,
        }
        setMessages((prev) => [...prev, assistantMsg])
        setIsTyping(false)
      }, delay)
    },
    [isTyping]
  )

  const handleQuickQuestion = (question: string) => {
    sendMessage(question)
    inputRef.current?.focus()
  }

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "对话已重置。您可以继续向我提问关于陈先生的任何问题！",
        id: nextId.current++,
      },
    ])
  }

  return (
    <section id="chat" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">AI了解我可以为您的企业带来什么？</h2>
        </div>
        <p className="text-muted-foreground mb-8">
          AI 助手会基于简历内容实时回答
        </p>

        {/* Quick question buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resumeData.chatQA.slice(0, 6).map((qa) => (
            <button
              key={qa.question}
              onClick={() => handleQuickQuestion(qa.question)}
              className="px-3 py-1.5 rounded-full text-xs border border-border surface-elevated text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
              disabled={isTyping}
            >
              {qa.question}
            </button>
          ))}
        </div>

        {/* Chat container */}
        <div className="rounded-xl border border-border overflow-hidden surface-elevated">
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-muted-foreground">
                AI 简历助手
              </span>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="重置对话"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-96 overflow-y-auto p-5 space-y-4"
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-neon-purple/20 text-neon-purple">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="surface-elevated border border-border rounded-2xl">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage(input)
              }}
              className="flex gap-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入您的问题..."
                className="flex-1 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
                disabled={isTyping}
              />
              <Button
                type="submit"
                variant="neon-solid"
                size="icon"
                disabled={!input.trim() || isTyping}
                className="shrink-0 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
