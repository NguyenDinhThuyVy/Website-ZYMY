import Popover from '../Popover/Popover'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQuery } from 'react-query'
import { useContext } from 'react'
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa'
import path from 'src/constants/path'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { purchasesStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import noproduct from 'src/assets/images/no-product.png'
import { formatCurrency } from 'src/utils/utils'
import { queryClient } from 'src/main'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

const MAX_PURCHASES = 5
export default function Header() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  // Khi chúng ta chuyển trang thì Header chỉ bị re-render
  // Chứ không bị unmount - mounting again
  // (Tất nhiên là trừ trường hợp logout rồi nhảy sang RegisterLayout rồi nhảy vào lại)
  // Nên các query này sẽ không bị inactive => Không bị gọi lại => không cần thiết phải set stale: Infinity

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.productSearch,
      search: createSearchParams(config).toString()
    })
  })
  return (
    <div className='pb-5 pt-2 bg-gradient-to-b from-yellow to-rose-400 text-white '>
      <div className='container mx-3'>
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
            {isAuthenticated && (
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
            )}
            {isAuthenticated && (
              <Popover
                className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
                renderPopover={
                  <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                    <Link
                      to={path.profile}
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
                      onClick={handleLogout}
                      className='block py-3 px-6 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                    >
                      Đăng xuất
                    </button>
                  </div>
                }
              >
                <div className='w-7 h-7 mr-2 flex-shrink-0'>
                  <img
                    src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/10/hinh-ve-cute-50.jpg'
                    alt='avatar'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div>{profile?.email}</div>
              </Popover>
            )}
            {!isAuthenticated && (
              <div className='flex items-center'>
                <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
                  Đăng ký
                </Link>
                <div className='border-r-[1px] border-r-white/40 h-4' />
                <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className='grid grid-cols-12 gap-3 mt-4 items-end'>
          <Link to={path.home} className='col-span-2 ml-3'>
            <div className='flex text-4xl items-center justify-items-center gap-1 font-extrabold'>
              <img src='logo.png' alt='' className='w-12 h-12 items-center justify-items-center mr-2 rounded-full ' />
              <span className='text-[#fcc0cdff]'>ZY</span>
              <span className='text-[#f54290ff]'>MY </span>
            </div>
          </Link>
          <form className='col-span-9' onSubmit={onSubmitSearch}>
            <div className='bg-white rounded-sm p-1 flex '>
              <input
                type='text'
                {...register('name')}
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='Free Ship Đơn Từ 0Đ'
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-red-400 hover:opacity-90'>
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
                <div className='relative max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  {purchasesInCart ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, MAX_PURCHASES).map((purchase) => (
                          <div className='mt-2 flex py-2 hover:bg-gray-100' key={purchase._id}>
                            <div className='flex-shrink-0'>
                              <img
                                src={purchase.product.image}
                                alt={purchase.product.name}
                                className='h-11 w-11 object-cover'
                              />
                            </div>
                            <div className='ml-2 flex-grow overflow-hidden'>
                              <div className='truncate'>{purchase.product.name}</div>
                            </div>
                            <div className='ml-2 flex-shrink-0'>
                              <span className='text-rose-400'>₫{formatCurrency(purchase.product.price)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchasesInCart.length > MAX_PURCHASES ? purchasesInCart.length - MAX_PURCHASES : ''} Thêm
                          hàng vào giỏ
                        </div>
                        <Link
                          to={path.cart}
                          className='rounded-sm bg-rose-500 px-4 py-2 capitalize text-white hover:bg-opacity-90'
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col  items-center justify-center p-2'>
                      <img src={noproduct} alt='no purchase' className='h-24 w-24' />
                      <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to='/' className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-8 w-8'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {purchasesInCart && (
                  <span className='absolute top-[-5px] left-[17px] rounded-full bg-white px-[9px] py-[1px] text-xs text-rose-500 '>
                    {purchasesInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
