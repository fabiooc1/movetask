"use client";

interface TaskBoardDotProps {
  color: string;
}

export function TaskBoardDot({ color }: TaskBoardDotProps) {
  return (
    <div className="size-2 rounded-full" style={{ backgroundColor: color }} />
  );
}
