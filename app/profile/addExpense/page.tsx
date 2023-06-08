import React from "react";

type Props = {};

const addExpense = (props: Props) => {
  return (
    <>
      {/* <SignOut /> */}

      <div
        className="grid grid-rows-blockRowGrid text-skin-base w-[655px]  h-[860px] mt-[70px] 
        outline-1 outline outline-white outline-offset-1"
      >
        {/* BALANSE */}
        <p className=" text-[3.2rem] h-[40px] self-start justify-self-center text-skin-danger">
          New Expense
        </p>
        <div className="min-w-[165px] grid justify-self-center self-start ">
          <p className="text-[3.2rem] text-skin-good  justify-self-center	self-start">{`$8,653.00`}</p>
          <p className="text-[3.2rem] text-skin-danger justify-self-center self-start	">
            -$2,420.00
          </p>
        </div>
        {/* MONTH */}
        <div
          className="grid min-w-[200px]  max-w-[400px] grid-cols-month gap-[20px] 
            justify-self-center "
        >
          <div
            className="w-[30px] h-[30px] arrow-clip-left bg-accent col-1 self-end 
              relative bottom-[5px]"
          ></div>
          <div className="self-end">
            <p className="text-[2rem] text-skin-accent leading-4	">2023</p>
            <p className="text-[2.8rem] text-skin-accent">May</p>
          </div>
          <div
            className="w-[30px] h-[30px] arrow-clip-right bg-accent col-3 justify-self-end self-end
               relative bottom-[5px]"
          ></div>
        </div>
        {/* EXPENSES/INCOME SWITCH */}
        {/* <div className="max-w-[240px] self-start  grid grid-cols-switch justify-self-center gap-[5px] text-[2.8rem] mt-[25px]">
            <p
              className={`cursor-pointer	text-skin-danger self-start ${
                active === "expenses" && activeClass
              }`}
              onClick={() => switchHandler("expenses")}
            >
              Expenses
            </p>
            <p className="text-skin-accent self-start">/</p>
            <p
              className={`cursor-pointer text-skin-good self-start ${
                active === "incomes" && activeClass
              }`}
              onClick={() => switchHandler("incomes")}
            >
              Income
            </p>
          </div> */}
        {/* CHART OR LIST SWITCH */}
        {/* <div className="grid self-start  w-[100%] grid-cols-2 mt-[20px]">
            <div className="justify-self-start">
              <ListSvg w="45px" h="45px" fill="#E49940" />
            </div>
            <div className="justify-self-end">
              <ChartSvg w="45px" h="45px" />
            </div>
          </div> */}

        {/* BUTTON */}
        <div className="w-[480px] grid grid-cols justify-self-center self-end ">
          <button
            className="inline-block w-[220px] h-[60px] justify-self-center
               bg-accent rounded-[15px] font-bold text-[2.8rem] text-skin-muted text-center leading-[6rem]	"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default addExpense;
