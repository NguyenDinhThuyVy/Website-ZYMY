import { useController, UseControllerProps, Control, FieldValues, FieldPath } from 'react-hook-form'
import PropTypes from 'prop-types'
import '../../styles/Input.scss'

interface InputAdminProps extends UseControllerProps {
  isIcon?: boolean
  className?: string
  control: Control<FieldValues, any> // Sửa kiểu dữ liệu của control
  type?: string
  name: FieldPath<FieldValues>
}

const InputAdmin: React.FC<InputAdminProps> = ({ name, control, isIcon, className, type, ...props }) => {
  const { field } = useController({ name, control, defaultValue: '' })

  return (
    <input
      className={`input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold ${
        isIcon ? 'pr-[40px]' : ''
      } ${className}`}
      type={type}
      {...field}
      {...props}
    />
  )
}

InputAdmin.propTypes = {
  isIcon: PropTypes.bool,
  className: PropTypes.string,
  control: PropTypes.object.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired
}

export default InputAdmin
