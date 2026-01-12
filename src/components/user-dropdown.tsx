"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { Button } from "./ui/button";
import { UserItemModel } from "@/models/user-item-model";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserDropdownProps {
  user: UserItemModel;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const splitedName = user.name.split(" ");
  const initialLetters = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const userName = splitedName.slice(0, 2).join(" ");

  async function handleSignOut() {
    setIsSigningOut(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/authentication?tab=login");
        },
        onError: () => {
          toast.error("Não foi possível sair da conta. Tente novamente.");
        },
      },
    });

    setIsSigningOut(false);
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-auto px-2 py-1.5 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initialLetters}</AvatarFallback>
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
          </Avatar>

          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium leading-none">{userName}</span>
          </div>

          {isOpen ? (
            <ChevronUpIcon className="ml-2 h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <div className="flex flex-col space-y-2 p-2">
          <p className="text-sm font-medium leading-none">{userName}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user.email}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" disabled={true}>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Meu perfil</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOutIcon className="mr-2 h-4 w-4" />
          )}
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
