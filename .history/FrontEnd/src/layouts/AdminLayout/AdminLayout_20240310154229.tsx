import NavHeader from 'src/components/NavHeader'
interface Props {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <div className=' bg-gradient-to-b from-yellow to-rose-400 text-white'>
        <div className='container'>
          <NavHeader />
        </div>

        {children}
      </div>
    </div>
  )
}
