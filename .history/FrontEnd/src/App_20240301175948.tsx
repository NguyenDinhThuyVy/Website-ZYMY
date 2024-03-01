import useRouteElements from './useRouteElements'

function App() {
  const routerElements = useRouteElements()
  return (
    <div>
      {routerElements}
      <ToastContainer />
    </div>
  )
}

export default App
