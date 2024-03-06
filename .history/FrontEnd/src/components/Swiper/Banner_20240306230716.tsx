import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <>
      <Swiper
        // ref={swiperRef}
        // onSwiper={handleSwiper}
        // onSlideChange={handleSlideChange}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        // modules={[Autoplay, Pagination, Navigation]}
        className='h-full w-full justify-center'
      >
        <SwiperSlide className='flex w-full items-center justify-center h-full'>
          <img src='5.jpg' alt='' className='rounded-md' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='2.jpg' alt='' className='rounded-md' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='3.jpg' alt='' className='rounded-md' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='7.jpg' alt='' className='rounded-md' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='4.jpg' alt='' className='rounded-md' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='1.jpg' alt='' className='rounded-md' />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default App
