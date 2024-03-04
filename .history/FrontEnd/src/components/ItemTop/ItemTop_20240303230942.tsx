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
      <SwiperSlide className='flex flex-col border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg w-2/3'>
        <Link to='/'>
          <img src='1.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <Link to='/'>
          <img src='2.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <Link to='/'>
          <img src='1.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <Link to='/'>
          <img src='2.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <Link to='/'>
          <img src='1.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <Link to='/'>
          <img src='2.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <Link to='/'>
          <img src='1.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className='flex flex-col items-center justify-center border border-gray-200 px-2 py-3 shadow-none hover:shadow-lg'>
        <Link to='/'>
          <img src='2.jpg' alt='' />
          <div>
            <span>hihi</span>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  )
}

export default ItemTop
