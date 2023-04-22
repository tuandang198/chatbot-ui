import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />

type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
)

// util helper to convert new lines to <br /> tags
// const convertNewLines = (text: string) =>{
// 	text.split('\n').map((line, i) => (
//     <span key={i}>
//       {line}
//       <br />
//     </span>
//   ))
  
// }
  

export function ChatLine({ role = 'assistant', content }: ChatGPTMessage) {
  if (!content) {
    return null
  }
//   const formatteMessage = convertNewLines(content)
//   console.log(formatteMessage,"Chat");
  
  return (
    <div className='float-left clear-both w-full'>
      {/* <BalancerWrapper> */}
        <div  className={clsx(
                  'float-right mb-8 rounded-lg px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6 w-full break-words',
                  role == 'assistant' ? 'bg-slate-900 ' : 'bg-slate-700'
                )} 
				// className="float-right mb-5 rounded-lg px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6 w-full break-words bg-slate-900"
				>
          <div className="flex space-x-3 ">
            <div className="flex-1 gap-4 w-full">
              <p className="font-large text-xxl text-gray-900">
                <a href="#" 
				className="hover:underline text-white">
                  {role == 'assistant' ? 'AI' : 'You'}
                </a>
              </p>
              <p
                className={clsx(
                  'text ',
                  role == 'assistant' ? 'font-semibold font- ' : 'text-gray-400'
                )}>
                {content}
              </p>
            </div>
          </div>
        </div>
      {/* </BalancerWrapper> */}
    </div>
  )
}
