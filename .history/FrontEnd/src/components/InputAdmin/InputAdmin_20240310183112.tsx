import { useController, UseControllerProps } from 'react-hook-form'
import PropTypes from 'prop-types' // Import thư viện prop-types
import '../../styles/Input.scss'

interface InputAdminProps extends UseControllerProps {
  isIcon?: boolean
  className?: string
}

const InputAdmin: React.FC<InputAdminProps> = ({ name, control, isIcon, className, ...props }) => {
  const { field } = useController({ name, control, defaultValue: '' })

  return (
    <input
      className={`input w-full py-[10px] pl-[10px] text-base rounded-md outline-none font-semibold ${
        isIcon ? 'pr-[40px]' : ''
      } ${className}`}
      type={props.type}
      {...field}
      {...props}
    />
  )
}

export default InputAdmin
