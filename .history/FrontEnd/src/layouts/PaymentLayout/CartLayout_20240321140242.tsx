import Footer from 'src/components/Footer'
interface Props {
  children?: React.ReactNode
}
export default function PaymentLayout({ children }: Props) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
