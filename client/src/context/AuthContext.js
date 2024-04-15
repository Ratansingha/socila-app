import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user :{
        _id: "657c94b796874e3a351f80fa",
      username: "Rita singha",
        email: "rita@gmail.com",
        password: "$2b$10$BKXhGT9Zq7w5GMv47YTCXu2cbXL00WWWBMMpyomwBsx9Y72jFe.WC",
        profilePic: "",
        coverPic: "",
        followers: ["657dce41fcd90f72d9dcb058"], following: [],
        isAdmin: false,
    },
    isFetching: false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}

        </AuthContext.Provider>
    )
}