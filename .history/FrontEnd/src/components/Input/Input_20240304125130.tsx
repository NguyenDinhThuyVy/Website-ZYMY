import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  className,
  autoComplete,
  name,
  register,
  rules
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded focus:shadow-sm'
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
