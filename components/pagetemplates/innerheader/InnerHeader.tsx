import React from "react";

const InnerHeader = ({children}: {children: React.ReactNode;}) => {

    const lengthOfChildren = React.Children.count(children);

    return (
        <div className={`flex flex-row ${lengthOfChildren > 1 ? 'justify-between' : 'justify-center'} items-center w-full p-2 pb-5`} style={{maxHeight: '8vh', minHeight: '8vh'}}>
            {children}
        </div>
    );
};

export default InnerHeader;