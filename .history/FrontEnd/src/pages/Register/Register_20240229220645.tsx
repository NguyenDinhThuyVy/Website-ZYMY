import { Link } from 'react-router-dom'
import '../styles/mainRegister.scss'
import { useForm } from 'react-hook-form'
import { getRules } from 'src/utils/rules'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
type FormData = Schema
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })
  const rules = getRules(getValues)
  const onSubmit = handleSubmit(
    (data) => {
      // console.log(data)
    },
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )
  return (
    <div className='w-full bg-gradient-to-tl from-yellow to-rose-400'>
      <div className='container main'>
        <div className='max-w-7xl mx-auto px-4 '>
          <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl'>Đăng ký</div>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  className='mt-8'
                  errorMessage={errors.email?.message}
                  placeholder='Email'
                />

                <Input
                  name='password'
                  register={register}
                  type='password'
                  className='mt-2'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                  autoComplete='on'
                />
                <Input
                  name='confirm_password'
                  register={register}
                  type='password'
                  className='mt-2'
                  errorMessage={errors.confirm_password?.message}
                  placeholder='Confirm Password'
                  rules={rules.confirm_password}
                  autoComplete='on'
                />
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
