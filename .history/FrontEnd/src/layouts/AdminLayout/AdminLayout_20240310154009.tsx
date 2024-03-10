import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'
interface Props {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <NavHeader />
      {children}
      <Footer />
    </div>
  )
}
