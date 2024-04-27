const ScrollChild = ({children}: {children: React.ReactNode}) => {
    return (
        <div style={{ overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}}>
            {children}
        </div>
    )
}

export default ScrollChild;