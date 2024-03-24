import { Link, useNavigate } from 'react-router-dom'
import '../styles/mainRegister.scss'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { omit } from 'lodash'
import { schema, Schema } from 'src/utils/rules'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export default function Register() {
  const { t } = useTranslation(['login'])
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(registerSchema) })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        toast.success('Tài khoản đăng ký thành công!', {
          autoClose: 1300 // Tự động đóng thông báo sau 2 giây
        })
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
        toast.error('Tài khoản đăng thất bại!', {
          autoClose: 1300 // Tự động đóng thông báo sau 2 giây
        })
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
                <div className='text-2xl'>Đăng ký</div>
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
                    placeholder='PassWord'
                    errorMessage={errors.password?.message}
                  />
                </div>
                <div className='relative w-full'>
                  <Input
                    name='confirm_password'
                    register={register}
                    type='password'
                    className='mt-2'
                    errorMessage={errors.confirm_password?.message}
                    placeholder='Confirm Password'
                    autoComplete='on'
                  />
                </div>
                <div className='mt-2'>
                  <button className='w-full text-center py-4 px-2 uppercase rounded bg-rose-500 text-white text-sm hover:bg-rose-400'>
                    Đăng ký
                  </button>
                  {/* <ToastContainer /> */}
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
