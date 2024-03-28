const MobileInnerHeader = ({name, styles, children}: {name: string; styles: string[]; children: React.ReactNode;}) => {

        const style = styles.length === 0 || styles === undefined ? ["px-2 pt-2 pb-6", "flex flex-col justify-start w-full", "flex flex-row justify-start items-center text-6xl text-neutral-900 pb-3", "underline text-4xl", 'flex flex-row items-center w-4/12', 'flex pr-2'] : styles;
        
        return (
            <div className={style[0]}>
                <div className={style[1]}>
                    <header className={style[2]}>
                        <h1 className={style[3]}>{name}</h1>
                    </header>
                    <div className={style[4]}>
                        <p className={style[5]}>
                        Filter:
                        </p>
                        {children}
                    </div>
                </div>
            </div>
        );
    };

export default MobileInnerHeader;
