import { Navigation, Pagination, Keyboard } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
export default function Swipper() {
  return (
    <div>
      {' '}
      <Swiper
        modules={[Keyboard, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        className='mySwiper'
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  )
}
