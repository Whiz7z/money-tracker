"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login, register as registration } from "@/requests/auth";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

type Props = {};

function Auth({}: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
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
      // login(data)
      //   .then(() => {
      //     setIsError(null);
      //     router.push("/profile");
      //   })
      //   .catch((err) =>
      //     setIsError("Username or password is not correct. Try again")
      //   );

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
    } else {
      registration(data);
    }
  };

  return (
    <div className="h-[660px] w-[655px] ">
      <h2 className="text-skin-base text-[3.6rem] font-bold">
        {isLogin ? "Login" : "Register"}
      </h2>
      {isError && (
        <p className="text-skin-danger text-[1.6rem] relative top-[40px]">
          {isError}
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-[65px] mt-[70px]"
      >
        <div className="grid w-[100%] relative">
          <label className="justify-self-start  text-left  text-skin-base text-[2rem]">
            Username
          </label>
          <input
            autoComplete="false"
            className="block font-bold w-[100%] bg-transparent pl-[25px] border-[3px] text-skin-base  border-base rounded-[25px] h-[60px]
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

        <div className="grid w-[100%] relative">
          <label className="justify-self-start text-left text-skin-base text-[2rem] w-[100% ">
            Password
          </label>
          <input
            className="block font-bold w-[100%] bg-transparent pl-[25px] border-[3px] text-skin-base  border-base rounded-[25px] h-[60px]
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

        <div className="grid grid-cols-2 gap-[30px] mt-[80px]">
          <button
            className={`${
              isValid ? "bg-accent text-skin-muted" : "bg-muted text-skin-base"
            } rounded-[15px] w-[220px] h-[60px] font-bold  text-[2.8rem] justify-self-end`}
            type="submit"
            disabled={!isValid}
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <button
            className="bg-muted rounded-[15px] w-[220px] h-[60px] font-bold text-skin-base text-[2.8rem] justify-self-start"
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
