import React, { useState } from 'react'
import { Steps } from 'antd'

const { Step } = Steps

const YourComponent = () => {
  const [currentStep, setCurrentStep] = useState(0) // Khởi tạo trạng thái hiện tại của bước

  // Hàm để chuyển sang bước tiếp theo
  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  return (
    <div>
      <Steps current={currentStep} size='small'>
        <Step title='Cart' />
        <Step title='Payment' />
        <Step title='Completed' />
      </Steps>

      {/* Hiển thị nội dung tương ứng với bước hiện tại */}
      {currentStep === 0 && <YourCartComponent onNextStep={nextStep} />}
      {currentStep === 1 && <PaymentComponent onNextStep={nextStep} />}
      {currentStep === 2 && <CompletedComponent />}
    </div>
  )
}

export default YourComponent
