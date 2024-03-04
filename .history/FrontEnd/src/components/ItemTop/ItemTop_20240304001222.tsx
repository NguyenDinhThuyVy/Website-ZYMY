import React, { useRef, useState, FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Link } from 'react-router-dom'
interface AppProps {}
const ItemTop: FC<AppProps> = () => {
  return (
    <Swiper
      slidesPerView={6}
      freeMode={true}
      spaceBetween={30}
      navigation={{
        clickable: true
      }}
      modules={[Pagination, Navigation]}
      className='h-full w-full'
    >
      <SwiperSlide className='flex flex-col items-center justify-center px-2 py-3 shadow-none hover:shadow-lg w-full relative'>
        <Link to='/' className=''>
          <img src='1.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
        <div className='absolute top-0 left-0'>
          <div className=' bg-gradient-to-b from-yellow to-rose-400 text-white  w-10 h-5 flex items-center justify-center'>
            TOP
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default ItemTop
