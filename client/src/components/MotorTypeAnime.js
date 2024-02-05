import { TypeAnimation } from "react-type-animation";

export default function MotorTypeAnime() {
  return (
    <span className="">
        <h1 className="text-6xl tracking-tighter font-black text-ig-blue dark:text-white ">Need Numbers?</h1>
            <h3 className="mt-4 text-lg">
              Calculate Premium in less than 4 clicks
            </h3>
            <TypeAnimation className="text-2xl font-bold"
              sequence={[
             
                "1. Select Policy Type",
                1000,
                "2. Select Vehicle Usage",
                1000,
                "3. Calculate",
                1000,
                " ",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
        <div className="mt-8 p-4">
        <h2>
            <b>Comprehensive</b>
        </h2>
        <p>Comprehensive premium requires you to input the value of your vehicle. There may be conditions such as extra third party property damage</p>
        </div>
       </span>
  )
}
