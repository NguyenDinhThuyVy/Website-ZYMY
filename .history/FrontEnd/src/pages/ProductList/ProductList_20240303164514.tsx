import Banner from 'src/components/Swiper'

export default function ProductList() {
  return (
    <div className='flex flex-row gap-5 bg-slate-50 items-center  my-10 mx-32'>
      <div className='flex h-50 w-2/3 items-start'>
        <Banner></Banner>
      </div>
      <div className='flex flex-col h-full  w-1/3 '>
        <div className='h-1/2'>
          <img src='6.png' alt='' />
        </div>
        <div className='h-1/2'>
          <img src='8.png' alt='' />
        </div>
      </div>
    </div>
  )
}
