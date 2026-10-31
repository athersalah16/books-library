
'use client';

import { SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

import Title from './Title';
import AddBtn from './AddBtn';

type Props = {
  title: string;
  description: string;
  handleClick?: () => void;
};

function Header({ title, description, handleClick }: Props) {
  const { isSignedIn } = useUser();

  return (
    <div className="flex w-full flex-col gap-3 px-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Title title={title} description={description} />
      </div>

      <div>
        {isSignedIn ? (
          <div className="flex  px-1 lg:flex-row lg:justify-center gap-2">
            <AddBtn />

            <div className="hidden md:block">
              <UserButton showName />
            </div>
          </div>
        ) : (
          <SignUpButton mode="modal">
            <Button
              className="h-12 w-32 cursor-pointer text-xl"
              variant="default"
            >
              SignUp
            </Button>
          </SignUpButton>
        )}
      </div>
    </div>
  );
}

export default Header;
