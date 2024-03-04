import Banner from 'src/components/Swiper'

export default function ProductList() {
  return (
    <div className='flex flex-row gap-5 bg-slate-50 items-center justify-center my-10 mx-32'>
      <div className='flex h-50 w-2/3 items-start'>
        <Banner></Banner>
      </div>
      <div className='flex h-50 w-1/3 items-end'>{/* <Banner></Banner> */}</div>
    </div>
  )
}
