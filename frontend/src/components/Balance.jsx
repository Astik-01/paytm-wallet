import {useEffect, useState } from 'react';
import api from '../axios';

export const Balance = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        api.get('/account/balance')
            .then(response => {
                setBalance(Math.floor(response.data.balance));
            })
            .catch(error => {
                console.error("failed to fetch balance", error);
            });
    }, []);

    return (

        <div className="flex items-center p-4">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {balance}
            </div>
        </div>
    );
};