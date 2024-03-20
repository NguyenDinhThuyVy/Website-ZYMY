import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import userApi from 'src/apis/user.api' // Đảm bảo import hàm forgetPassword từ module API
import { toast } from 'react-toastify'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const forgetpasswordSchema = schema.pick(['email']) // Sửa schema để phản ánh trường email

export default function Forgetpassword() {
  const {
    register,
    handleSubmit
    // setError,
    // formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(forgetpasswordSchema) })

  const onSubmit = async (data: FormData) => {
    try {
      await userApi.forgetPassword({ email: data.email }) // Gọi hàm forgetPassword với email nhận được từ form
      // Xử lý sau khi gửi thành công, ví dụ hiển thị thông báo cho người dùng
      toast.success('Mật khẩu đã được gởi!', {
        autoClose: 1300 // Tự động đóng thông báo sau 2 giây
      })
    } catch (error) {
      // Xử lý lỗi, ví dụ hiển thị thông báo lỗi cho người dùng
      toast.error('Mật khẩu chưa được gởi! Vui lòng thử lại', {
        autoClose: 1300 // Tự động đóng thông báo sau 2 giây
      })
    }
  }

  return (
    <div className='w-full bg-gradient-to-tl from-yellow to-rose-400'>
      <div className='container main'>
        <div className='max-w-7xl mx-auto px-4 '>
          <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='p-10 rounded bg-white shadow-sm' onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='text-2xl mb-4 font-bold text-center'>Tìm kiếm tài khoản của bạn </div>
                <p className=' text-base mb-3'>Nhận mã xác minh được gửi đến email của bạn !</p>
                <div className='text-xl font-semibold'>Email address</div>
                <Input
                  {...register('email')} // Sử dụng register để kết nối trường input với react-hook-form
                  type='email'
                  className='mt-4'
                  placeholder='Please Enter Your Email'
                />
                <div className='mt-1'>
                  <button
                    type='submit' // Đặt type là submit để kích hoạt sự kiện handleSubmit
                    className='w-full text-center py-4 px-2 uppercase rounded bg-rose-500 text-white text-sm hover:bg-rose-400'
                  >
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
