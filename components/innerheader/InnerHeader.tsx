const InnerHeader = ({name, styles, children}: {name: string; styles: string[]; children: React.ReactNode;}) => {

    const style = styles.length === 0 || styles === undefined ? ["flex flex-row justify-start w-full pb-5", "flex flex-row justify-start items-center text-6xl text-neutral-900 px-5", "underline text-4xl", 'flex flex-row items-center w-4/12', 'flex pr-2'] : styles;

    return (
        <div className={style[0]}>
                <header className={style[1]}>
                    <h1 className={style[2]}>{name}</h1>
                </header>
                <div className={style[3]}>
                    <p className={style[4]}>
                    Filter:
                    </p>
                    {children}
                </div>
            </div>
    );
};

export default InnerHeader;