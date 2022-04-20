import Home from "../pages/Home"
import SignUp from "../pages/SignUp"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import { Route, Switch } from "react-router-dom"
import { useState, useEffect } from "react"

const Routes = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("@Doit:token"))

        if(token){
            return setIsAuthenticated(true)
        }
    }, [isAuthenticated])
    
    return(
        <Switch>
            <Route exact path='/'>
                <Home isAuthenticated={isAuthenticated} />
            </Route>
            <Route path="/signup">
                <SignUp isAuthenticated={isAuthenticated} />
            </Route>
            <Route path="/login">
                <Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            </Route>
            <Route path="/dashboard">
                <Dashboard isAuthenticated={isAuthenticated} />
            </Route>
        </Switch>
    )
}

export default Routes