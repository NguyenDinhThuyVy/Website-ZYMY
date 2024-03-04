import React, { useRef, useState, FC, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import SwiperItemTop from '../SwiperItemTop'

import { AxiosResponse } from 'axios'
import { ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import { useQuery } from 'react-query'
import productApi from 'src/apis/product.api'

interface AppProps {}
interface Props {
  data?: AxiosResponse<SuccessResponse<ProductList>, any> | undefined
}
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
function ItemTop({ data }: Props): FC<AppProps> {
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  const [listItem, setListItem] = useState<productsData[]>([])
  const fectchBannerItem = async () => {
    if (data) {
      setListItem(data?.data.data.products)
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
        listItem?.slice(10, 18)?.map((products, index) => (
          <SwiperSlide
            key={index}
            className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '
          >
            <SwiperItemTop products={products}></SwiperItemTop>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ItemTop
