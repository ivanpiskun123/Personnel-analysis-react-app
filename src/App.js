import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";
import RTLLayout from "./layouts/RTL";
import {useState,useEffect} from "react";
import {AuthContext} from "./contexts/AuthContext";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect( ()=> {
            setIsAuth(false)
            if(localStorage.getItem('auth'))
            {
                setIsAuth(true)
            }
        }
        ,[])

    const logOut = ()=>{
        const logOutUser = async () => {
            try {
                localStorage.removeItem('token')
                localStorage.removeItem('auth')
                setIsAuth(false)
            } catch (e) {
                console.log(e)
            }
        }
        logOutUser()
    }


    return (
            <Switch>
                <AuthContext.Provider value={{
                    isAuth,
                    setIsAuth,
                    isAdmin,
                    setIsAdmin,
                    currentUserId,
                    setCurrentUserId,
                    logOut
                }}>
                    <>
                    {
                        isAuth ?
                            <>
                                <Route path={`/admin`} component={AdminLayout} />
                                <Route path={`/rtl`} component={RTLLayout} />
                                <Redirect from={`/`} to="/admin/candidates" />
                            </>
                            :
                            <>
                                <Route path={`/auth`} component={AuthLayout} />
                                <Redirect to="/auth" />
                            </>
                    }
                    </>
                    </AuthContext.Provider>
            </Switch>
    );
};

export default App;
