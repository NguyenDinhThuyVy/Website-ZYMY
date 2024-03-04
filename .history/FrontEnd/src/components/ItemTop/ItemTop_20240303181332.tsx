import React, { useRef, useState, FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'

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
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false
    }}
    pagination={{
      clickable: true
    }}
    // navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
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
    <div className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
      <button>
        <img src='https://down-vn.img.susercontent.com/file/0e775944902a412f1b3d5977d1ca1e12' alt='' />
        <div>
          <span>Son Kem Lì</span>
        </div>
      </button>
    </div>
  )
}

export default ItemTop
