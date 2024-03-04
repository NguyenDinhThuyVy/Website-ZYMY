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
