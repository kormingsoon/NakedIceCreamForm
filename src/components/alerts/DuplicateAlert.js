import {XCircleIcon, XMarkIcon} from '@heroicons/react/24/solid'
import Popup from "reactjs-popup";
import { VscChromeClose } from "react-icons/vsc";
import React from "react";

const DuplicateAlert = ({open, setOpen}) => {
    return (
        <div>
            <Popup open={open} modal closeOnDocumentClick={true} lockScroll={true}>
                <div className="rounded-lg mr-20 ml-20 bg-red-50 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-10 w-10 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-xl text-left mt-1 font-semibold text-red-800">Duplicated Entry!</h3>
                            <div className="text-left mt-2">
                                <p className="text-md text-red-800">Sorry, each participant can only participate in this discount once.</p>
                            </div>
                        </div>
                        <div className="ml-auto pl-3">
                            <div className="-mx-1.5 -my-1.5">
                                <button
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    type="button"
                                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <VscChromeClose />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default DuplicateAlert;