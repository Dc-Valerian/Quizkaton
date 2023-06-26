import { Outlet } from 'react-router-dom'
import StartPage from '../common/Header'

const LayOut = () => {
    return (
        <div>
            <StartPage />
            <Outlet />
        </div>
    )
}

export default LayOut