import UserDetails from "../components/forms/UserDetails"
import ErrorAlert from "../components/alerts/ErrorAlert";
import { Transition } from "@headlessui/react";
import SuccessModal from "../components/alerts/SuccessModal";
import React from "react";

const VerificationPage = () => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <UserDetails/>
        </div>
    )
}

export default VerificationPage;