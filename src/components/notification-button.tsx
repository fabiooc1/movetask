import { BellIcon } from "lucide-react";
import { Button } from "./ui/button";

export function NotificationButton() {
  return (
    <Button variant="ghost" size="icon" disabled={true}>
      <BellIcon />
    </Button>
  );
}
