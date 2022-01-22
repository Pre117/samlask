import '../iconfont/NavButtonIcon.css'

const NavButton = (props: { text: string; icon: string; onClick: () => void }) => {
    const { text, icon, onClick } = props

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center" onClick={onClick}>
                <div className={`iconfont ${icon}`}></div>
                <div className="text-xs">{text}</div>
            </div>
        </div>
    )
}

export default NavButton
