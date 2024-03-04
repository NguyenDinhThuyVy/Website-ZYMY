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
      <SwiperSlide className='flex flex-col items-center justify-center px-2 py-3 shadow-none hover:shadow-lg w-full relative '>
        <Link to='/'>
          <img src='1.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>

        <div className='bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center'>TOP</div>

        <div className='absolute w-8 h-8 border-t-8 border-orange-500 border-l-8 border-r-8 transform -rotate-45 top-1/2 left-1/2'></div>
      </SwiperSlide>
    </Swiper>
  )
}

export default ItemTop
