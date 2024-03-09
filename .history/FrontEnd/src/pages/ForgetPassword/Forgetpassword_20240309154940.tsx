import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { HiArrowNarrowLeft } from 'react-icons/hi'

type FormData = Pick<Schema, 'password'>
const forgetpasswordSchema = schema.pick(['password'])

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
                <div className='text-2xl mb-4 font-bold text-center'>Tìm kiếm tài khoản của bạn </div>
                <p className=' text-base mb-3'>Nhận mã xác minh được gửi đến email của bạn !</p>
                <div className='text-xl font-semibold'>Email address</div>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  className='mt-4'
                  // errorMessage={errors.email?.message}
                  placeholder='Please Entern Your Email'
                />
                <div className='mt-1'>
                  <button className='w-full text-center py-4 px-2 uppercase rounded bg-rose-500 text-white text-sm hover:bg-rose-400'>
                    Send
                  </button>
                </div>
                <div className='mx-auto mt-2 w-max'>
                  <Link className='flex items-center text-sm font-medium gap-x-1 text-gray-600' to='/login'>
                    <HiArrowNarrowLeft />
                    Back to Login
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
