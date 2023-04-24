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
		// const last10messages = newMessages.slice(-10) // remember last 10 messages
		// console.log(last10messages,"1000");

		// const response = await fetch('/api/chat', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify({
		//     messages: message,
		//     user: cookie[COOKIE_NAME],
		//   }),
		// })

		// console.log('Edge function returned.')

		// if (!response.ok) {
		//   throw new Error(response.statusText)
		// }

		// This data is a ReadableStream
		// const data = response.body
		// if (!data) {
		//   return
		// }

		// const reader = data.getReader()
		// const decoder = new TextDecoder()
		// let done = false

		// let lastMessage = ''

		// while (!done) {
		//   const { value, done: doneReading } = await reader.read()
		//   done = doneReading
		//   const chunkValue = decoder.decode(value)

		//   lastMessage = lastMessage + chunkValue

		setMessages([
			...newMessages,
			{
				role: 'assistant', content: "\n\nNext.js provides several ways to implement dark mode in your web application. Here are a few approaches you can take:\n\n1. Using CSS variables and media queries: You can define CSS variables to store the color values for your light and dark mode. Then, you can use media queries to switch between the two modes based on the user's preference. Here's an example:\n\n```css\n:root {\n  --background-color: #fff;\n  --text-color: #333;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --background-color: #333;\n    --text-color: #fff;\n  }\n}\n\nbody {\n  background-color: var(--background-color);\n  color: var(--text-color);\n}\n```\n\n2. Using a third-party library: You can use a library like `next-themes` to implement dark mode in your Next.js application. This library handles the theme switching for you and provides an easy-to-use API. Here's an example:\n\n```jsx\nimport { useTheme } from 'next-themes';\n\nfunction MyComponent() {\n  const { theme, setTheme } = useTheme();\n\n  return (\n    <div>\n      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>\n        Toggle dark mode\n      </button>\n    </div>\n  );\n}\n```\n\n3. Using the `getInitialProps` function: If you need to generate different content for light and dark mode, you can use the `getInitialProps` function to detect the user's preference and pass it as a prop to your components. Here's an example:\n\n```jsx\nimport React from 'react';\nimport { NextPage } from 'next';\n\ninterface IndexPageProps {\n  darkMode: boolean;\n}\n\nconst IndexPage: NextPage<IndexPageProps> = ({ darkMode }) => {\n  return (\n    <div style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#333' }}>\n      Hello world\n    </div>\n  );\n};\n\nIndexPage.getInitialProps = async ({ req }) => {\n  const darkMode = req && req.headers['user-agent'].includes('Mobile') ? true : false;\n  return { darkMode };\n};\n\nexport default IndexPage;\n```\n\nThese are just a few examples of how you can implement dark mode in your Next.js application. Choose the approach that best fits your needs and preferences."
			} as ChatGPTMessage,
		])

		setLoading(false)
		// }
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
