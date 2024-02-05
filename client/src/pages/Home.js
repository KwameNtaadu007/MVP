import React from "react";
import { useNavigate } from "react-router-dom";
import predict from "../assets/analysis.svg";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-center min-h-[85vh]">
      <div className="flex flex-col items-center  p-4 ">
        <img src={predict} className="" alt="unlock financial freedom" />
        <h1>Empower yourself with knowledge</h1>
      </div>
      <div className="flex flex-col  p-4">
        <h1 className="text-bold text-4xl font-sans ">
          Insurance In Ghana is a Scam!
          <br />
          <span className="text-7xl tracking-tighter font-black">
            Unlock Your Financial Security
          </span>
        </h1>
        <span className="flex gap-2 flex-wrap mt-6">
          <button
            className="p-3 px-6 rounded-2xl border border-[#FF6476] hover:bg-[#FF6476]"
            onClick={() => navigate("/news")}>
            Read More
          </button>
          <button
            className="p-3 rounded-2xl border border-[#FF6476] bg-[#FF6476] hover:bg-[#cf5160]"
            onClick={() => navigate("/calculator")}>
            Check Your Premium
          </button>
        </span>
      </div>
    </div>
  );
}
