import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

export const Signin = () => {
  
  const navigate = useNavigate();
  
  const [username, setUsername ] = useState("");
  const [password, setPassword ] = useState("");
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-lg">
          
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          
          {/* Signin usually only requires Email and Password! */}
          <InputBox onChange={(e)=> setUsername(e.target.value)} placeholder="yes@gmail.com" label={"Email"} />
          <InputBox onChange={(e) => setPassword(e.target.value) } type="password" placeholder="123456" label={"Password"} />
          
          <div className="pt-4">
            <Button label={"Sign in"} onClick={async () => {
              try {
                const response = await api.post("/user/signin", {
                  username, 
                  password
                });
                
                localStorage.setItem('token', response.data.token);

                navigate("/dashboard");
              } catch(error){
                alert(error.response?.data?.message || "Sign in failed");
              }
            }} />
          </div>
          
          <BottomWarning 
            label={"Don't have an account?"} 
            buttonText={"Sign up"} 
            to={"/signup"} 
          />
          
        </div>
      </div>
    </div>
  );
};