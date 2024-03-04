import React, { useRef, useState, FC, useEffect } from 'react'
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
}
function ItemTop({ data }: Props): FC<AppProps> {
  const [listItem, setListItem] = useState([])
  const fectchBannerItem = async () => {
    if (data) {
      setListItem(data?.data.data.products.product)
    }
  }
  useEffect(() => {
    fectchBannerItem()
  }, [])
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
      {listItem?.length > 0 &&
        listItem?.slice(0, 4)?.map((image, index) => (
          <SwiperSlide
            key={index}
            className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '
          >
            <SwiperItemTop img={listItem.image} price='Đã bán 63.3k' name='Son dưỡng '></SwiperItemTop>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ItemTop
