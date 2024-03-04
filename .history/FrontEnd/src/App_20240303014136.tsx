import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules'

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
