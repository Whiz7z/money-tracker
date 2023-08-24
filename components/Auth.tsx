"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login, register as registration } from "@/requests/auth";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

type Props = {};

function Auth(props: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data: any) => {
    console.log(data);
    if (isLogin) {
      try {
        setLoading(true);
        const response = await signIn("credentials", {
          redirect: false,
          username: data.username,
          password: data.password,
        });

        console.log(response);
        if (response.error) {
          setLoading(false);
        }
        if (response && !response.error) {
          router.push("/profile");
        }
      } catch (err) {}
    } else {
      setLoading(true);
      registration(data)
        .then(async () => {
          try {
            const response = await signIn("credentials", {
              redirect: false,
              username: data.username,
              password: data.password,
            });

            console.log(response);

            if (response && !response.error) {
              router.push("/profile");
            }
          } catch (err) {}
        })
        .catch((err) => {
          setLoading(false);
          setIsError("User already exist");
        });
    }
  };

  return (
    <>
      <div className="relative self-center w-[300px] tablet:w-[300px] bigtablet:w-[320px]  laptop:w-[450px] h-[320px]">
        <div className="block-shadow"></div>
        <div className="absolute h-[320px] w-[300px] tablet:w-[300px] bigtablet:w-[320px] laptop:w-[450px] self-center bg-[#000]">
          <h2 className="text-skin-good  tablet:text-[2.4rem]  font-bold mt-[30px] mb-[35px]">
            {isLogin ? "Login" : "Register"}
          </h2>

          {isError && (
            <p className="text-skin-danger text-[1.4rem] absolute py-[5px] w-[100%] top-[60px]">
              {isError}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="grid">
            <div className="grid w-[260px] bigtablet:w-[260px] laptop:w-[300px] justify-self-center  relative mb-[20px]">
              <input
                autoComplete="false"
                className="block font-medium w-[100%] bg-input pl-[25px] 
            border-[1px]   text-skin-muted placeholder:text-skin-muted placeholder:font-normal
            border-border h-[40px]  text-[1.4rem]
            "
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Required",
                  minLength: { value: 5, message: "Min 5 symbols" },
                  maxLength: { value: 30, message: "Max 30 symbols" },
                })}
              />
              <p className="block text-skin-danger text-left text-[1.2rem] top-[105%] absolute">
                {errors?.username && (
                  <>{errors?.username?.message || "Error"}</>
                )}
              </p>
            </div>

            <div className="grid w-[260px] bigtablet:w-[260px] laptop:w-[300px] justify-self-center relative mb-[35px]">
              <input
                className="block font-placeholder:font-normal w-[100%] bg-input pl-[25px] 
            border-[1px]  text-skin-muted placeholder:text-skin-muted placeholder:font-normal
            border-border h-[40px] text-[1.4rem]"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Required",
                  minLength: { value: 5, message: "Min 5 symbols" },
                  maxLength: { value: 25, message: "Max 25 symbols" },
                })}
              />
              <p className="block text-skin-danger text-left text-[1.2rem]  top-[105%] absolute">
                {errors?.password && (
                  <>{errors?.password?.message || "Error"}</>
                )}
              </p>
            </div>
            {/* <p className="text-skin-base text-[2rem] font-bold text-center absolute"></p> */}
            <div className="grid grid-cols-2 text-skin-ordinary w-[260px] bigtablet:w-[260px] laptop:w-[300px] justify-self-center">
              <button
                className={`${
                  isValid ? "bg-good text-skin-dark" : "bg-fill"
                } w-[110px] laptop:w-[120px] tablet:w-[120px] h-[40px] 
            font-bold  
            text-[1.6rem] justify-self-start`}
                type="submit"
                disabled={!isValid}
              >
                {isLogin && !loading
                  ? "Login"
                  : isLogin && loading
                  ? "Loading..."
                  : !isLogin && loading
                  ? "Loading..."
                  : "Register"}
              </button>
              <button
                className="bg-danger w-[110px] laptop:w-[120px] tablet:w-[120px]
             h-[40px]  font-bold text-[1.6rem] justify-self-end"
                type="button"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                {isLogin ? "To register" : "To login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Auth;
