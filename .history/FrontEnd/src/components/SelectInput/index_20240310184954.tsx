import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { useController, UseControllerProps } from 'react-hook-form'
import './styled.scss'

interface SelectInputProps extends UseControllerProps {
  isIcon?: boolean | any
  className?: string
  options?: { value: string; label: string }[] // Kiểu dữ liệu của options
}

const SelectInput: React.FC<SelectInputProps> = ({ name, control, isIcon, className, options, ...props }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: 'Action',
    valuePropName: 'value'
  })

  // Khởi tạo state cho data
  const [data, setData] = useState<{ value: string; label: string }[]>([])

  // useEffect để fetch dữ liệu
  useEffect(() => {
    // Thực hiện fetch dữ liệu
    const fetchData = async () => {
      try {
        // Gọi hàm fetch dữ liệu ở đây
        // const response = await getAllCategory();
        // setData(response.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    // Gọi fetchData khi component được mount
    fetchData()

    // Cleanup effect
    return () => {
      // Cleanup code ở đây (nếu cần)
    }
  }, []) // Thêm [] để useEffect chỉ chạy một lần sau khi component được mount

  return (
    <Select
      labelInValue={true}
      defaultValue={{
        value: 'romance',
        label: 'Romance'
      }}
      className={`w-full input h-[45.33px] ${className}`} // Sử dụng className từ props
      {...field}
      {...props}
      options={options || data} // Sử dụng options từ props hoặc từ state data
    />
  )
}

export default SelectInput
