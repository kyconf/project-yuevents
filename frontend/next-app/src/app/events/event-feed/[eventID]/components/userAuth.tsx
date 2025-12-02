"use client";

import {useState, useEffect} from "react";

export function useAuth(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<unknown>(null);
    const [token, setToken] = useState<unknown>(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user");

        if(token && userData){
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
            setToken(token);
        }
        else{
            setIsLoggedIn(false);
        }
    }, []);

    return {isLoggedIn, user, token};
}