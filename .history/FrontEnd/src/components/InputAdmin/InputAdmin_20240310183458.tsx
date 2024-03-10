import { useController, UseControllerProps, FieldValues, FieldPath } from 'react-hook-form'
import PropTypes from 'prop-types' // Import thư viện prop-types
import '../../styles/Input.scss'

interface InputAdminProps extends UseControllerProps {
  isIcon?: boolean
  className?: string
  type?: string // Thêm kiểu dữ liệu cho prop type
  name: FieldPath<FieldValues> // Đảm bảo name là một FieldPath<FieldValues>
}

const InputAdmin: React.FC<InputAdminProps> = ({ name, control, isIcon, className, type, ...props }) => {
  const { field } = useController({ name, control, defaultValue: '' })

  return (
    <input
      className={`input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold ${
        isIcon ? 'pr-[40px]' : ''
      } ${className}`}
      type={type} // Sử dụng prop type ở đây
      {...field}
      {...props}
    />
  )
}

// Xác nhận kiểu dữ liệu của props sử dụng PropTypes
InputAdmin.propTypes = {
  isIcon: PropTypes.bool,
  className: PropTypes.string,

  type: PropTypes.string, // Xác định kiểu dữ liệu cho type
  name: PropTypes.string.isRequired // Xác định name là một string bắt buộc
}

export default InputAdmin
