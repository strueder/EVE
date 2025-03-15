import axios from 'axios';
import * as cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';

// Download-Verzeichnis zentral definieren
const DOWNLOADS_DIR = path.resolve(__dirname, '../downloads');

/**
 * Lädt die neuesten XLSX-Dateien von der TU Darmstadt Website herunter.
 * Existiert bereits eine Datei mit dem Originalnamen, so wird diese als Backup
 * (Dateiname_SAVE.xlsx) gespeichert – ein eventuell vorhandenes altes Backup wird zuvor gelöscht.
 *
 * @returns Array mit den Pfaden der heruntergeladenen Dateien oder null, wenn keine gefunden wurden.
 */
export async function downloadExamDates(): Promise<string[] | null> {
  try {
    const url = 'https://www.intern.tu-darmstadt.de/verwaltung/dez_ii/campusmanagement/cm_lvm/pruefungstermine_zentral/index.de.jsp';
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const downloadUrls: string[] = [];

    // Alle XLSX-Links sammeln
    $('a').each((i: number, elem: any) => {
      const href = $(elem).attr('href');
      if (href && href.toLowerCase().includes('xlsx')) {
        const absoluteUrl = new URL(href, url).href;
        downloadUrls.push(absoluteUrl);
      }
    });

    if (downloadUrls.length === 0) {
      console.log('Kein Download-Link gefunden.');
      return null;
    }

    // Stelle sicher, dass der Zielordner existiert
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });

    // Für jeden Link wird die Datei heruntergeladen
    const downloadPromises = downloadUrls.map(async (downloadUrl) => {
      const urlObj = new URL(downloadUrl);
      const originalFileName = path.basename(urlObj.pathname);
      const filePath = path.resolve(DOWNLOADS_DIR, originalFileName);
      const parsed = path.parse(originalFileName);
      const backupFilePath = path.resolve(DOWNLOADS_DIR, `${parsed.name}_SAVE${parsed.ext}`);

      // Falls eine Datei mit dem Originalnamen existiert:
      if (fs.existsSync(filePath)) {
        // Bestehendes Backup löschen, falls vorhanden
        if (fs.existsSync(backupFilePath)) {
          fs.unlinkSync(backupFilePath);
        }
        // Die existierende Datei in das Backup umbenennen
        fs.renameSync(filePath, backupFilePath);
      }

      // Herunterladen der neuen Datei
      const fileResponse = await axios.get(downloadUrl, { responseType: 'stream' });
      const writer = fs.createWriteStream(filePath);
      fileResponse.data.pipe(writer);

      return new Promise<string>((resolve, reject) => {
        writer.on('finish', () => {
          console.log('Datei erfolgreich heruntergeladen: ' + filePath);
          resolve(filePath);
        });
        writer.on('error', (err) => {
          console.error('Fehler beim Herunterladen der Datei: ', err);
          reject(err);
        });
      });
    });

    const filePaths = await Promise.all(downloadPromises);
    return filePaths;
  } catch (err) {
    console.error('Fehler beim Abrufen der Website: ', err);
    return null;
  }
}
