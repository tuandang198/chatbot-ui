import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import { ThemeProvider } from "next-themes"

import { getLayout } from '@vercel/examples-ui'

import '@vercel/examples-ui/globals.css'

function App({ Component, pageProps }: AppProps) {
	const Layout = getLayout<LayoutProps>(Component)

	return (
			<Layout
					title="ai-libra"
					path=""
					description="ai-libra">
					<ThemeProvider attribute="class">

						<Component {...pageProps} />
					</ThemeProvider>

					{/* <Analytics /> */}
				</Layout>
				
	)
}

export default App
