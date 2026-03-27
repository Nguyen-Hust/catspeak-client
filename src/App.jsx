import { Provider } from "react-redux"
import AppRouter from "@routes"
import { store } from "@store"
import "@styles/app.css"
import { Toaster } from "react-hot-toast"
import "@/styles/theme.css"

import { ConversationSignalRProvider } from "@/features/messages/context/ConversationSignalRContext"
import ServerDownScreen from "@/shared/components/ServerDownScreen"

function App() {
  return (
    <Provider store={store}>
      <ServerDownScreen />
      <ConversationSignalRProvider>
        <Toaster position="top-center" limit={1} />
        <AppRouter />
      </ConversationSignalRProvider>
    </Provider>
  )
}

export default App

