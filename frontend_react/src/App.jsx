import { RouterProvider } from "react-router-dom"
import router from "./router"
import { LayoutProvider } from "./context/LayoutContext"
import { AuthContextProvider } from "./context/AuthContext"

function App() {
  
  return (
    <>
      <AuthContextProvider>
        <LayoutProvider>
          <RouterProvider router={router}/>
        </LayoutProvider>
      </AuthContextProvider>
      
    </>
  )
}

export default App
