"use client";

import { useGetUsers } from "@/hooks/use-get-users";
import MultipleSelector, { type Option } from "./ui/multiselect";
import { useState } from "react";
import { UserItemModel } from "@/models/user-item-model";
import { Loader2 } from "lucide-react";

interface MemberSelectProps {
  value?: string[];
  onChange?: (values: string[]) => void;
}

function formatUsersToOptions(users: UserItemModel[]) {
  return users.map((user) => ({
    label: user.name,
    value: user.id,
  }));
}

export function MemberSelect({ value, onChange }: MemberSelectProps) {
  const [filterUsersByUserName, setFilterUsersByUserName] =
    useState<string>("");

  const { isLoading, data: usersPaginationData } = useGetUsers({
    userName: filterUsersByUserName === "" ? undefined : filterUsersByUserName,
    includeUserIds: value,
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="animate-spin" /> Buscando usuários
      </div>
    );
  }

  if (!usersPaginationData) {
    return null;
  }

  const options: Option[] = formatUsersToOptions(usersPaginationData.data);
  const selectedOptions = options.filter((opt) => value?.includes(opt.value));

  return (
    <MultipleSelector
      commandProps={{
        label: "Selecione membros",
      }}
      defaultOptions={options}
      emptyIndicator={
        <p className="text-center text-sm">Nenhum usuário encontrado</p>
      }
      hideClearAllButton
      hidePlaceholderWhenSelected
      placeholder="Selecione membros"
      value={selectedOptions}
      onChange={(values) =>
        onChange ? onChange(values.map((v) => v.value)) : undefined
      }
      options={options}
      inputProps={{
        onValueChange: (searchValue) => setFilterUsersByUserName(searchValue),
      }}
    />
  );
}
