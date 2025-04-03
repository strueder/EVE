"use client"; // Markiert die Datei als Client-Komponente

import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Spinner, // Für den Ladezustand
  Alert,   // Für Fehlermeldungen
  AlertIcon,
  VStack, // Für vertikales Layout und Abstände
} from "@chakra-ui/react";

const DownloadExamDatesPage: React.FC = () => {
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // useCallback verwenden, um unnötige Neudefinitionen in useEffect zu vermeiden
  const fetchExamDates = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // Der Fetch bleibt relativ zum Next.js Host!
      const response = await fetch("/api/backend/downloadExamDates"); 

      if (!response.ok) {
         // Versuche, eine spezifischere Fehlermeldung vom Backend zu bekommen
         let errorText = `HTTP-Fehler: ${response.status}`;
         try {
            const errorData = await response.json(); // Oder .text() wenn es kein JSON ist
            errorText = errorData.message || errorData.error || errorText; // Beispielhafte Felder
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         } catch (parseError) {
             // Ignorieren, wenn die Antwort nicht geparsed werden kann
         }
        throw new Error(errorText);
      }

      // Annahme: Die API-Route gibt den Text direkt zurück (wie vorher)
      const data = await response.text(); 
      setOutput(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Ein unbekannter Fehler ist aufgetreten");
      console.error("Fetch Error:", err); // Logge den Fehler für Debugging
    } finally {
      setLoading(false);
    }
  }, []); // Leeres Abhängigkeitsarray, da keine externen Variablen verwendet werden

  // Daten beim ersten Laden abrufen
  useEffect(() => {
    fetchExamDates();
  }, [fetchExamDates]); // fetchExamDates als Abhängigkeit hinzufügen

  return (
    // Box ersetzt das äußere div, p fügt Padding hinzu (entspricht 2rem bei Standard-Theme)
    <Box p={8}> 
      {/* VStack für einfaches vertikales Layout mit Abstand */}
      <VStack spacing={5} align="stretch"> 
        {/* Heading ersetzt h1 */}
        <Heading as="h1" size="xl"> 
          Exam Dates Übersicht
        </Heading>

        {/* Ladezustand mit Spinner */}
        {loading && (
          <Box textAlign="center">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            <Text mt={2}>Lade Daten...</Text>
          </Box>
        )}

        {/* Fehleranzeige mit Alert */}
        {error && !loading && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Ausgabe der Daten */}
        {output && !loading && !error && (
          <Box borderWidth="1px" borderRadius="md" p={4} maxWidth="600px">
            <Heading as="h2" size="md" mb={3}>
              Ergebnis vom Server:
            </Heading>
            {/* Text ersetzt p, whiteSpace für pre-wrap */}
            <Text whiteSpace="pre-wrap" fontFamily="monospace"> 
              {output}
            </Text>
          </Box>
        )}

        {/* Button ersetzt button, mt für margin-top */}
        <Button 
          onClick={fetchExamDates} 
          isLoading={loading} // Zeigt einen Ladespinner im Button an
          loadingText="Lade erneut..." // Text während des Ladens
          colorScheme="blue" // Beispiel-Farbschema
          mt={4} // Etwas Abstand nach oben
          alignSelf="flex-start" // Button nicht über volle Breite strecken
          disabled={loading} // Deaktiviert Button während des Ladens
        >
          Daten erneut laden
        </Button>
      </VStack>
    </Box>
  );
};

export default DownloadExamDatesPage;