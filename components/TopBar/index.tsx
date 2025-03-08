import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopBar: React.FC<{}> = () => {

    return(
        <div className="bg-white items-center flex shadow-[0px 2px 10px rgba(1, 39, 47, 0.05)] py-[20px] lg:py-[30px]">
            <div className="container mx-auto px-10">
                <div className="grid grid-cols-2 gap-4">
                    <div> SparkDigital
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default TopBar;