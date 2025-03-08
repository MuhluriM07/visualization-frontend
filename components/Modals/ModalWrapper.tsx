
import Image from "next/image";
import React from "react";

interface Props {
    children?: any
    onClick: () => void; 
  }
  
  const ModalWrapper: React.FC<Props> = ({ children, onClick }: Props) => {
    return(
      <>
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[99] bg-primary bg-opacity-75 h-screen w-screen top-0 left-0">
        <div className="relative w-auto my-6 mx-auto max-w-[800px]">
           <div className="border-0 rounded-[20px] p-[35px] relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="">
                <Image 
                  src="/images/icons/modal-close-icon.png"
                  width="14"
                  height="14"
                  alt="Close"
                  className="ml-auto cursor-pointer"
                  onClick={onClick}
                />
            </div>
             {children}
        </div>
        </div>
    </div>
    </>
    )
  } 
  
  export default ModalWrapper