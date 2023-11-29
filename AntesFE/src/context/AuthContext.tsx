import React, { createContext, useState, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

type AccessTokensType = {
    access: string | undefined;
    refresh: string | undefined;
};

interface CurrentUserContextType {
    authTokens: AccessTokensType;
    setAuthTokens: React.Dispatch<React.SetStateAction<AccessTokensType>>;
    user: string | undefined;
    setUser: React.Dispatch<React.SetStateAction<string | undefined>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userCreated: boolean;
    setUserCreated: React.Dispatch<React.SetStateAction<boolean>>;
    callLogout: () => void;
    signupWarning: boolean;
    setSignupWarning: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
    children: ReactNode;
}

export const AuthContext = createContext<CurrentUserContextType>(
    {} as CurrentUserContextType
);

const AuthProvider: React.FC<Props> = ({ children }) => {
    const [authTokens, setAuthTokens] = useState<AccessTokensType>(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens") || "")
            : undefined
    );

    const [user, setUser] = useState<string | undefined>(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens") || "")
            : undefined
    );

    const [loading, setLoading] = useState<boolean>(false);
    const [userCreated, setUserCreated] = useState<boolean>(false);
    const [signupWarning, setSignupWarning] = useState<boolean>(false);

    // call logout

    function callLogout() {
        setAuthTokens({ access: undefined, refresh: undefined });
        setUser(undefined);
        localStorage.removeItem("authTokens");
    }

    // Updating refresh token
    function updateAccess() {
        if (authTokens) {
            axios
                .post("https://verifyme.up.railway.app/api/token/refresh/", {
                    refresh: authTokens.refresh,
                })
                .then(function (response) {
                    setAuthTokens(response.data);
                    setUser(jwtDecode(response.data.access));
                    localStorage.setItem("authTokens", JSON.stringify(response.data));
                    setLoading(true);
                })
                .catch(function (error) {
                    console.log(error);
                    callLogout();
                });
        }
    }

    // updating refresh token after revisit and access token expire time
    useEffect(() => {
        if (!loading) {
            updateAccess();
        }

        if (!authTokens) {
            setLoading(true);
        }

        const twentyMinutes = 1000 * 60 * 20;

        const interval = setInterval(() => {
            if (authTokens) {
                updateAccess();
            }
        }, twentyMinutes);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setAuthTokens,
                setUser,
                authTokens,
                setLoading,
                loading,
                callLogout,
                userCreated,
                setUserCreated,
                signupWarning,
                setSignupWarning,
            }}
        >
            {loading ? children : null}
        </AuthContext.Provider>
    );
};

export default AuthProvider;