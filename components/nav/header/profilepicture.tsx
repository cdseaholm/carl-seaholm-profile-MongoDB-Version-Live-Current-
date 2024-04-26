import Image from 'next/image'

export default function ProfilePicture({isHovered, setIsHovered, imageRef, imageClick, clicked, style}: {isHovered: boolean, setIsHovered: any, imageRef: any, imageClick: any, clicked: boolean, style: any}) {
    return (
        <div ref={imageRef} className={`mt-3 ml-5 ${clicked ? style.profilepicture.large : style.profilepicture.small}`}>
          <Image
            onClick={imageClick}
            priority
            src="/images/carlseaholmimage.jpg"
            className={`z-30 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`}
            height={clicked ? 200 : 60}
            width={clicked ? 200 : 60}
            alt="Carl Seaholm Profile Photo"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
    ) 
}