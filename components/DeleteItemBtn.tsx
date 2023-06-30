"use client";
import React, { useState } from "react";
import Times from "@/svgComponents/Times";
import Modal from "./UI/Modal";

type Props = {
  id: string;
  type: string;
};

const deleteItemBtn = ({ id, type }: Props) => {
  const [openModal, setOpenModal] = useState(false);
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
  };
  return (
    <>
      <button
        type="button"
        className="w-[35px] h-[35px] hover:bg-danger justify-self-end"
        onClick={() => setOpenModal(true)}
      >
        <Times w="35px" h="35px" color="#c7ccdb" />
      </button>
      {openModal && <Modal>Popa</Modal>}
    </>
  );
};

export default deleteItemBtn;
