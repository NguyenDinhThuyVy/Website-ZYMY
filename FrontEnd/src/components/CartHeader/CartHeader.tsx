import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import useSearchProducts from 'src/hooks/useSearchProducts'
import NavHeader from '../NavHeader'

export default function CartHeader() {
  const { onSubmitSearch, register } = useSearchProducts()

  return (
    <div className='border-b border-b-black/10'>
      <div className=' bg-gradient-to-b from-yellow to-rose-400 text-white'>
        <div className='container'>
          <NavHeader />
        </div>
      </div>
      <div className=' bg-white text-rose-400 py-6'>
        <div className='container'>
          <nav className='md:flex md:items-center md:justify-between'>
            <Link to={path.home} className='col-span-2 ml-3 flex items-center'>
              <div className='flex text-4xl items-center justify-items-center gap-1 font-extrabold'>
                <img src='logo.png' alt='' className='w-12 h-12 items-center justify-items-center mr-2 rounded-full ' />
                <span className='text-[#fcc0cdff]'>ZY</span>
                <span className='text-[#f54290ff]'>MY </span>
              </div>
              <div className='mx-4 h-6 w-[1px] bg-rose-400 md:h-8' />
              <div className='capitalize text-rose-400 md:text-xl'>Giỏ hàng</div>
            </Link>
            <form className='mt-3 md:mt-0 md:w-[50%]' onSubmit={onSubmitSearch}>
              <div className='flex rounded-sm border-2 border-rose-400'>
                <input
                  type='text'
                  className='w-full flex-grow border-none bg-transparent px-3 py-1 text-black outline-none'
                  placeholder='Free Ship Đơn Từ 0Đ'
                  {...register('name')}
                />
                <button className='flex-shrink-0 rounded-sm bg-rose-400 py-2 px-8 hover:opacity-90'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5 stroke-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
  )
}
