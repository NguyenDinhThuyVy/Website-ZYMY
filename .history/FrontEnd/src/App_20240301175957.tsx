import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routerElements = useRouteElements()
  return (
    <div>
      {routerElements}
      <ToastContainer />
    </div>
  )
}

export default App
