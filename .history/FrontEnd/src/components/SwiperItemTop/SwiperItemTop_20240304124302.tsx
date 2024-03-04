import { Link } from 'react-router-dom'

interface Props {
  img?: string
  price?: string
  name?: string
}
export default function SwiperItemTop() {
  return (
    <div>
      <Link to='/' className='flex flex-col items-center gap-4'>
        <div className='relative'>
          <img src='https://down-vn.img.susercontent.com/file/c947097d68413b123db4e6fac7e5c49a' alt='' />
          <div className='absolute bottom-0 w-full'>
            <div className=' bg-gray-400 text-white  w-full h-6 flex items-center justify-center opacity-45 '>
              Đã bán 63.3k
            </div>
          </div>
        </div>

        <div>
          <span>Son Kem Lì Mịn Môi</span>
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
