import ItemCategory from 'src/components/ItemCategory'
import Banner from 'src/components/Swiper'

export default function ProductList() {
  return (
    <div className='bg-[#f5f5f5ff]'>
      <div className='flex flex-row gap-5 bg-slate-50 items-center justify-center my-10 mx-32 max-h-60'>
        <div className='flex h-50 w-2/3 items-start bg-slate-50 '>
          <Banner></Banner>
        </div>
        <div className='flex flex-col h-full w-1/3 gap-2 '>
          <div className='h-1/2 rounded-md'>
            <img src='6.jpg' alt='' className='rounded-md' />
          </div>
          <div className='h-1/2 rounded-md'>
            <img src='8.png' alt='' className='rounded-md' />
          </div>
        </div>
      </div>
      <div>
        <ItemCategory></ItemCategory>
      </div>
    </div>
  )
}
