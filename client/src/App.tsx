import { Toaster } from "sonner"
import Router from "./routes/route"

function App() {

  return (
    <>
      <Router />
      <Toaster richColors expand={true} closeButton position="bottom-right"/>
    </>
  )
}

export default App
