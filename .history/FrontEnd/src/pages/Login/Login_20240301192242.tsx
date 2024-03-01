import { Link } from 'react-router-dom'
import '../styles/mainRegister.scss'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema, LoginSchema } from 'src/utils/rules'
import { useMutation } from 'react-query'
import { ResponseApi } from 'src/types/utils.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { toast } from 'react-toastify'
import { login } from 'src/apis/auth.api'
import 'react-toastify/dist/ReactToastify.css'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'

type FormData = LoginSchema
export default function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    console.log('data', data)
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success('Đăng nhập thành công!')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
        toast.error('Đăng nhập thất bại!')
      }
    })
  })

  return (
    <div className='w-full bg-gradient-to-tl from-yellow to-rose-400'>
      <div className='container main'>
        <div className='max-w-7xl mx-auto px-4 '>
          <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl '>Đăng nhập</div>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  className='mt-8'
                  errorMessage={errors.email?.message}
                  placeholder='Email'
                />
                <div className='relative w-full'>
                  <Input
                    name='password'
                    register={register}
                    type='password'
                    className='mt-2'
                    errorMessage={errors.password?.message}
                    placeholder='Password'
                    autoComplete='on'
                  />
                  <button
                    className='absolute translate-y-1/3 cursor-pointer right-3 bottom-1/2'
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? <AiFillEye size='20px' /> : <AiFillEyeInvisible size='20px' />}
                  </button>
                </div>
                <div className='mt-3'>
                  <button className='w-full text-center py-4 px-2 uppercase rounded bg-rose-500 text-white text-sm hover:bg-rose-400'>
                    Đăng nhập
                  </button>
                </div>
                <div className='mt-3 flex justify-end text-[14px] text-blue-500 hover:text-blue-600'>
                  <a href='/forgetpassword'>Quên mật khẩu</a>
                  {/* <ToastContainer /> */}
                </div>
                <div className='flex items-center justify-center mt-8'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link className='text-rose-600 ml-1' to='/register'>
                    Đăng ký
                  </Link>
                </div>
                <div className='mx-auto mt-2 w-max'>
                  <Link className='flex items-center text-sm font-medium gap-x-1 text-gray-600' to='/'>
                    <HiArrowNarrowLeft />
                    Back to Home
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
