import Image from "next/legacy/image"

export default function ImageFormat({imSize, image, index, blur, priority}: {imSize: number, image: string, index: number, blur: boolean, priority: boolean}) {
    return (
        <Image src={image} alt={`Logo Version ${index}`} width={imSize} height={imSize} className='rounded-full' placeholder={blur ? 'blur' : 'empty'} blurDataURL={image} priority={priority}/>
    )
}