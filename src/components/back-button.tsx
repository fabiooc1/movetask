"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  callbackUrl?: string;
}

export function BackButton({ callbackUrl }: BackButtonProps) {
  const router = useRouter();

  function handleOnClick() {
    if (callbackUrl) {
      router.push(callbackUrl);
      return;
    }
  }

  return (
    <Button size="icon" variant="link" onClick={handleOnClick}>
      <ArrowLeftIcon />
    </Button>
  );
}
