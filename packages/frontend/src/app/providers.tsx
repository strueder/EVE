// app/providers.tsx
'use client'

// Sicherstellen, dass der Import korrekt ist
import { ChakraProvider } from '@chakra-ui/react';

// Optional: Importiere dein benutzerdefiniertes Theme, falls du eines hast
// import theme from './theme' 

export function Providers({ children }: { children: React.ReactNode }) {
  // Hier sollte kein Fehler mehr auftreten
  // Wenn du ein Theme hast: <ChakraProvider theme={theme}>
  return <ChakraProvider>{children}</ChakraProvider>; 
}