import React, { useEffect } from "react";
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux";
import { updateForex } from "../store/forexData/forexSlice";
import {fetchData} from "../hooks/fetchUtils";
import MotorForm from "../components/MotorForm";
import MotorTypeAnime from "../components/MotorTypeAnime";
import {convertExchangeRates} from "../helper/currency";


export default function Calculator() { 


  const dispatch = useDispatch();
  const forex = useSelector((state) => state.forex.data);

  //Fetch Exchange rate from backend
  const getForex = async() => {
    try {
      const data = await fetchData("http://localhost:3300/api/forex");
      
      let convertedValues = convertExchangeRates(data[0]);
      dispatch(updateForex( {convertedValues}));
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while fetching forex data")
    }
  };
  

    useEffect(() => {
      if (!forex){
           getForex()
        };      
    });
    

  return (
    <div className="min-h-[85vh]">
      <div className="py-6">
          <h1>Daily Cedi Exchange Rates</h1>
          {forex && (
            <div className="flex gap-2 my-4 ">
                <h4 className="p-1 shadow-sm">USD $: {forex.GHS}</h4>
                <h4 className="p-1 shadow-sm">NGN ₦: {forex.NGN} </h4>
                <h4 className="p-1 shadow-sm">GBP £: {forex.GBP}</h4>
                <h4 className="p-1 shadow-sm">EUR €: {forex.EUR}</h4>
                <h4 className="p-1 shadow-sm">CNY ¥: {forex.CNY}</h4>
            </div>
          )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-center justify-center h-full ">
        <div className="flex items-center justify-center">
          <MotorTypeAnime />
        </div>
        <div className="flex items-center justify-center">
          <div className=" rounded-md p-4 shadow-lg">
            <MotorForm />
          </div>
        </div>
      </div>
    </div>
  );
}
