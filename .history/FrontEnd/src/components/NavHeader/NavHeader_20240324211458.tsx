import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa'
import { getAvatarUrl } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from '../i18n/i18n'

export default function NavHeader() {
  const { t } = useTranslation(['login'])
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='flex justify-between text-sm'>
      <div className='flex justify-start gap-1 divide-x-2 divide-slate-300/20'>
        {profile?.roles.includes('Admin') ? (
          <div className='flex items-center py-1 hover:text-gray-200 cursor-pointer'>
            <Link to={path.dashboard}>
              <span className='px-3'> {t('manage')}</span>
            </Link>
          </div>
        ) : (
          <div className='flex items-center py-1 text-gray-200 opacity-70'>
            <span className='px-3'>{t('manage')}</span>
          </div>
        )}

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
                <button className='py-2 px-3 text-left hover:text-red-400' onClick={() => changeLanguage('vi')}>
                  Tiếng Việt
                </button>
                <button className='mt-2 py-2 px-3 text-left hover:text-red-400' onClick={() => changeLanguage('en')}>
                  English
                </button>
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
          <span className='mx-1'>{currentLanguage}</span>
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
                  to={path.historyPurchase}
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
                src={getAvatarUrl(profile?.avatar)}
                alt='avatar'
                className='h-full w-full rounded-full object-cover '
              />
            </div>
            <div>{profile?.email}</div>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
              {t('regiter')}
            </Link>
            <div className='border-r-[1px] border-r-white/40 h-4' />
            <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
              {t('logIn')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
