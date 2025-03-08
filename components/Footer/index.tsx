import Image from "next/image";
import Link from "next/link";
import React from "react";

const topMenu = [
    {
        label: "Chat to us online",
        url: "/",
        iconSrc: "/images/icons/chat-icon.png"
    }  
];

 
const Footer: React.FC<{}> = () => {

    return(
        <>
            <div className="bg-primary bg-footer-top-radial-gradient py-5 mt-10">
                <div className="container mx-auto px-10">
                    <div className="grid grid-cols-1 gap-4 mt-8 text-white">
                         
                    </div>
                </div>
            </div> 
        </>
    )
}

export default Footer;