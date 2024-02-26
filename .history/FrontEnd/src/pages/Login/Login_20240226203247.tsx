import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='main w-full bg-gradient-to-tl from-pink_2 to-pink_1'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              </div>
              <div className='mt-3'>
                <button className='w-full text-center py-4 px-2 uppercase bg-rose-300 text-white text-sm hover:bg-pink_2'>
                  Đăng nhập
                </button>
              </div>
              <div className='mt-3 flex justify-end text-[14px] text-blue-500 hover:text-blue-600'>
                <a href='/'>Quên mật khẩu</a>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-500'>Bạn chưa có tài khoản?</span>
                <Link className='text-pink_2 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
