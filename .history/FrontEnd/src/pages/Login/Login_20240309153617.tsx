import { Link, useNavigate } from 'react-router-dom'
import '../styles/mainRegister.scss'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import { useMutation } from 'react-query'
import { ErrorResponse } from 'src/types/utils.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import 'react-toastify/dist/ReactToastify.css'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        toast.success('Đăng nhập thành công!')
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
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
                    autoComplete='on'
                    name='password'
                    className='mt-2'
                    register={register}
                    type='password'
                    placeholder='Mật khẩu cũ'
                    errorMessage={errors.password?.message}
                  />
                </div>
                <div className='mt-3'>
                  <button
                    type='submit'
                    className='w-full text-center py-4 px-2 uppercase rounded bg-rose-500 text-white text-sm hover:bg-rose-400'
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className='mt-3 flex justify-end text-[14px] text-blue-500 hover:text-blue-600'>
                  <a href='/forgetpassword'>Quên mật khẩu</a>
                  {/* <ToastContainer /> */}
                </div>
                <div className='flex items-center justify-center mt-8'>
                  <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                  <Link className='text-rose-600 ml-1' to={path.register}>
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
