import Header from 'src/components/Header'
interface Props {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      {children}
    </div>
  )
}
