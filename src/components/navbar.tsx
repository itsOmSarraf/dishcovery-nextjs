import Image from "next/image"
import Logo from "@/public/icons/icon.png"
import { APP_NAME } from '@/lib/constants'
import Link from "next/link"
export default function NavBar() {
    return (
        <>
            <Link href='/'>
                <div className="flex items-center p-2">
                    <Image src={Logo} alt={APP_NAME} className='size-12' />
                    <p className="ml-2 text-xl font-semibold">{APP_NAME}</p>
                </div>
            </Link>
        </>
    )
}