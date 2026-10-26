'use client'
import Title from './Title';
import AddBtn from './AddBtn';
import { SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

type Props = {
    title: string,
    description: string,
    handleClick: () => void
}

function Header({ title, description, handleClick }: Props) {
    const { isSignedIn } = useUser();
    return (
        <div className="flex w-full flex-col gap-3 px-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <Title
                    title={title}
                    description={description}
                />
            </div>
            <div className='hidden md:flex'>
                {isSignedIn ?
                    <div className='flex flex-row gap-2 justify-center'>
                        <AddBtn handleClick={handleClick} />
                        <div className='hidden md:block'><UserButton showName />
                        </div>
                    </div>
                    :
                    <SignUpButton mode='modal'>
                        <Button className={'w-32 text-xl cursor-pointer h-12'} variant={'default'} >SignUp</Button>
                    </SignUpButton>}
            </div>

        </div>
    )
}

export default Header
