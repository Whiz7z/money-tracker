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
    <div className="h-[640px] tablet:w-[420px] laptop:w-[655px] self-center ">
      <h2 className="text-skin-ordinary bg-muted p-[20px] rounded-[5px] tablet:text-[3rem]  laptop:text-[3.6rem] font-bold">
        {isLogin ? "Login" : "Register"}
      </h2>

      {isError && (
        <p className="text-skin-danger text-[1.6rem] relative top-[40px]">
          {isError}
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-[20px] mt-[40px]"
      >
        <div className="grid w-[100%] bg-muted p-[20px] rounded-[5px] relative">
          <label
            className="justify-self-start  text-left  
          text-skin-ordinary text-[1.4rem]
          tablet:text-[1.6rem]  laptop:text-[2rem]"
          >
            Username
          </label>
          <input
            autoComplete="false"
            className="block font-bold w-[100%] bg-transparent pl-[25px] 
            border-[1px] tablet:border-[3px] text-skin-ordinary placeholder:text-skin-ordinary 
            border-ordinary  rounded-[25px] h-[40px] tablet:h-[60px] text-[1.4rem]
          tablet:text-[1.6rem]  laptop:text-[2rem]
            mt-[20px]"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Required",
              minLength: { value: 5, message: "Min 5 symbols" },
              maxLength: { value: 30, message: "Max 30 symbols" },
            })}
          />
          <p className="block text-skin-danger text-left text-[1.8rem] top-[105%] absolute">
            {errors?.username && <>{errors?.username?.message || "Error"}</>}
          </p>
        </div>

        <div className="grid w-[100%] bg-muted p-[20px] rounded-[5px] relative">
          <label
            className="justify-self-start text-left text-skin-ordinary text-[1.4rem]
          tablet:text-[1.6rem]  laptop:text-[2rem]
           w-[100% "
          >
            Password
          </label>
          <input
            className="block font-bold w-[100%] bg-transparent pl-[25px] 
            border-[1px] tablet:border-[3px] text-skin-ordinary placeholder:text-skin-ordinary 
            border-ordinary  rounded-[25px] h-[40px] tablet:h-[60px] text-[1.4rem]
          tablet:text-[1.6rem]  laptop:text-[2rem]
            mt-[20px]"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Required",
              minLength: { value: 5, message: "Min 5 symbols" },
              maxLength: { value: 25, message: "Max 25 symbols" },
            })}
          />
          <p className="block text-skin-danger text-left text-[1.8rem]  top-[105%] absolute">
            {errors?.password && <>{errors?.password?.message || "Error"}</>}
          </p>
        </div>
        {/* <p className="text-skin-base text-[2rem] font-bold text-center absolute"></p> */}
        <div className="grid grid-cols-2 bg-muted p-[20px] rounded-[5px] gap-[30px] laptop:mt-[80px]">
          <button
            className={`${
              isValid
                ? "bg-accent text-skin-dark"
                : "bg-semitransparent text-skin-ordinary "
            } rounded-[15px] w-[110px] laptop:w-[220px] tablet:w-[160px] h-[40px]  laptop:h-[60px] 
            font-bold  
            text-[1.6rem] tablet:text-[2.2rem] laptop:text-[2.8rem] justify-self-end`}
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
            className="bg-semitransparent rounded-[15px] w-[110px] laptop:w-[220px] tablet:w-[160px]
             h-[40px]  laptop:h-[60px]  font-bold text-skin-ordinary text-[1.6rem] tablet:text-[2.2rem] laptop:text-[2.8rem] justify-self-start"
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "To register" : "To login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
