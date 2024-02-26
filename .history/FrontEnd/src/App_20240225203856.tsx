import useRouteElements from './useRouteElements'

function App() {
  const routerElements = useRouteElements()
  return <div>{routerElements}</div>
}

export default App
