import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
export default function Swipper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
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
    </>
  )
}
