import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import api from "../axios";
import { useState, useEffect } from "react";


export const Dashboard = () => {
    
    const [name, setName] = useState("");
    
    useEffect( () => {
        
        const fetchUser = async () => {
            try {
                const response = await api.get('/user/me');
                setName(response.data.firstName);
            } catch(error){
                console.error("Failed to fetch user data:", error);
            }
        }
        fetchUser();
    }, []);
    return (
        <div>
            <Appbar name={name} />
            
            <div className="m-8">
                <Balance />
                <Users />
            </div>
        </div>
    );
};