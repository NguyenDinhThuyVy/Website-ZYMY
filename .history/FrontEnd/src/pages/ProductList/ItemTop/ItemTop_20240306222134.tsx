import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'

import SwiperItemTop from '../SwiperItemTop'

import { AxiosResponse } from 'axios'
import { SuccessResponse } from 'src/types/utils.type'
import { Product, ProductList } from 'src/types/product.type'

// interface AppProps {}
interface Props {
  data?: AxiosResponse<SuccessResponse<ProductList>, any>
}
function ItemTop({ data }: Props) {
  const [listItem, setListItem] = useState<ProductList[]>([])
  const fectchBannerItem = async () => {
    if (data) {
      setListItem(data?.data?.data.products)
    }
  }
  useEffect(() => {
    fectchBannerItem()
  }, [])
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
