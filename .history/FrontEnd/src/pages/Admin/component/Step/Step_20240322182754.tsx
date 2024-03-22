import React, { useState } from 'react'
import { Steps } from 'antd'
import Payment from 'src/pages/Payment'

const { Step: AntStep } = Steps // Đổi tên biến Step thành AntStep

const StepComponent = () => {
  const [currentStep, setCurrentStep] = useState(1) // Khởi tạo trạng thái hiện tại của bước

  // Hàm để chuyển sang bước tiếp theo
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  return (
    <div className='bg-neutral-100 pt-10 pb-20'>
      <div className='bg-white shadow mx-32 p-5'>
        {' '}
        <Steps current={currentStep} size='small'>
          <AntStep title='Payment' />
          <AntStep title='Completed' />
        </Steps>
        {/* Hiển thị nội dung tương ứng với bước hiện tại */}
        {currentStep === 1 && <Payment onNextStep={nextStep} />}
        {currentStep === 2 && <Payment />}
      </div>
    </div>
  )
}

export default StepComponent
