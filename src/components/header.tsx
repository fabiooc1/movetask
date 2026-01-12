import { UserItemModel } from "@/models/user-item-model";
import { ModeToggle } from "./mode-toggle";
import { NotificationButton } from "./notification-button";
import { UserDropdown } from "./user-dropdown";

interface HeaderProps {
  user: UserItemModel;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex py-6 px-12 justify-between bottom-1">
      <div>
        <h1 className="font-extrabold text-3xl text-green-500">Movetask</h1>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <NotificationButton />
        <UserDropdown user={user} />
      </div>
    </header>
  );
}
