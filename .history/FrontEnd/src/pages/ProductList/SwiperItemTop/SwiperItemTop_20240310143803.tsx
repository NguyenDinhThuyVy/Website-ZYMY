import { Link } from 'react-router-dom'

interface Props {
  product: any
}
export default function SwiperItemTop({ product }: Props) {
  return (
    <div>
      <Link
        to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}
        className='flex flex-col items-center gap-4'
      >
        <div className='relative'>
          <img src={product?.image} alt='' />
          <div className='absolute bottom-0 w-full'>
            <div className=' bg-gray-500 text-white  w-full h-6 flex items-center justify-center opacity-50 '>
              Đã Bán {product?.view} k
            </div>
          </div>
        </div>

        <div className='w-full'>
          <p className='truncate max-w-40 line-clamp-3 overflow-hidden'>{product?.name}</p>
          {/* <p className='truncate ...'>{products.name}</p> */}
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
