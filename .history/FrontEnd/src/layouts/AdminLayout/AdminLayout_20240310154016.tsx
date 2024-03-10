import Footer from 'src/components/Footer'
import NavHeader from 'src/components/NavHeader'
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
