import { useEffect, useState, useRef } from "react";
import { useMotorPremium } from "../hooks/useMotorPremium";
import Select from "./Select";
import styles from "../styles/Form.module.css";

export default function MotorForm() {
  // Custom hook to calculate motor premium
  const calculator = useMotorPremium();

   // State variables
  const [displayPremium, setDisplayPremium] = useState(0.0);
  const [coverOptions, setCoverOptions] = useState([
    { value: "", label: "Cover Type" },
  ]);
  const [thirdParty, setThirdParty] = useState(true);
  const [ncdOptions, setNcdOption] = useState([
    { value: "0% (Inception)", label: "0% (Inception)" },
  ]);
  const [viewLess, setViewLess] = useState(true);
  const [hideDiscounts, setHideDiscounts] = useState(true);
  const [hideCurrencies, setHideCurrencies] = useState(true);
  const valueRef = useRef(null);
  const [formData, setFormData] = useState({
    policyClass: "",
    vehicleValue: 0,
    coverType: "",
    usageType: "",
    seats: 5,
    numOfDays: 365,
    tppd: 6000.0,
    ncd: "",
    fleet: "",
    exchangeRateValue: 1,
    currencySign: "GH¢",
  });

  // Options for Policy Type select input
  const policyClasses = [
    { value: "", label: "Policy Type" },
    { value: "THIRD-PARTY", label: "THIRD-PARTY" },
    { value: "THIRD-PARTY FIRE & THEFT", label: "T-P FIRE & THEFT" },
    { value: "COMPREHENSIVE", label: "COMPREHENSIVE" },
  ];
  // Options for Vehicle Usage select input
  const usageTypes = [
    { value: "", label: "Usage Type" },
    { value: "Private Individual", label: "Private Individual" },
    { value: "Private Corporate", label: "Private Corporate" },
    { value: "Taxi", label: "Taxi" },
    { value: "Hiring Cars", label: "Hiring Cars" },
    { value: "Mini Bus", label: "Mini Bus" },
    { value: "Maxi Bus", label: "Maxi Bus" },
    { value: "Motorcycle", label: "Motorcycle" },
    { value: "Ambulance", label: "Ambulance" },
    { value: "Own Goods (Upto 3000CC)", label: "Own Goods (Upto 3000CC)" },
    { value: "Own Goods (Above 3000CC)", label: "Own Goods (Above 3000CC)" },
    { value: "Art/Tankers", label: "Art/Tankers" },
    { value: "Gen Cartage (Upto 3000CC)", label: "Gen Cartage (Upto 3000CC)" },
    {
      value: "Gen Cartage (Above 3000CC)",
      label: "Gen Cartage (Above 3000CC)",
    },
    { value: "Z.802 OnSite", label: "Z.802 OnSite" },
    { value: "Z.802 OnRoad", label: "Z.802 OnRoad" },
    { value: "GW1 Class1", label: "GW1 Class1" },
    { value: "GW1 Class2", label: "GW1 Class2" },
    { value: "GW1 Class3", label: "GW1 Class3" },
  ];
  // Options for Currency Sign select input
  const currencySigns = [
    { value: "GH¢", label: "GH¢" },
    { value: "US$", label: "US$" },
    { value: "EUR€", label: "EUR€" },
    { value: "YEN¥", label: "YEN¥" },
  ];
 // Function to determine Cover Types based on usage type
  const coverTypes = (usageType) => {
    const privateCover = [
      { value: "90% Cover", label: "90% Cover" },
      { value: "Excess Bought (100% Cover)", label: "100% Cover" },
    ];
    const commercialCover = [
      { value: "85% Cover", label: "85% Cover" },
      { value: "Excess Bought (100% Cover)", label: "100% Cover" },
    ];

    const usage = [
      "Private Individual",
      "Motorcycle",
      "Private Corporate",
    ].includes(usageType)
      ? privateCover
      : commercialCover;
    if (usageType) {
      return setCoverOptions(usage);
    }
    return setCoverOptions([{ value: "", label: "Cover Type" }]);
  };
 // Function to map NCD options based on usage type
  const ncdMap = (option) => {

    const privateNCD = [
      { value: "0% (Inception)", label: "0% (Inception)" },
      { value: "25% (First Year)", label: "25% (First Year)" },
      { value: "30% (Second Year)", label: "30% (Second Year)" },
      { value: "35% (Third Year)", label: "35% (Third Year)" },
      { value: "45% (Fouth Year)", label: "45% (Fouth Year)" },
      { value: "50% (Fifth Year)", label: "50% (Fifth Year)" },
    ];
    const commercialNCD = [
      { value: "0% (Inception)", label: "0% (Inception)" },
      { value: "15% (First Year)", label: "15% (First Year)" },
      { value: "20% (Second Year)", label: "20% (Second Year)" },
      { value: "25% (Third Year)", label: "25% (Third Year)" },
    ];
    const motorNCD = [
      { value: "0% (Inception)", label: "0% (Inception)" },
      {
        value: "10% (Motorcycle Discount)",
        label: "10% (Motorcycle Discount)",
      },
    ];
    if (option === "Motorcycle") return setNcdOption(motorNCD);
    if (["Private Individual", "Private Corporate"].includes(option)) {
      return setNcdOption(privateNCD);
    }
    if (!option)
      return setNcdOption([
        { value: "0% (Inception)", label: "0% (Inception)" },
      ]);
    return setNcdOption(commercialNCD);
  };

  // Fleet Calculation
  const fleetOptions = [
    { value: "", label: "" },
    { value: "5% (5 Cars & Above)", label: "5% (5 Cars & Above)" },
    { value: "10% (10 Cars & Above)", label: "10% (10 Cars & Above)" },
    { value: "15% (15 Cars & Above)", label: "15% (15 Cars & Above)" },
  ];
 // useEffect hook to handle currency conversion
  useEffect(() => {
    const { currencySign, exchangeRateValue, tppd } = formData;
    if (exchangeRateValue !== 1) {
      const newTppd = tppd / exchangeRateValue;
      setFormData((prev) => {
        return { ...prev, tppd: newTppd };
      });
    }

    if (+exchangeRateValue !== 1 && currencySign === "GH¢") {
      setFormData((prev) => {
        return { ...prev, exchangeRateValue: 1 };
      });
    }
  }, [formData?.exchangeRateValue, formData]);
  // useEffect hook to update cover types and NCD options based on usage type
  useEffect(() => {
    coverTypes(formData.usageType);
    ncdMap(formData.usageType);
  }, [formData.usageType]);
 // useEffect hook to handle changes in policy class
  useEffect(() => {
    if (formData.policyClass === "THIRD-PARTY" || formData.policyClass === "") {
      setThirdParty(true);
      setFormData((prev) => {
        return {
          ...prev,
          currencySign: "GH¢",
          exchangeRateValue: 1,
          vehicleValue: 0,
          tppd: 6000.0,
        };
      });
    } else {
      setThirdParty(false);
    }
  }, [formData.policyClass]);
 // Function to reset the form
  const handleReset = (e) => {
    setDisplayPremium(0.0);
    return;
  };
 // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.policyClass !== "THIRD-PARTY" && formData.vehicleValue < 10) {
      valueRef.current.focus();
      throw Error("Vehicle value is required");
    }

    const premium = await calculator(formData);
    setDisplayPremium(premium);
  };
 // Render the component
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-slate-100 dark:bg-ig-blue">
      <div className="pb-2">
        <b>Motor Premium:</b>
        <span> {displayPremium}</span>
      </div>
      <div className="flex justify-end my-2 gap-2">
        <button
          className={`bg-slate-200 dark:bg-slate-900 rounded-2xl shadow-sm p-2 px-2 text-sm ${!hideDiscounts ? 'text-ig-pink-100' : ""}`}
          onClick={() => setHideDiscounts(!hideDiscounts)}
        >
          discount
        </button>
        <button
          className={`bg-slate-200 dark:bg-slate-900 rounded-2xl shadow-sm p-2 px-2 text-sm ${!viewLess ? 'text-ig-pink-100' : ""}`}
          onClick={() => setViewLess(!viewLess)}
        >
          conditions
        </button>
        <button
          className={`${
            thirdParty
              ? "hidden"
              : `bg-slate-200 dark:bg-slate-900 rounded-2xl shadow-sm p-2 px-2 text-sm ${!hideCurrencies && 'text-ig-pink-100'}`
          }`}
          onClick={() => setHideCurrencies(!hideCurrencies)}
        >
          currency
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div className="flex-grow mt-3">
            <label htmlFor="policyClass" className={styles.formLabel}>
              Policy Type:
              <span className="text-danger">*</span>
            </label>
            <Select
              id="policyClass"
              name="policyClass"
              className={`${styles.formElem} dark:bg-gray-800`}
              value={formData.policyClass}
              onChange={handleChange}
              options={policyClasses}
              required={true}
            />
          </div>

          <div className="flex-grow mt-3">
            <label htmlFor="usageType" className={styles.formLabel}>
              Vehicle Usage:
              <span className="text-danger">*</span>
            </label>
            <Select
              id="usageType"
              name="usageType"
              className={`${styles.formElem} dark:bg-gray-800`}
              value={formData.usageType}
              onChange={handleChange}
              options={usageTypes}
              required={true}
            />
          </div>

          <div className={thirdParty ? "hidden" : "flex-grow mt-3"}>
            <label htmlFor="Cover" className={styles.formLabel}>
              Cover Type:
            </label>
            <Select
              id="Cover"
              name="Cover"
              className={`${styles.formElem} dark:bg-gray-800`}
              value={formData.coverType}
              onChange={handleChange}
              options={coverOptions}
              required={false}
            />
          </div>

          <div className={viewLess ? "hidden" : "flex-grow mt-3"}>
            <label htmlFor="numOfDays" className={styles.formLabel}>
              Number of days:
            </label>
            <input
              type="number"
              id="numOfDays"
              name="numOfDays"
              value={formData.numOfDays}
              onChange={handleChange}
              placeholder="Enter number of days"
               className={`${styles.formElem} dark:bg-gray-800`}
              required
            />
          </div>

          <div className={viewLess ? "hidden" : "flex-grow mt-3"}>
            <label htmlFor="seats" className={styles.formLabel}>
              Number of seats:
            </label>
            <input
              type="number"
              id="seats"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              placeholder="Enter number of seats"
               className={`${styles.formElem} dark:bg-gray-800`}
              required
            />
          </div>

          <div
            className={
              thirdParty || hideCurrencies ? "hidden" : "flex-grow mt-3"
            }
          >
            <label htmlFor="currencySign" className={styles.formLabel}>
              Currency Sign:
              <span className="text-danger">*</span>
            </label>
            <Select
              id="currencySign"
              name="currencySign"
              value={formData.currencySign}
              onChange={handleChange}
              className={`${styles.formElem} dark:bg-gray-800`}
              options={currencySigns}
              required={true}
            />
          </div>

          <div
            className={
              thirdParty || hideCurrencies ? "hidden" : "flex-grow mt-3"
            }
          >
            <label htmlFor="exchangeRateValue" className={styles.formLabel}>
              Currency Rate:
              <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              id="exchangeRateValue"
              name="exchangeRateValue"
              onChange={handleChange}
              disabled={formData.currencySign === "GH¢" ? true : false}
              value={formData.exchangeRateValue}
               className={`${styles.formElem} dark:bg-gray-800`}
              placeholder="Exchange Rate"
            />
          </div>

          <div className={thirdParty ? "hidden" : "flex-grow mt-3"}>
            <label htmlFor="vehicleValue" className={styles.formLabel}>
              Vehicle Value:
            </label>
            <input
              type="number"
              id="vehicleValue"
              name="vehicleValue"
              onChange={handleChange}
              disabled={thirdParty}
              value={formData.vehicleValue}
               className={`${styles.formElem} dark:bg-gray-800`}
              placeholder="Vehicle Value"
              required={thirdParty ? false : true}
              ref={valueRef}
            />
          </div>

          <div className={viewLess ? "hidden" : "flex-grow mt-3"}>
            <div className="col-12 col-sm-12">
              <label htmlFor="tppd" className={styles.formLabel}>
                TPPD Limit{" "}
                <span className="text-danger">{formData.currencySign}</span>:
              </label>
              <input
                type="number"
                id="tppd"
                name="tppd"
                onChange={handleChange}
                value={formData.tppd}
                 className={`${styles.formElem} dark:bg-gray-800`}
                placeholder="Above ¢6000 only"
              />
            </div>
          </div>

          <div
            className={
              thirdParty || hideDiscounts ? "hidden" : "flex-grow mt-3"
            }
          >
            <label htmlFor="ncd" className={styles.formLabel}>
              No Claim Discount:
            </label>
            <Select
              id="ncd"
              name="ncd"
              value={formData.ncd}
              onChange={handleChange}
              className={`${styles.formElem} dark:bg-gray-800`}
              options={ncdOptions}
              required={false}
            />
          </div>

          <div className={hideDiscounts ? "hidden" : "flex-grow mt-3"}>
            <label htmlFor="fleet" className={styles.formLabel}>
              Fleet Discount:
            </label>
            <Select
              id="fleet"
              name="fleet"
              value={formData.fleet}
              onChange={handleChange}
              className={`${styles.formElem} dark:bg-gray-800`}
              options={fleetOptions}
              required={false}
            />
          </div>

          
        </div>
        <div className="mt-4 flex gap-1">
            <button
              type="reset"
              onClick={handleReset}
              className="p-2 w-full rounded-2xl border border-ig-pink hover:bg-ig-pink"
            >
              Reset
            </button>
            <button type="submit" className="p-2 w-full rounded-2xl border border-ig-pink bg-ig-pink hover:bg-ig-pink-100">
              Calculate
            </button>
          </div>
      </form>
    </div>
  );
}
