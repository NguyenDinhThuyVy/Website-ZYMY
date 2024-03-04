import { Link } from 'react-router-dom'

interface Props {
  products: string
}
export default function SwiperItemTop({ products }: Props) {
  return (
    <div>
      <Link to='/' className='flex flex-col items-center gap-4'>
        <div className='relative'>
          <img src={products.image} alt='' />
          <div className='absolute bottom-0 w-full'>
            <div className=' bg-gray-500 text-white  w-full h-6 flex items-center justify-center opacity-50 '>
              Đã Bán {products.view} k
            </div>
          </div>
        </div>

        <div>
          {/* <p>{products.name}</p> */}
          <p className='truncate ...'>{products.name}</p>
        </div>
      </Link>
      <div className='absolute top-0 left-0'>
        <div className=' bg-gradient-to-b from-yellow to-rose-400 text-white  w-10 h-7 flex items-center justify-center rounded-br-lg'>
          TOP
        </div>
      </div>
    </div>
  )
}
