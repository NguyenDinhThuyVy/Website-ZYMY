import React from 'react'
import { data } from './data'
import NavItem from './NavItem/NavItem'

const NavBar: React.FC = () => {
  return (
    <nav className='col-span-2 border-r border-gray-200 h-full w-[80px] xl:w-[250px] pt-10 pl-1 flex flex-col items-start justify-between bg-gradient-to-t from-yellow to-rose-200'>
      <div className='space-y-8 w-full '>
        {data.map((data) => (
          <NavItem data={data} key={data.id} />
        ))}
      </div>
    </nav>
  )
}

export default NavBar
