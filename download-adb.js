const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const zipPath = path.join(__dirname, 'adb-tools.zip');
const targetDir = path.join(__dirname, 'bin');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log('Downloading Android Platform Tools (ADB)...');
const file = fs.createWriteStream(zipPath);

https.get('https://dl.google.com/android/repository/platform-tools-latest-windows.zip', (response) => {
  if (response.statusCode === 302 || response.statusCode === 301) {
    https.get(response.headers.location, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log('Download complete. Extracting ADB...');
          try {
            execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${targetDir}' -Force"`);
            console.log('ADB Extracted successfully!');
            if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
          } catch (e) {
            console.error('Error expanding archive:', e);
          }
        });
      });
    });
  } else {
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log('Download complete. Extracting ADB...');
        try {
          execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${targetDir}' -Force"`);
          console.log('ADB Extracted successfully!');
          if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
        } catch (e) {
          console.error('Error expanding archive:', e);
        }
      });
    });
  }
}).on('error', (err) => {
  console.error('Download error:', err.message);
});
