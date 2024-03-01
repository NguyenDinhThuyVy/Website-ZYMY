import { Link } from 'react-router-dom'
import Popover from '../Popover/Popover'
// import { AppContext } from 'src/contexts/app.context'
// import { useMutation } from 'react-query'
// import { logout } from 'src/apis/auth.api'
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa'

export default function Header() {
  // const { setIsAuthenticated, isAuthenticated } = useContext(AppContext)
  // const logoutMutation = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     setIsAuthenticated(false)
  //   }
  // })

  // const handleLogout = () => {
  //   logoutMutation.mutate()
  // }
  return (
    <div className='pb-5 pt-2 bg-gradient-to-tl from-yellow to-rose-500 text-white'>
      <div className='container'>
        <div className='flex justify-between text-sm'>
          <div className='flex justify-start gap-1 divide-x-2 divide-slate-300/20'>
            <div className='flex items-center py-1 hover:text-gray-200 cursor-pointer'>
              <span className='px-3'>Kênh quản lý</span>
            </div>
            <div className='flex items-center py-1 hover:text-gray-200 cursor-pointer'>
              <span className=' px-3 '>Tải ứng dụng</span>
            </div>
            <div className='flex items-center py-1 '>
              <span className='px-3 '>Kết nối</span>
              <div className='flex gap-3 items-cente'>
                <a
                  href='https://www.facebook.com/profile.php?id=100011247827310'
                  className='hover:text-gray-200 cursor-pointer'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <FaFacebook className='w-4 h-5' />
                </a>
                <a
                  href='https://www.instagram.com/zynn_1202/'
                  className='hover:text-gray-200 cursor-pointer'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <FaInstagramSquare className='w-4 h-5' />
                </a>
              </div>
            </div>
          </div>
          <div className='flex justify-end gap-1'>
            <div className='flex items-center py-1 hover:text-gray-300 cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
                />
              </svg>
              <span className='mx-1'>Hỗ Trợ</span>
            </div>
            <Popover
              className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                  <div className='flex flex-col py-2 pr-28 pl-3'>
                    <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
                    <button className='py-2 px-3 hover:text-orange mt-2'>English</button>
                  </div>
                </div>
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
              <span className='mx-1 '>Tiếng Việt</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </Popover>
            {/* {isAuthenticated && ( */}
            <Popover
              className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                  <Link
                    to='/profile'
                    className='block py-3 px-6 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link
                    to='/'
                    className='block py-3 px-6 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Đơn mua
                  </Link>
                  <button
                    // onClick={handleLogout}
                    className='block py-3 px-6 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              {' '}
              <div className='w-7 h-7 mr-2 flex-shrink-0'>
                <img
                  src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/10/hinh-ve-cute-50.jpg'
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <div>nguyendinhthuyvy</div>
            </Popover>
            {/* )} */}
            {/* {!isAuthenticated && (
              <div className='flex items-center'>
                <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
                  Đăng ký
                </Link>
                <div className='border-r-[1px] border-r-white/40 h-4' />
                <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
                  Đăng nhập
                </Link>
              </div>
            )} */}
          </div>
        </div>

        <div className='grid grid-cols-12 gap-3 mt-4 items-end'>
          <Link to='/'>
            <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='230' height='70'>
              <image
                width='220'
                height='60'
                preserveAspectRatio='none'
                transform='scale(1.2)'
                xlinkHref='data:image/png;base64,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'
              ></image>
            </svg>
          </Link>
          <form className='col-span-9'>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                name='search'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='Free Ship Đơn Từ 0Đ'
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
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
          <div className='cols-span-1 justify-self-end'>
            <Popover
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200 max-w-[400px] text-sm'>
                  <div className='p-2'>
                    <div className='text-gray-400 capitalize'>Sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/sg-11134201-22110-s3ycuwtvgvjvb4_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫469.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/sg-11134201-22110-s3ycuwtvgvjvb4_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫469.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/sg-11134201-22110-s3ycuwtvgvjvb4_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫469.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/sg-11134201-22110-s3ycuwtvgvjvb4_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫469.000</span>
                        </div>
                      </div>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            src='https://cf.shopee.vn/file/sg-11134201-22110-s3ycuwtvgvjvb4_tn'
                            alt='anh'
                            className='w-11 h-11 object-cover'
                          />
                        </div>
                        <div className='flex-grow ml-2 overflow-hidden'>
                          <div className='truncate'>
                            [LIFEMCMBP2 -12% đơn 250K] Bộ Nồi Inox 3 Đáy SUNHOUSE SH334 16, 20, 24 cm
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-orange'>₫469.000</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-6 items-center justify-between'>
                      <div className='capitalize text-xs text-gray-400'>Thêm hàng vào giỏ</div>
                      <button className='capitalize bg-orange hover:bg-opacity-90 px-4 py-2 rounded-sm text-white'>
                        Xem giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to='/'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-8 h-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}