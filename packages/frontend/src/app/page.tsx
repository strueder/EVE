"use server";

import { auth } from "@/auth";
import { SignInButton } from "./components/sign-in-button"; // Angenommen, diese sind auch angepasst
import { SignOutButton } from "./components/sign-out-button"; // Angenommen, diese sind auch angepasst
import { Box, Heading, Text, Avatar, VStack } from "@chakra-ui/react"; // Chakra Komponenten importieren

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <Box p={4}> {/* Padding mit Chakra */}
        <VStack spacing={4} align="start"> {/* Vertikaler Stack mit Abstand */}
          <Heading as="h1" size="lg"> {/* Überschrift */}
            Du wurdest erfolgreich angemeldet, {session.user.name}!
          </Heading>
          {session.user.image && (
            <Avatar // Chakra Avatar Komponente
              size="md"
              name={session.user.name ?? "Avatar"}
              src={session.user.image}
            />
          )}
          <SignOutButton /> {/* Deine Button-Komponente */}
        </VStack>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <Text>Du bist nicht angemeldet.</Text> {/* Text Komponente */}
        <SignInButton /> {/* Deine Button-Komponente */}
      </VStack>
    </Box>
  );
}