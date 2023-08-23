"use client";
import React, { useState } from "react";
import Times from "@/svgComponents/Times";
import Modal from "./UI/Modal";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  type: string;
  date: any;
};

const deleteItemBtn = ({ id, type, date }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const deleteItemHandler = async (id: string, type: string) => {
    const response = await fetch(
      `/api/items?type=${type}&id=${id}&date=${date}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${session.user.token}`,
        },
      }
    );

    if (response) {
      setOpenModal(false);
      router.refresh();
    }
  };
  return (
    <>
      <button
        type="button"
        className="w-[35px] h-[100%] ease-in-out duration-300 hover:rotate-90 justify-self-end mr-[26px]"
        onClick={() => setOpenModal(true)}
      >
        <Times w="35px" h="35px" color="#c0586b" />
      </button>
      {openModal && (
        <Modal>
          <p className="self-end text-skin-muted text-[1.8rem] px-[15px]">
            Do you want to delete this record?
          </p>
          <div className="grid grid-cols-2 gap-x-[20px] self-center w-[100%] ">
            <button
              onClick={() => setOpenModal(false)}
              className="w-[100px] laptop:w-[160px]   bg-good h-[40px] justify-self-end text-skin-ordinary font-bold"
            >
              No
            </button>
            <button
              onClick={() => deleteItemHandler(id, type)}
              className=" w-[100px] laptop:w-[160px]  bg-danger h-[40px] justify-self-start text-skin-ordinary font-bold"
            >
              Yes
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default deleteItemBtn;
