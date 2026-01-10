"use client";

import React, { useState } from "react";
import { InputGroup, InputGroupButton, InputGroupInput } from "./ui/input-group";
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput(props: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false)
    
    return (
        <InputGroup>
          <InputGroupInput {...props} type={showPassword ? "text" : "password"} />

          <InputGroupButton onClick={() => setShowPassword(!showPassword)}>
            {showPassword ?  <EyeIcon /> : <EyeOffIcon />}
          </InputGroupButton>
        </InputGroup>
    )
}