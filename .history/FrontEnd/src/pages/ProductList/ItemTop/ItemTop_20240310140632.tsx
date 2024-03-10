import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import SwiperItemTop from '../SwiperItemTop'
import { Product } from 'src/types/product.type'
import path from 'src/constants/path'
import { Link } from 'react-router-dom'

import { generateNameId } from 'src/utils/utils'
interface Props {
  data?: any
  product?: any
}
function ItemTop({ data }: Props) {
  const [listItem, setListItem] = useState([])
  const fectchBannerItem = async () => {
    if (data) {
      setListItem(data?.data.data.products)
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
      navigation={true}
      // modules={[Pagination, Navigation]}
      className='h-full w-full'
    >
      {data?.data.data.products?.length > 0 &&
        data?.data.data.products.map((product as Product) => (
          <SwiperSlide
            key={index}
            className=' flex flex-col items-center border justify-center px-2 shadow-none hover:shadow-lg w-full relative '
          >
            <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
              {' '}
              <SwiperItemTop products={product}></SwiperItemTop>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default ItemTop
