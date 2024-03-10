import NavHeader from 'src/components/NavHeader'
interface Props {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    <div className='flex flex-col'>
      <div className=' bg-gradient-to-b from-yellow to-rose-400 text-white'>
        <NavHeader />
      </div>
      {children}
    </div>
  )
}
