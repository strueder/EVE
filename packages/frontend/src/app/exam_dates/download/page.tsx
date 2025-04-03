"use client"; // Markiert die Datei als Client-Komponente

import React, { useEffect, useState } from "react";

const DownloadExamDatesPage: React.FC = () => {
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchExamDates = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/downloadExamDates");
      if (!response.ok) {
        throw new Error(`HTTP-Fehler: ${response.status}`);
      }
      const data = await response.text();
      setOutput(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Ein unbekannter Fehler ist aufgetreten");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamDates();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Exam Dates Übersicht</h1>
      {loading && <p>Lade Daten...</p>}
      {error && <p style={{ color: "red" }}>Fehler: {error}</p>}
      {output && (
        <div style={{ maxWidth: "600px", whiteSpace: "pre-wrap" }}>
          <h2>Ergebnis:</h2>
          <p>{output}</p>
        </div>
      )}
      <button onClick={fetchExamDates} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
        Daten erneut laden
      </button>
    </div>
  );
};

export default DownloadExamDatesPage;
