"use client";

import { login } from "@/lib/actions/auth";
import { Button } from "@chakra-ui/react"
import { FaDiscord } from "react-icons/fa"

export const SignInButton = () => {
    return (
        <Button 
            onClick={() => login()}
            colorScheme="purple"
            leftIcon={<FaDiscord />}
        >
            Sign In With Discord
        </Button>
    )
}