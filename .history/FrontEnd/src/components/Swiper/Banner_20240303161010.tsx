import React, { useRef, useState, FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'
// import 'swiper/css/pagination'
// import 'swiper/css/navigation'
import type { SwiperInstance } from 'swiper/react'
import type { Autoplay, Pagination, Navigation } from 'swiper'

interface AppProps {}

const App: FC<AppProps> = () => {
  const swiperRef = useRef<SwiperInstance>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (index: number) => {
    setActiveIndex(index)
  }

  const handleSwiper = (swiper: Swiper) => {
    console.log('Swiper instance:', swiper)
    // Access Swiper API methods and properties here
  }

  return (
    <>
      <Swiper
        ref={swiperRef}
        onSwiper={handleSwiper}
        onSlideChange={handleSlideChange}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        {/* More slides */}
      </Swiper>
    </>
  )
}

export default App
