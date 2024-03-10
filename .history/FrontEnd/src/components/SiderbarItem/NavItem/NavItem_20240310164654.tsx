// import { useRecoilState } from 'recoil'
// import { activeNavItemState } from 'src/atoms/ActiveNavBarAtom'

import { Link } from 'react-router-dom'

// interface Link {
//   id: number
//   title: string
//   icon: JSX.Element
//   link: string
// }
interface NavItemProps {
  data: any
}
const NavItem = ({ data }: NavItemProps) => {
  // const [activeNav, setActiveNav] = useRecoilState(activeNavItemState)
  return (
    <div
      // onClick={() => setActiveNav(data.id)}
      className={`w-full flex items-center  space-x-8 px-5 cursor-pointer
       group hover:border-rose-500 border-l-4 border-transparent  `}
    >
      <Link to={data.link} className='flex items-center w-full justify-between'>
        <span className='`text-gray-600 group-hover:text-rose-400 xl:flex hidden'> {data.icon}</span>
        <h1 className={`text-gray-600 group-hover:text-rose-400 xl:flex hidden } `}>{data.title}</h1>
      </Link>
    </div>
  )
}
export default NavItem
