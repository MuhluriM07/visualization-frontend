import React from "react";
import { TopBar, Footer } from "./";

type Props = {
  children?: any;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <TopBar />
        <div className="min-h-screen">
        {children}
        </div>
      <Footer />
    </>
  );
};
export default Layout;
