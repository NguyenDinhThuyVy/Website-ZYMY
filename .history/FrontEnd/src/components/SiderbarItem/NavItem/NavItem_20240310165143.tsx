// import { useRecoilState } from 'recoil'
// import { activeNavItemState } from 'src/atoms/ActiveNavBarAtom'

import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
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
      className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
       group hover:border-rose-500 border-l-4 border-transparent  `}
    >
      <NavLink
        to={data.link}
        className={({ isActive }) =>
          classNames('mt-4 flex items-center  capitalize transition-colors', {
            'text-rose-400': isActive,
            'text-gray-600': !isActive
          })
        }
      >
        <span> {data.icon}</span>
        <h1>{data.title}</h1>
      </NavLink>
    </div>
  )
}
export default NavItem
