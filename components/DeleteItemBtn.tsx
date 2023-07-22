"use client";
import React, { useState } from "react";
import Times from "@/svgComponents/Times";
import Modal from "./UI/Modal";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  type: string;
};

const deleteItemBtn = ({ id, type }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const deleteItemHandler = async (id: string, type: string) => {
    const response = await fetch(
      `http://localhost:3000/api/items?type=${type}&id=${id}`,
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
        className="w-[35px] h-[100%] hover:bg-danger justify-self-end"
        onClick={() => setOpenModal(true)}
      >
        <Times w="35px" h="35px" color="#e49940" />
      </button>
      {openModal && (
        <Modal>
          <p className="self-end text-skin-ordinary">
            Do you want to delete this record?
          </p>
          <div className="grid grid-cols-2 gap-x-[20px] self-center w-[100%] ">
            <button
              onClick={() => setOpenModal(false)}
              className="w-[200px] bg-muted rounded-[10px] h-[40px] justify-self-end text-skin-ordinary font-bold"
            >
              No
            </button>
            <button
              onClick={() => deleteItemHandler(id, type)}
              className="w-[200px] bg-accent rounded-[10px] h-[40px] justify-self-start text-skin-dark font-bold"
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
