import { createBrowserRouter } from "react-router-dom"

import StartPage from "../components/common/Header"
import HomeScreen from "../page/HomeScreen"
import Question from "../page/Question"

export const mainRoute = createBrowserRouter([
    {
        path: "/",
        element: < StartPage />

    },
    {
        path: "/start",
        element: < HomeScreen />

    },
    {
        path: "/questions",
        element: <Question />
    }
])