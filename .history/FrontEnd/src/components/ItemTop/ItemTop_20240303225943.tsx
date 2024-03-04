import React, { useRef, useState, FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import type { SwiperInstance } from 'swiper'
interface AppProps {}
const ItemTop: FC<AppProps> = () => {
  const swiperRef = useRef<SwiperInstance>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (index: number) => {
    setActiveIndex(index)
  }

  const handleSwiper = (swiper: Swiper) => {
    // console.log('Swiper instance:', swiper)
    // Access Swiper API methods and properties here
  }
  return (
    <Swiper
      ref={swiperRef}
      onSwiper={handleSwiper}
      onSlideChange={handleSlideChange}
      slidesPerView={3}
      spaceBetween={30}
      freeMode={true}
      pagination={{
        clickable: true
      }}
      navigation={{
        clickable: true
      }}
      modules={[Pagination, Navigation]}
      className='h-full w-full justify-center'
    >
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <button>
          <img src='1.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </button>
      </SwiperSlide>
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <button>
          <img src='2.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </button>
      </SwiperSlide>
    </Swiper>
  )
}

export default ItemTop
