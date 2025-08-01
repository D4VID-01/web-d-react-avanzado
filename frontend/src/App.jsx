import { ChatBot } from './components/ChatBot'
import { ChatProvider } from './context/ChatContext'

export const App = () => {
  return (
    <ChatProvider>
      <ChatBot />
    </ChatProvider>
  )
}
