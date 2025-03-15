import express from 'express';
import path from 'path';
import { downloadExamDates } from './modules/examDatesDownloader';

const app = express();
const port = process.env.PORT || 4000;

// Root-Pfad: Nichts tun, hier wird einfach ein 204-Status gesendet
app.get('/', (req, res) => {
  res.sendStatus(204);
});

// Separater Endpunkt, der die Download-Logik auslöst
app.get('/downloadExamDates', async (req, res) => {
  try {
    const filePaths = await downloadExamDates();
    if (filePaths && filePaths.length > 0) {
      // Extrahiere nur die Dateinamen aus den kompletten Pfaden
      res.status(200).json({ 
        message: 'Dateien wurden erfolgreich heruntergeladen.',
        filePaths 
      });
    } else {
      res.status(404).json({ message: 'Kein Download-Link gefunden.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
