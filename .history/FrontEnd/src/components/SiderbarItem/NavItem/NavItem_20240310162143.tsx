// import { useRecoilState } from 'recoil'
// import { activeNavItemState } from 'src/atoms/ActiveNavBarAtom'

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
       group hover:border-gray-900 border-l-4 border-transparent  `}
    >
      <span> {data.icon}</span>
      <h1 className={`text-gray-600 group-hover:text-black xl:flex hidden } `}>{data.title}</h1>
    </div>
  )
}
export default NavItem
