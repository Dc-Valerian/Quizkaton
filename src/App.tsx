import { RouterProvider } from 'react-router-dom'
import { mainRoute } from './router/mainRouter'
import { RecoilRoot } from "recoil"

const App = () => {
  return (
    <RecoilRoot>
      <RouterProvider router={mainRoute} />
    </RecoilRoot>
  )
}

export default App