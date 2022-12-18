import ErrorAlert from "../alerts/ErrorAlert";
import DuplicateAlert from "../alerts/DuplicateAlert";
import SuccessModal from "../alerts/SuccessModal";
import Spinner from "../alerts/Spinner";
import countries_code from "../../data/data";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, CSSProperties } from "react";

const UserDetailsForm = () => {

    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    const ReadMore = ({ children }) => {
        const text = children;
        return (
            <p className="mt-8 text-md text-left ml-6 mr-2">
                {isReadMore ? text.slice(0, 498) : text}
                <span onClick={toggleReadMore} className="read-or-hide">
                    {isReadMore ? "...read more" : " show less"}
                </span>
            </p>
        );
    };
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("65");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isError, setIsError] = useState(false);
    const [open, setOpen] = useState(false);
    const [isDuplicate, setDuplicate] = useState(false);
    const [q1_p1, setQ1_p1] = useState("");
    const [q1_p2, setQ1_p2] = useState("");
    const [q1_p3, setQ1_p3] = useState("");

    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");

    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");


    const handlePriority1 = (event) => {
        setQ1_p1(event.target.value);
        if (q1_p2 === event.target.value) {
            setQ1_p2("");
        }

        if (q1_p3 === event.target.value) {
            setQ1_p3("");
        }
    }

    const handlePriority2 = (event) => {
        setQ1_p2(event.target.value);
        if (q1_p1 === event.target.value) {
            setQ1_p1("");
        }

        if (q1_p3 === event.target.value) {
            setQ1_p3("");
        }
    }

    const handlePriority3 = (event) => {
        setQ1_p3(event.target.value);
        if (q1_p2 === event.target.value) {
            setQ1_p2("");
        }

        if (q1_p1 === event.target.value) {
            setQ1_p1("");
        }
    }

    const handleQ2 = (event) => {
        setQ2(event.target.value);
    }

    const handleQ3 = (event) => {
        setQ3(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }

    const handleVerification = async (event) => {
        event.preventDefault();

        if (firstName === "" || lastName === "" || country === "" || phoneNumber === "" || age === "" || q1_p1 === "" || q1_p2 === "" || q1_p3 === "" || q2 === "") {
            // Error Default
            setOpen(true);
            setIsError(true);
        } else {
            const personInfo = {
                name: firstName + " " + lastName,
                phoneNum: "+" + country + phoneNumber,
                age: age,
                first: q1_p1,
                second: q1_p2,
                third: q1_p3,
                goal: q2
            }

            // Back-end call
            fetch('http://localhost:8080/api/sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(personInfo)
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setFirstName("");
                    setLastName("");
                    setAge("");
                    setPhoneNumber("");
                    setCountry("65");
                    setQ1_p1("");
                    setQ1_p2("");
                    setQ1_p3("");
                    setQ2("");
                    setQ3("");
                    setIsReadMore(false);
                    switch (data.response) {
                        case "valid":
                            setOpen(true);
                            setIsError(false);
                            break;
                        case "duplicate":
                            setOpen(true);
                            setIsError(true);
                            setDuplicate(true);
                            break;
                        default:
                            // Error Default
                            setOpen(true);
                            setIsError(true);
                    }
                });
        }
    };

    if (loading) {
      return (
        <Spinner/>
      )
    }

    return (
        <div>
            <form onSubmit={handleVerification} className="relative max-w-2xl h-fit m-20 scroll-smooth shadow-xl rounded-lg bg-white" action="#" method="POST">
                <div className="max-w-2xl justify-center sm:rounded-lg">
                    <div className="space-y-6 py-6 px-4 sm:p-6">
                        <div className="md:col-span-1 text-left p-2 block">
                            <h2 className="font-semibold text-2xl text-gray-900 mb-2">Welcome to Naked Ice Cream! </h2>
                            <h3 className="font-semibold text-xl text-gray-900">Complete this survey and get $2 off when you spend a min. $10 in store. </h3>
                            <p className="mt-2 text-lg text-gray-500">Please key in your information below and you will a receive an SMS which you can use to redeem the discount.</p>
                        </div>
                        <div>
                            <div className=" block col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm text-left font-medium text-gray-700">
                                    First name
                                </label>
                                <input
                                    onChange={handleFirstNameChange}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    value={firstName}
                                    required
                                    className="mt-1 block w-full mb-3 bg-gray-200 rounded-md border border-gray-300 py-3 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm text-left font-medium text-gray-700">
                                    Last name
                                </label>
                                <input
                                    onChange={handleLastNameChange}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    value={lastName}
                                    autoComplete="given-last-name"
                                    required
                                    className="mt-1 block w-full mb-3 bg-gray-200 rounded-md border border-gray-300 py-3 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="age-range" className="block text-sm text-left font-medium text-gray-700">
                                    Age
                                </label>
                                <fieldset onChange={handleAgeChange} aria-required={true} className="mt-4 mb-6">
                                    <div className="space-y-5">
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    aria-required={true}
                                                    checked={age === "1 - 18"}
                                                    value="1 - 18"
                                                    id="20"
                                                    name="age"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="Take it slow" className="font-medium text-gray-700">
                                                    1 - 18
                                                </label>
                                            </div>
                                        </div>
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    aria-required={true}
                                                    checked={age === "19 - 24"}
                                                    value="19 - 24"
                                                    id="21"
                                                    name="age"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="Take it slow" className="font-medium text-gray-700">
                                                    19 - 24
                                                </label>
                                            </div>
                                        </div>
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    aria-required={true}
                                                    checked={age === "25 - 30"}
                                                    value="25 - 30"
                                                    id="22"
                                                    name="age"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="25 - 30" className="font-medium text-gray-700">
                                                    25 - 30
                                                </label>
                                            </div>
                                        </div>
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    aria-required={true}
                                                    checked={age === "31 - 40"}
                                                    value="31 - 40"
                                                    id="24"
                                                    name="age"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="31 - 40" className="font-medium text-gray-700">
                                                    31 - 40
                                                </label>
                                            </div>
                                        </div>
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    aria-required={true}
                                                    checked={age === "41 - 50"}
                                                    value="41 - 50"
                                                    id="25"
                                                    name="age"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="41 - 50" className="font-medium text-gray-700">
                                                    41 - 50
                                                </label>
                                            </div>
                                        </div>
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    aria-required={true}
                                                    checked={age === "51 - 54"}
                                                    value="51 - 54"
                                                    id="26"
                                                    name="age"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="51 - 54" className="font-medium text-gray-700">
                                                    51 - 54
                                                </label>
                                            </div>
                                        </div>
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    aria-required={true}
                                                    checked={age === "55 - 64"}
                                                    value="55 - 64"
                                                    id="27"
                                                    name="age"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="55 - 64" className="font-medium text-gray-700">
                                                    55 - 64
                                                </label>
                                            </div>
                                        </div>
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                    aria-required={true}
                                                    checked={age === "65 and above"}
                                                    value="65 and above"
                                                    id="28"
                                                    name="age"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="65 and above" className="font-medium text-gray-700">
                                                    65 and above
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="phone-number" className="block text-sm text-left font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className=" flex justify-center relative mt-1 rounded-md">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <label htmlFor="country" className="sr-only">
                                            Country
                                        </label>
                                        <select
                                            onChange={handleCountryChange}
                                            value={country}
                                            required
                                            id="country"
                                            name="country"
                                            autoComplete="country"
                                            className="h-full rounded-md mb-2 border-transparent bg-transparent py-0 pl-2 pr-1 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {countries_code.map(code => (
                                                <option value={code}>+{code}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <input
                                        onChange={handlePhoneNumberChange}
                                        type="number"
                                        name="phone-number"
                                        id="phone-number"
                                        value={phoneNumber}
                                        required
                                        className="mt-1 block w-full mb-3 bg-gray-200 rounded-md border pl-20 border-gray-300 py-3 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="1234 5678"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-2 text-sm text-gray-500">Understanding your interests</span>
                        </div>
                    </div>
                    <div className="mr-4 ml-4 mt-4 text-left"> 
                        Thank you participating in this survey in
                        collaboration with Naked Ice Cream! This survey
                        is done by Justin Chan & Associates, an agency
                        unit of Prudential Assurance Company Singapore
                        (Pte) Ltd Reg. No. 199002477Z
                    </div>
                    <p className="mt-8 mb-4 font-semibold text-md text-left ml-6 mr-2">
                        Which among the following is your biggest concern at the moment? (1 - Highest Priority, 3 - Least Priority)
                    </p>
                    <div className="grid block ml-6 mr-6 grid-rows-4 gap-1">
                        <div className="row-span-1 mb-2">
                            <div className="grid grid-cols-4 items-center">
                                <div className="col-start-2 text-sm">Rising cost of living</div>
                                <div className="col-start-3 text-sm">Safety net for family</div>
                                <div className="col-start-4 text-sm">Achieve financial freedom</div>
                            </div>
                        </div>
                        <div className="row-span-1 h-10 bg-gray-100">
                            <fieldset onChange={handlePriority1} aria-required={true} className="grid grid-cols-4 justify-items-center mt-2 items-center">
                                <div className="col-start-1 text-sm text-left">1st Priority</div>
                                <input
                                    aria-required={true}
                                    checked={q1_p1 === "Rising cost of living"}
                                    key="Rising cost of living"
                                    value="Rising cost of living"
                                    id="1"
                                    name="second-priority"
                                    type="radio"
                                    className={`h-4 col-start-2 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                                <input
                                    aria-required={true}
                                    checked={q1_p1 === "Safety net for family"}
                                    key="Safety net for family"
                                    value="Safety net for family"
                                    id="2"
                                    name="second-priority"
                                    type="radio"
                                    className={`h-4 col-start-3 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                                <input
                                    aria-required={true}
                                    checked={q1_p1 === "Achieve financial freedom"}
                                    key="Achieve financial freedom"
                                    value="Achieve financial freedom"
                                    id="3"
                                    name="second-priority"
                                    type="radio"
                                    className={`h-4 col-start-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                            </fieldset>
                        </div>
                        <div className="row-span-1 h-10 bg-gray-100">
                            <fieldset onChange={handlePriority2} aria-required={true} className="grid grid-cols-4 justify-items-center mt-2 items-center">
                                <div className="col-start-1 text-sm text-left">2nd Priority</div>
                                <input
                                    aria-required={true}
                                    checked={q1_p2 === "Rising cost of living"}
                                    key="Rising cost of living"
                                    value="Rising cost of living"
                                    id="4"
                                    name="1-2"
                                    type="radio"
                                    className={`h-4 col-start-2 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                                <input
                                    aria-required={true}
                                    checked={q1_p2 === "Safety net for family"}
                                    key="Safety net for family"
                                    value="Safety net for family"
                                    id="5"
                                    name="2-2"
                                    type="radio"
                                    className={`h-4 col-start-3 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                                <input
                                    aria-required={true}
                                    checked={q1_p2 === "Achieve financial freedom"}
                                    key="Achieve financial freedom"
                                    value="Achieve financial freedom"
                                    id="6"
                                    name="2-3"
                                    type="radio"
                                    className={`h-4 col-start-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                            </fieldset>
                        </div>
                        <div className="row-span-1 h-10 bg-gray-100">
                            <fieldset onChange={handlePriority3} aria-required={true} className="grid grid-cols-4 justify-items-center mt-2 items-center mb-10">
                                <div className="col-start-1 text-sm text-left">Last Priority</div>
                                <input
                                    aria-required={true}
                                    checked={q1_p3 === "Rising cost of living"}
                                    key="Rising cost of living"
                                    value="Rising cost of living"
                                    id="7"
                                    name="1-3"
                                    type="radio"
                                    className={`h-4 col-start-2 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                                <input
                                    aria-required={true}
                                    checked={q1_p3 === "Safety net for family"}
                                    key="Safety net for family"
                                    value="Safety net for family"
                                    id="8"
                                    name="2-3"
                                    type="radio"
                                    className={`h-4 col-start-3 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                                <input
                                    aria-required={true}
                                    checked={q1_p3 === "Achieve financial freedom"}
                                    key="Achieve financial freedom"
                                    value="Achieve financial freedom"
                                    id="9"
                                    name="3-3"
                                    type="radio"
                                    className={`h-4 col-start-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500`}
                                />
                            </fieldset>
                        </div>
                    </div>
                    <p className="mt-8 font-semibold text-md text-left ml-6 mr-2">
                        Towards your goals, which describe you best?
                    </p>
                    <fieldset className="ml-6 mt-4 mb-10">
                        <div className="space-y-5">
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        aria-required={true}
                                        onChange={handleQ2}
                                        checked={q2 === "Take it slow"}
                                        value="Take it slow"
                                        id="10"
                                        name="plan"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="Take it slow" className="font-medium text-gray-700">
                                        Take it slow
                                    </label>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        aria-required={true}
                                        onChange={handleQ2}
                                        checked={q2 === "Fast and furious"}
                                        value="Fast and furious"
                                        id="11"
                                        name="plan"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="Take it slow" className="font-medium text-gray-700">
                                        Fast and furious
                                    </label>
                                </div>
                            </div>
                            <div className="relative flex items-start">
                                <div className="flex h-5 items-center">
                                    <input
                                        aria-required={true}
                                        onChange={handleQ2}
                                        checked={q2 === "Consistency is key"}
                                        value="Consistency is key"
                                        id="12"
                                        name="plan"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="Take it slow" className="font-medium text-gray-700">
                                        Consistency is key
                                    </label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-2 text-sm text-gray-500">Privacy Agreement</span>
                        </div>
                    </div>
                    <div>
                        <ReadMore>
                            By clicking the Submit button below, I confirm that I have read, understood and given my consent for Prudential Assurance Company Singapore and its related corporations, respective representatives, agents, third party service providers, contractors and/or appointed distribution/business partners (collectively referred to as “Prudential and its authorised representatives”) to collect, use, disclose and/or process my/our personal data for the purpose of contacting me about products
                            and services distributed, marketed and/or introduced by Prudential through marketing activities via all channels including but not limited to SMS, Social Media, In-app Push Notification, Phone Call etc and perusing my contact details which Prudential and its authorised representatives has in its records from time to time and in accordance to the Prudential Data Privacy Notice, which is available at https://www.prudential.com.sg/Privacy-Notice.
                            I hereby expressly understand and agree that my given consent(s) herein do not supersede or replace any other consents and/or previous consents which I may have previously given to Prudential in respect of my personal data and is without prejudice to any legal rights available to Prudential to collect, use or disclose my personal data.
                            I understand that I can refer to Prudential Data Privacy, which is available at https://www.prudential.com.sg/Privacy-Notice for more information.
                            I may contact Justin Chan, a representative of PACS at justinchankk@pruadviser.com.sg on how I may access and correct my personal data or withdraw consent to the collection, use or disclosure of my personal data.
                        </ReadMore>
                    </div>
                    <button type="submit" className="bg-indigo-500 py-2 px-3 rounded-md shadow-lg text-white font-medium shadow-indigo-500/50 m-7">
                        Submit
                    </button>
                </div>
            </form>
            {
                open 
                ? (isError 
                    ? (isDuplicate 
                        ? <DuplicateAlert open={open} setOpen={setOpen}/>
                        : <ErrorAlert open={open} setOpen={setOpen}/>)
                    : <SuccessModal open={open} setOpen={setOpen}/>)
                : undefined
            }
        </div>
    )
};

export default UserDetailsForm;