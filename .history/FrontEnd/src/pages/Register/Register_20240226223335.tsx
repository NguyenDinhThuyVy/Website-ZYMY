import { Link } from 'react-router-dom'
import '../styles/mainRegister.scss'
import { useForm } from 'react-hook-form'
import { rules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })
  return (
    <div className='w-full bg-gradient-to-tl from-yellow to-rose-400'>
      <div className='container main'>
        <div className='max-w-7xl mx-auto px-4 '>
          <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl'>Đăng ký</div>
                <div className='mt-8'>
                  <input
                    type='email'
                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded focus:shadow-sm'
                    placeholder='Email'
                    {...register('email', rules.email)}
                  />
                  <div className='mt-1 text-red-600 min-h-[1.5rem] text-sm'>{errors.email?.message}</div>
                </div>
                <div className='mt-2'>
                  <input
                    type='password'
                    {...register('password', rules.password)}
                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded focus:shadow-sm'
                    placeholder='Password'
                  />
                  <div className='mt-1 text-red-600 min-h-[1.5rem] text-sm'>{errors.password?.message}</div>
                </div>
                <div className='mt-2'>
                  <input
                    type='password'
                    {...register('confirm_password', rules.confirm_password)}
                    className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded focus:shadow-sm'
                    placeholder='Confirm Password'
                  />
                  <div className='mt-1 text-red-600 min-h-[1.5rem] text-sm'>{errors.confirm_password?.message}</div>
                </div>
                <div className='mt-2'>
                  <button className='w-full text-center py-4 px-2 uppercase rounded bg-rose-500 text-white text-sm hover:bg-rose-400'>
                    Đăng ký
                  </button>
                </div>
                <div className='flex items-center justify-center mt-8'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link className='text-rose-600 ml-1' to='/login'>
                    Đăng nhập
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
