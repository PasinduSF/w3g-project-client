"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Home() {
  const [data, setData] = useState({ email: "", password: "" });
  const router = useRouter();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const credentialData = {
        email: data.email,
        password: data.password,
      };
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await axios.post(
        `${baseUrl}/users/login`,
        JSON.stringify(credentialData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.data;
      // Store the token in localStorage
      localStorage.setItem("token1", responseData.access_token);

      // Use Link properly for navigation
      toast.success("Login Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          router.push("/Dashboard");
        },
      });
    } catch (error) {
      console.error("Login Failed:", error);
      toast.error("Login Failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[533px] h-[490px] border-[1px] border-blue-500">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-[5%] bg-blue-500" />
          <div className="flex items-center justify-center w-full h-[95%]">
            {/* Login Form area */}
            <form
              className="flex flex-col w-[484px] h-[351px] gap-10"
              onSubmit={loginUser}
            >
              {/* Header area */}
              <div className="flex flex-col justify-center w-full h-[10%]">
                <span className="font-Lato text-[28px] font-[700] text-text text-center">
                  Login
                </span>
                <span className="font-Lato font-[700] text-[16px] text-center text-[#64748B]">
                  Lorem ipsum dolor sit amet consectetur. Risus commodo faucibus
                  pellentesque habitan. Tincidunt
                </span>
              </div>
              {/* Input area */}
              <div className="relative flex flex-col gap-4 items-center justify-center h-[50%]">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="w-full h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder"
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="w-full h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder"
                />
                <span className="absolute bottom-0 right-0 font-Lato text-text">
                  Forgot Password
                </span>
              </div>
              {/* Login button area */}
              <div className="flex items-center w-full h-[20%]">
                <button
                  type="submit"
                  className="w-full h-[40px] bg-blue-500 border-none outline-none rounded-[4px] text-[16px] font-medium text-white"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Home;
