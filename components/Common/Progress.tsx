"use client";
import { useRouter } from "next/navigation";
import React from "react";

const steps = ["Initial info", "Password screen", "Review"];

const Progress: React.FC<{ step: number }> = ({ step }) => {
  const router = useRouter();
  return (
    <div className="fixed left-0 w-fit h-full px-20 py-[205px] flex flex-col gap-y-5 top-0 bottom-0">
      {steps.map((text, index) => (
        <button
          key={index}
          disabled={step < index}
          onClick={() => router.push(`?step=${index}`)}
          className="flex items-center  gap-x-3"
        >
          <div
            className={`w-4 h-4 rounded-[2px] ${
              text === "Review" && step >= 2
                ? "bg-active "
                : step > index
                ? "bg-passed"
                : step === index
                ? "bg-active"
                : "bg-pending"
            } `}
          ></div>
          <h3 className="text-sm text-primaryTwo ">{text}</h3>
        </button>
      ))}
    </div>
  );
};

export default Progress;
