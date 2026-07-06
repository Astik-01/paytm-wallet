import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import api from "../axios";
export const Dashboard = () => {
    return (
        <div>
            <Appbar />
            
            <div className="m-8">
                {/* Hardcoding balance for now, we will fetch it later */}
                <Balance />
                <Users />
            </div>
        </div>
    );
};