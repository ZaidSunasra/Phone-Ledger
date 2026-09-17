import { Toaster } from "sonner"
import Router from "./routes/route"
import { useMe } from "./api/auth/auth.queries"

function App() {
  useMe()

  return (
    <>
      <Router />
      <Toaster richColors expand={true} closeButton position="bottom-right" />
    </>
  )
}

export default App
