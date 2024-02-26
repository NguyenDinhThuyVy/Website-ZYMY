import UseRouterElement from './UseRouterElement'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routerElement = UseRouterElement()
  return (
    <div>
      {routerElement}
      <ToastContainer />
    </div>
  )
}

export default App
