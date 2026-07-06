import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import api from "../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export const Signup = () => {
  
  const navigate = useNavigate();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    // Background container
    <div className="bg-slate-300 h-screen flex justify-center">
      
      {/* // Vertical centering wrapper */}
      <div className="flex flex-col justify-center">
        
        {/*// The actual white card*/}
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-lg">
          
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="yes@gmail.com" label={"Email"} />
          <InputBox onChange={(e) => setPassword(e.target.value)} type="password" placeholder="123456" label={"Password"} />
          
          <div className="pt-4">
            <Button label={"Sign up"} onClick={async () => {
              try {
                const response = await api.post("/user/signup", {
                  username,
                  firstName,
                  lastName,
                  password
                });

                localStorage.setItem("token", response.data.token);

                navigate("/dashboard");
              } catch (error){
                alert(error.response?.data?.message || "Signup failed");
              }
            }}/>
          </div>
          
          <BottomWarning 
            label={"Already have an account?"} 
            buttonText={"Sign in"} 
            to = {"/signin"}
          />
          
        </div>
      </div>
    </div>
  );
}