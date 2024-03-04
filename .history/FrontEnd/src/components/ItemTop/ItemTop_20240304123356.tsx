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
      <SwiperSlide className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '>
        <Link to='/' className='flex flex-col items-center gap-4'>
          <div className='relative'>
            <img src='https://down-vn.img.susercontent.com/file/c947097d68413b123db4e6fac7e5c49a' alt='' />
            <div className='absolute bottom-0 w-full'>
              <div className=' bg-gradient-to-b from-yellow to-rose-400 text-gray-600  w-full h-6 flex items-center justify-center opacity-50 '>
                Đã bán 63.3k
              </div>
            </div>
          </div>

          <div>
            <span>hihi</span>
          </div>
        </Link>
        <div className='absolute top-0 left-0'>
          <div className=' bg-gradient-to-b from-yellow to-rose-400 text-white  w-10 h-7 flex items-center justify-center rounded-br-lg'>
            TOP
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}

export default ItemTop
