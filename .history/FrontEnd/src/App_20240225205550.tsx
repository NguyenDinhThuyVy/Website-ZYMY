import useRouteElements from './useRouteElements'

function App() {
  const routerElements = useRouteElements()
  return <div className='bg-red-500'>{routerElements}</div>
}

export default App
