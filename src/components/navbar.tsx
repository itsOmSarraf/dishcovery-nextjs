import Image from "next/image"
import Logo from "@/public/icons/icon.png"
import { APP_NAME } from '@/lib/constants'
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { auth } from "@/auth"
import SignIn from "./auth/signin"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { SignOut } from "./auth/signout"

export default async function NavBar() {
    const session = await auth()
    return (
        <div className="fixed left-0 right-0 top-0 flex justify-between items-center px-2">
            <Link href='/'>
                <div className="flex items-center p-2">
                    <Image src={Logo} alt={APP_NAME} className='size-12' />
                    <p className="ml-2 text-xl font-semibold">{APP_NAME}</p>
                </div>
            </Link>

            {!session?.user?.image ? (
                <SignIn />
            ) : (
                <Menubar className="border-0">
                    <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer focus:bg-transparent data-[state=open]:bg-transparent">
                            <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                                <Avatar>
                                    <AvatarImage
                                        src={session?.user?.image!}
                                        alt={session?.user?.name!}
                                    />
                                    <AvatarFallback >
                                        {session?.user?.name![0]}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </MenubarTrigger>
                        <MenubarContent className="min-w-[200px] mr-8 -mt-2">
                            <Link href="/me">
                                <MenubarItem className="cursor-pointer">
                                    Profile
                                </MenubarItem>
                            </Link>
                            <MenubarSeparator />
                            <MenubarItem className="cursor-pointer">
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem className="cursor-pointer">
                                New Window
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem className="cursor-pointer">
                                Share
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem className="cursor-pointer">
                                <div className="w-full">
                                    <SignOut />
                                </div>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            )}
        </div>
    )
}
