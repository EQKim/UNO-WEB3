import type { Metadata } from 'next'
import './globals.css'
import { ReduxProvider } from './components/ReduxProvider'

export const metadata: Metadata = {
  title: 'UNO Game - Online Multiplayer',
  description: 'Play UNO online with friends using functional programming, Redux, and RxJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
