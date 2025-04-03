"use client";

import { logout } from "@/lib/actions/auth";
import { Button } from "@chakra-ui/react"

export const SignOutButton = () => {
    return (
        <Button 
            onClick={() => logout()}
            colorScheme="red"
        >
            Log Out
        </Button>
    )
}