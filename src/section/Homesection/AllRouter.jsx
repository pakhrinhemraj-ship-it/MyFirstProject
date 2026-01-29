import { createBrowserRouter } from "react-router-dom";
import Header from "./Header";
import Team from "./Team";
import Login from "../Form/Signup1";
import Signup2 from "../Form/Signup2";
import Signup1 from "../Form/Signup1";


const allRouters = createBrowserRouter([
     
    {
        path: "/",
        element: <Header />
    },
    {
        path: "/team",
        element: <Team />,
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/signup2",

        element: <Signup2 />,
        
    },
    {
        path: "/signup1",
        element: <Signup1 />
    }

]);

export default allRouters;