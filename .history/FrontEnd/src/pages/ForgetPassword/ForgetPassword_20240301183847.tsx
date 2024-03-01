import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { loginSchema, LoginSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'

type FormData = Omit<LoginSchema, 'password'>
const forgetpasswordSchema = loginSchema.omit(['password'])
export default function Forgetpassword() {
  const {
    register
    // handleSubmit,
    // setError,
    // formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(forgetpasswordSchema) })
  return (
    <div className='w-full bg-gradient-to-tl from-yellow to-rose-400'>
      <div className='container main'>
        <div className='max-w-7xl mx-auto px-4 '>
          <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='p-10 rounded bg-white shadow-sm' noValidate>
                <div className='text-2xl '>Tìm kiếm tài khoản của bạn </div>
                <p className='m-1 text-sm'>Nhận mã xác minh được gửi đến email của bạn</p>
                <div className='m-2'>Email address</div>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  className='mt-8'
                  // errorMessage={errors.email?.message}
                  placeholder='Please Entern Your Email'
                />
                <div className='mt-3'>
                  <button className='w-full text-center py-4 px-2 uppercase rounded bg-rose-500 text-white text-sm hover:bg-rose-400'>
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
