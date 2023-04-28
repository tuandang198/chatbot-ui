import { useEffect, useState } from 'react'
import { Button } from './Button'
import { type ChatGPTMessage, ChatLine, LoadingChatLine } from './ChatLine'
import { useCookies } from 'react-cookie'

const COOKIE_NAME = 'nextjs-example-ai-chat-gpt3'

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: ChatGPTMessage[] = [
	{
		role: 'assistant',
		content: 'Hi! I am a friendly AI assistant. Ask me anything!',
	},
]

const InputMessage = ({ input, setInput, sendMessage }: any) => (
	<div className="mt-6 flex clear-both">
		<input
			type="text"
			aria-label="chat input"
			required
			className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 px-3 py-[calc(theme(spacing.2)-1px)] shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
			value={input}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					sendMessage(input)
					setInput('')
				}
			}}
			onChange={(e) => {
				setInput(e.target.value)
				console.log("dsdasda", input);

			}}
		/>
		<Button
			type="submit"
			className="ml-4 flex-none"
			onClick={() => {
				if (input) {
					sendMessage(input)
					setInput('')
				}
			}}
		>
			Say
		</Button>
	</div>
)

export function Chat() {
	const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages)
	const [input, setInput] = useState('')
	const [loading, setLoading] = useState(false)
	const [cookie, setCookie] = useCookies([COOKIE_NAME])

	useEffect(() => {
		if (!cookie[COOKIE_NAME]) {
			// generate a semi random short id
			const randomId = Math.random().toString(36).substring(7)
			setCookie(COOKIE_NAME, randomId)
		}
	}, [cookie, setCookie])

	// send message to API /api/chat endpoint
	const sendMessage = async (message: string) => {
		setLoading(true)
		await new Promise(f => setTimeout(f, 800));
		const newMessages = [
			...messages,
			{ role: 'user', content: message } as ChatGPTMessage,
		]
		console.log("newMessages: ", newMessages);

		setMessages(newMessages)
		console.log(message,"-------------message");
		
		const API = 'http://192.168.99.92:8080/v1/answering_with_context';
		const response = await fetch(API, {
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    
				uid: "string",
				message: message,
				relevant_degree: 2
			  
		  }),
		})

		if (!response.ok) {
		  throw new Error(response.statusText)
		}
		// This data is a ReadableStream
		
		const data = response.body

		if (!data) {
		  return
		}

		const reader = data.getReader()
		const decoder = new TextDecoder()
		
		let done = false

		let lastMessage = ''

		while (!done) {
		  const { value, done: doneReading } = await reader.read()
		  done = doneReading
		  const chunkValue = decoder.decode(value)
		  lastMessage = lastMessage + chunkValue
		  
		}
		setMessages([
			...newMessages,
			{
				role: 'assistant', content: JSON.parse(lastMessage).AI_message
			} as ChatGPTMessage,
		])
	
		setLoading(false)
	}

	return (
		<div className="rounded-2xl border-zinc-100  lg:border lg:p-6">
			{messages.map(({ content, role }, index) => (
				<ChatLine key={index} role={role} content={content} />
			))}

			{loading && <LoadingChatLine />}

			{messages.length < 2 && (
				<span className="mx-auto flex flex-grow text-gray-400 clear-both">
					Type a message to start the conversation
				</span>
			)}
			<InputMessage
				input={input}
				setInput={setInput}
				sendMessage={sendMessage}
			/>
		</div>
	)
}
