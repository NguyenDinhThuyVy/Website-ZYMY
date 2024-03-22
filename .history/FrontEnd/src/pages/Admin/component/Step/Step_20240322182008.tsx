import React, { useState } from 'react'
import { Steps } from 'antd'
import Payment from 'src/pages/Payment'

const { Step } = Steps

const Step = () => {
  const [currentStep, setCurrentStep] = useState(1) // Khởi tạo trạng thái hiện tại của bước

  // Hàm để chuyển sang bước tiếp theo
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  return (
    <div>
      <Steps current={currentStep} size='small'>
        <Step title='Payment' />
        <Step title='Completed' />
      </Steps>

      {/* Hiển thị nội dung tương ứng với bước hiện tại */}
      {currentStep === 1 && <Payment onNextStep={nextStep} />}
      {currentStep === 2 && <CompletedComponent />}
    </div>
  )
}

export default Step
