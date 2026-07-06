import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../axios';

export const SendMoney = () => {
    // URL se parameters read karne ke liye react-router-dom ka hook
    // URL dikhega kuch aisa: /send?id=123&name=yash
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); //changed: id -> username //undone the change
    const name = searchParams.get("name"); // changed: name -> firstname

    // Amount state mein store karne ke liye
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border border-gray-200 h-max text-gray-900 max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    
                    {/* Header */}
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>

                    <div className="p-6">
                        {/* Friend's Profile Avatar & Name */}
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">
                                    {name ? name[0].toUpperCase() : "U"}
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>

                        {/* Input and Button Form */}
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium lead-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            
                            <button 
                                onClick={ async () => {
                                    try {
                                        // 1. Send the POST request to the backend
                                        await api.post("/account/transfer", {
                                            to: id,
                                            // Ensure amount is sent as a number, not a string
                                            amount: Number(amount) 
                                        });

                                        // 2. Alert the user of success
                                        alert(`Successfully transferred Rs ${amount} to ${name}!`);
                                        
                                        // 3. Send them back to the Dashboard
                                        navigate("/dashboard");
                                    } catch (error) {
                                        // If they don't have enough balance, show the error
                                        alert(error.response?.data?.message || "Transfer failed");
                                    }
                                }

                                }
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white hover:bg-green-600"
                            >
                                Initiate Transfer
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};