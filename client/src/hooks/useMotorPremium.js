import { useState,useEffect } from "react";
import tariffData from '../helper/tariffs.json'


// Premium Calculation Hook
export const useMotorPremium = () => {
     
// Premium Calculation process
    const motorPremiumCalculator = (premiumLoad)=>{
       
    const {
            policyClass, vehicleValue, Cover, usageType, seats,
           numOfDays, tppd, ncd, fleet, exchangeRateValue, currencySign,
           fleetMap,ncdMap,seatLoad,thirdPartyBasicMap,fixedChargesMap,thirdPartyUsage,
           comprehensiveUsage,standardTPPDLimit,fixedshortperiodcharge,shortperiodrate
        
     } = premiumLoad;
  

    let exchangeRate = (exchangeRateValue === "" || exchangeRateValue === 0 || currencySign === "GH¢") ? 1.00 : +exchangeRateValue;
    let usage = policyClass === "COMPREHENSIVE" ? comprehensiveUsage[usageType] : thirdPartyUsage[usageType];
    
      // Extra Seat Loading
      let extraSeatLoading = (Number(seats) > 5) ? ((Number(seats) - 5) * (seatLoad[usageType])) : 0;
      
      // Load Extra TPPD limit
      let tppdLoad = (tppd && exchangeRateValue !== 0) ? (((tppd * exchangeRate) - standardTPPDLimit) * ((usageType === "Private Individual" || usageType === "Motorcycle") ? 0.01 : 0.02)) : 0.00;
    
    
      const fixedCharges = fixedChargesMap[usageType] || fixedChargesMap.default;
      const thirdParty = thirdPartyBasicMap[usageType] || thirdPartyBasicMap.default;
    
      // Basic Premium Calculation
      let basicPremium = usage * vehicleValue * exchangeRate;
      // Excess Rate Calculation
      const excessRate = (["Private Individual", "Motorcycle", "Private Corporate"].includes(usageType)) ? 0.1 : 0.15;
    
      // Excess Load Calculation
      let excessLoading = (Cover === "Excess Bought (100% Cover)") ? (basicPremium * excessRate) : 0;
    
      const holdNCD = ncdMap[ncd] || ncdMap.default;
      const holdFleet = fleetMap[fleet] || fleetMap.default;
    
      // Additional Charges Calculation
      let additionalCharges = thirdParty + extraSeatLoading + tppdLoad + excessLoading + fixedCharges;
    
      // Annual Premium Calculation
      let annualPremium = (policyClass === "THIRD-PARTY") ?
        ((thirdParty * holdNCD * holdFleet) + extraSeatLoading + tppdLoad + fixedCharges) :
        ((basicPremium * holdNCD * holdFleet) + additionalCharges);
    
      // Short Period Calculation
      let shortPeriod = (shortperiodrate * (numOfDays / 365) * (annualPremium - fixedshortperiodcharge)) + fixedshortperiodcharge;
    
      // Format and return the result
      if (+numOfDays < 279 && +numOfDays !== 0) {
        // Format shortPeriod with commas
        const formattedShortPeriod = (shortPeriod / exchangeRate).toLocaleString('en-US', { maximumFractionDigits: 2 });
        return `${currencySign} ${formattedShortPeriod}`;
      } else {
        // Format annualPremium with commas
        const formattedAnnualPremium = (annualPremium / exchangeRate).toLocaleString('en-US', { maximumFractionDigits: 2 });
        return `${currencySign} ${formattedAnnualPremium}`;
      }
    }

        // NCD Calculation
        const ncdMap = {
        "0% (Inception)": 1,
        "10% (Motorcycle Discount)": 0.9,
        "15% (First Year)": 0.85,
        "20% (Second Year)": 0.8,
        "25% (First Year)": 0.75,
        "25% (Third Year)": 0.75,
        "30% (Second Year)": 0.7,
        "35% (Third Year)": 0.65,
        "45% (Fouth Year)": 0.55,
        "50% (Fifth Year)": 0.5,
        "default": 1
       };

        // Fleet Calculation
       const fleetMap = {
            "5% (5 Cars & Above)": 0.95,
            "10% (10 Cars & Above)": 0.9,
            "15% (15 Cars & Above)" : 0.85,
            "default": 1.00
        };
      

       
        const [tariffs,setTariffs] = useState({
            thirdPartyUsage: {},
            comprehensiveUsage: {},
            shortperiodrate: 1.3,
            fixedshortperiodcharge: 33,
            seatLoad: {},
            thirdPartyBasicMap: {},
            fixedChargesMap: {},
            standardTPPDLimit: 6000,
                    })

        //when component mounts fetch all tarriff versions
        useEffect(()=>{
               // console.log(tariffData)
                setTariffs((prev)=>({...prev,...tariffData}));
        },[])


    const calculator = (payload)=>{ //console.log(payload)
        // Set the following values based on payload.version
        let premiumLoad = {};
        const {
            thirdPartyUsage,
            comprehensiveUsage,
            shortperiodrate,
            fixedshortperiodcharge,
            seatLoad,
            thirdPartyBasicMap,
            fixedChargesMap,
            standardTPPDLimit,
          } = tariffs;
          
               
                      premiumLoad = {
                        ...payload,fleetMap,ncdMap,thirdPartyUsage,comprehensiveUsage,
                        shortperiodrate,fixedshortperiodcharge, 
                        seatLoad: seatLoad,
                        thirdPartyBasicMap:thirdPartyBasicMap,
                        fixedChargesMap:fixedChargesMap,
                         standardTPPDLimit:standardTPPDLimit
                    }
         return motorPremiumCalculator(premiumLoad);

              
                  
             

    }
    return calculator;
  
};

