interface NavItemProps {
  link: Link
}
const NavItem: React.FC<NavItemProps> = ({ link }) => {
  const [activeNav, setActiveNav] = useRecoilState(activeNavItemState)
  return (
    <div
      onClick={() => setActiveNav(link.id)}
      key={link.id}
      className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
       group hover:border-gray-900 border-l-4 border-transparent ${activeNav === link.id && 'border-gray-900 '} `}
    >
      <span> {link.icon}</span>
      <h1 className={`text-gray-600 group-hover:text-black xl:flex hidden ${activeNav === link.id && 'text-black '}} `}>
        {link.title}
      </h1>
    </div>
  )
}
