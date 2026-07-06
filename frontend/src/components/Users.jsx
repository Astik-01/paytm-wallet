import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button"; // Reusing your button from the Auth step!
import api from "../axios";
export const Users = () => {
    // Mock data for UI building
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect( () => {

        
        const fetchUsers = async () => {
            try{
                const response = await api.get(`/user/bulk?filter=${filter}`);
                setUsers(response.data.users);
            }
            catch(error){
                console.error("failed to fetch users", error);
            };

        };
        fetchUsers();

        }, [filter]);

    return (
        <div className="p-4">
            <div className="font-bold mt-6 text-lg">
                Users
            </div>

            <div className="my-2">
                <input 
                onChange={(e)=> setFilter(e.target.value)}
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.map(user => <User user={user} key={user._id} />)}
            </div>
        </div>
    );
};

// A small sub-component just to render individual user rows
function User({ user }) {
    const navigate = useNavigate(); 

    return (
        <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]} {/* First letter of name */}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button label={"Send Money"} onClick={() => {
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }}
            />
            </div>
        </div>
    );
}