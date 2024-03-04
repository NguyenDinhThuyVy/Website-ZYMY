import React, { useRef, useState, FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Link } from 'react-router-dom'
import SwiperItemTop from '../SwiperItemTop'

import { AxiosResponse } from 'axios'
import { ProductList } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'

interface AppProps {}
interface Props {
  data?: AxiosResponse<SuccessResponse<ProductList>, any> | undefined
  setListItem: (value: React.SetStateAction<never[]>) => void
}
function ItemTop({ data }: Props): FC<AppProps> {
  const [listItem, setListItem] = useState({})
  if (data) {
    setListItem(data?.data.data.products)
  }
  console.log(listItem)
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
        <SwiperItemTop
          img='https://down-vn.img.susercontent.com/file/sg-11134201-7rbkh-lq1yqc442d0ge0'
          price='Đã bán 63.3k'
          name='Son dưỡng '
        ></SwiperItemTop>
      </SwiperSlide>
      <SwiperSlide className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '>
        <SwiperItemTop
          img='https://down-vn.img.susercontent.com/file/sg-11134201-7rbkh-lq1yqc442d0ge0'
          price='Đã bán 63.3k'
          name='Son dưỡng '
        ></SwiperItemTop>
      </SwiperSlide>
      <SwiperSlide className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '>
        <SwiperItemTop
          img='https://down-vn.img.susercontent.com/file/sg-11134201-7rbkh-lq1yqc442d0ge0'
          price='Đã bán 63.3k'
          name='Son dưỡng '
        ></SwiperItemTop>
      </SwiperSlide>
      <SwiperSlide className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '>
        <SwiperItemTop
          img='https://down-vn.img.susercontent.com/file/sg-11134201-7rbkh-lq1yqc442d0ge0'
          price='Đã bán 63.3k'
          name='Son dưỡng '
        ></SwiperItemTop>
      </SwiperSlide>
      <SwiperSlide className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '>
        <SwiperItemTop
          img='https://down-vn.img.susercontent.com/file/sg-11134201-7rbkh-lq1yqc442d0ge0'
          price='Đã bán 63.3k'
          name='Son dưỡng '
        ></SwiperItemTop>
      </SwiperSlide>
      <SwiperSlide className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '>
        <SwiperItemTop
          img='https://down-vn.img.susercontent.com/file/sg-11134201-7rbkh-lq1yqc442d0ge0'
          price='Đã bán 63.3k'
          name='Son dưỡng '
        ></SwiperItemTop>
      </SwiperSlide>
      <SwiperSlide className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '>
        <SwiperItemTop
          img='https://down-vn.img.susercontent.com/file/sg-11134201-7rbkh-lq1yqc442d0ge0'
          price='Đã bán 63.3k'
          name='Son dưỡng '
        ></SwiperItemTop>
      </SwiperSlide>
    </Swiper>
  )
}

export default ItemTop
