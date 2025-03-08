import React from "react";

type CardWrapperProps = {

    children?: any
    backgroudColor?: any
    borderRadius?: any
    lgPadding?: any
    smPadding?: any

}

const CardWrapper: React.FC<CardWrapperProps> = ({
    backgroudColor,
    borderRadius,
    lgPadding,
    children,
    smPadding

}) => {

    return(
        <div className={` bg-${backgroudColor} p-[${smPadding}] md:p-[${lgPadding}]  rounded-[${borderRadius}]`}>
            {children}
        </div>
    )
}

export default CardWrapper;