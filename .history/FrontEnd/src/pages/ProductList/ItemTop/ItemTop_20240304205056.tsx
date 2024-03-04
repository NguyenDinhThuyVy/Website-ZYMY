import React, { useRef, useState, FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Link } from 'react-router-dom'
import SwiperItemTop from '../SwiperItemTop'
import classNames from 'classnames'

import { QueryConfig } from '../ProductList'
import { ProductListConfig } from 'src/types/product.type'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'

interface AppProps {}
interface Props {
  queryConfig: QueryConfig
}
function ItemTop({ queryConfig }: Props): FC<AppProps> {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

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
