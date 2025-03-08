import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlobalButton } from "../Elements";

const DownLoadAppModal: React.FC<{}> = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const handleModalDownloadAppClose = () => {
    setModalOpen(false);
    console.log("Modal Close");
  };

  return (
    <>
      {modalOpen ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[99]
                 bg-primary bg-opacity-75 h-screen w-screen top-0 left-0"
          >
            <div
              className="relative mx-2 transform overflow-hidden rounded-[20px] p-[15px] lg:p-[35px]
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[1200px]"
            >
              <Image
                src="/images/icons/modal-close-icon.png"
                width="14"
                height="14"
                alt="Close"
                className="ml-auto cursor-pointer absolute right-4 top-4"
                onClick={handleModalDownloadAppClose}
              />
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="container">
                  <div className="grid grid-cols-1 mb-6">
                    <div>
                      <h1
                        className="text-primary font-SparkDigitalLight md:text-center text-[20px] md:text-[30px] 
                                    leading-[22px] md:leading-[44px]"
                      >
                        Download our app
                      </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div
                      className="col-span-2 
                                bg-devices-bg-linear-gradient lg:bg-xlLightGrey
                                lg:bg-device-cards-bg-linear-gradient rounded-[20px] p-[35px]"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3">
                        <div className="col-span-2 hidden lg:block">
                          <h2
                            className="text-primary font-SparkDigitalLight  text-[20px] md:text-[30px] 
                                    leading-[22px] md:leading-[44px]"
                          >
                            Made of solutions, anywhere, anytime.
                          </h2>
                          <p className="text-[16px] mt-3 font-SparkDigitalLight leading-[24px] mb-4">
                            Our app offers everything you need from the SparkDigital
                            ecosystem so you can easily manage, upgrade and
                            scale with our wide range of solutions. Download the
                            SparkDigital App for fast, easy mobile access
                          </p>
                          <Image
                            src="/images/icons/my-SparkDigital.png"
                            width="79"
                            height="80"
                            alt="My SparkDigital"
                            className="mr-auto"
                          />
                        </div>
                        <div>
                          <Image
                            src="/images/app-download.png"
                            width="124"
                            height="269"
                            alt="My SparkDigital"
                            className="mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[16px] lg:text-[20px] mb-5 leading-[21px] lg:leading-[32px] font-SparkDigitalLight font-[700]">
                        You can do the following on the App
                      </h3>
                      <ul className="list-none">
                        <li className="text-[16px] mb-2 mt-1 font-SparkDigitalLight font-[400] leading-[22px]">
                          -View and pay your accounts
                        </li>

                        <li className="text-[16px] leading-[22px] mb-2 mt-1 font-SparkDigitalLight font-[400] ">
                          -View your data and airtime balances
                        </li>

                        <li className="text-[16px] leading-[22px] mb-2 mt-1 font-SparkDigitalLight font-[400] ">
                          -Top up and buy airtime and data
                        </li>

                        <li className="text-[16px] leading-[22px] mb-2 mt-1 font-SparkDigitalLight font-[400] ">
                          -Log and track orders and faults
                        </li>

                        <li className="text-[16px] leading-[22px] mb-2 mt-1 font-SparkDigitalLight font-[400] ">
                          -Manage your subscriptions
                        </li>

                        <li className="text-[16px] leading-[22px] mb-2 mt-1 font-SparkDigitalLight font-[400] ">
                          -Change your spend limit
                        </li>
                      </ul>
                      <div className="grid grid-cols-3 justify-center lg:hidden gap-2">
                        <div>
                          <Link href="/">
                            <Image
                              src="/images/icons/app-store.png"
                              width="135"
                              alt="App Store"
                              height="45"
                              className="mx-auto"
                            />
                          </Link>
                        </div>
                        <div>
                          <Link href="/">
                            <Image
                              src="/images/icons/play-store.png"
                              width="135"
                              alt="App Store"
                              height="45"
                              className="mx-auto"
                            />
                          </Link>
                        </div>
                        <div>
                          <Link href="/">
                            <Image
                              src="/images/icons/app-gallery.png"
                              width="135"
                              alt="App Store"
                              height="45"
                              className="mx-auto"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 mt-6 gap-4">
                        <div>
                          <GlobalButton
                            label="Close"
                            color="white"
                            backgroundColor="SparkDigitalPink"
                            borderColor=""
                            onClick={handleModalDownloadAppClose}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default DownLoadAppModal;
