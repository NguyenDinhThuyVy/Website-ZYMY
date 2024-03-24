import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'
import logo from 'src/assets/images/logo.png'

export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const { t } = useTranslation(['login'])
  const isRegister = Boolean(registerMatch)
  return (
    <header className='py-2 px-20'>
      <div className='container my-0 mx-auto'>
        <nav className='flex justify-between items-center'>
          <div className='flex justify-between items-center'>
            <Link to='/' className='col-span-2 ml-3'>
              <div className='flex text-4xl items-center justify-items-center  font-extrabold'>
                <img src={logo} alt='' className='w-12 h-12 items-center justify-items-center mr-2 rounded-full ' />
                <span className='text-[#fcc0cdff]'>ZY</span>
                <span className='text-[#f54290ff]'>MY </span>
              </div>
            </Link>
            <div className='flex items-center ml-5 text-2xl lg:text-l font-sans font-semibold'>
              {isRegister ? `${t('regiter')}` : `${t('logIn')}`}
            </div>
          </div>
          <Link to='/' className='flex items-start text-rose-400 ml-5 text-base '>
            {t('help')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
