import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

function SearchBar() {

    return (
        <div className=" ">
            <form className="max-w-sm px-4 ml-20 relative inline-block text-left">
                <div className="">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-4 h-4 my-auto text-gray-400 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ marginLeft: "360px", color: "#05445E" }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        style={{
                            height: "40px",
                            fontSize: "px",
                            width: "400px",
                            boxShadow: "1px 2px 2px #0000003D",
                            color: "#05445E",
                        }}
                        type="text"
                        placeholder="Search Users... "
                        className="w-full pl-3  text-gray-500 border rounded-lg outline-none bg-gray-50 focus:bg-white "

                    />
                </div>
            </form>

        </div>
    );
}

export default SearchBar;
