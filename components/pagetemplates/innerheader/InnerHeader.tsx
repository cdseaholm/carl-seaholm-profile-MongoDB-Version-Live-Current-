import React from "react";

const InnerHeader = ({children}: {children: React.ReactNode;}) => {

    const lengthOfChildren = React.Children.count(children);

    return (
        <div className={`flex flex-row ${lengthOfChildren > 1 ? 'justify-between' : 'justify-center'} items-center w-full p-1`}>
            {children}
        </div>
    );
};

export default InnerHeader;