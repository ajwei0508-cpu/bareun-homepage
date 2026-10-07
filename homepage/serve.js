const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2'
};

const brainDir = path.resolve('C:/Users/0508a/.gemini/antigravity/brain/27107abe-29bc-4aac-b3c8-075bf69cc1b3');

// Auto-sync newly generated empathy images to homepage root on startup
try {
  if (fs.existsSync(brainDir)) {
    const syncFiles = [
      { src: 'empathy_night_calm_1791334624634.jpg', dest: 'empathy-night-calm.jpg' },
      { src: 'empathy_metabolism_waist_1791334650179.jpg', dest: 'empathy-metabolism-waist.jpg' },
      { src: 'empathy_wedding_dress_1791334665831.jpg', dest: 'empathy-wedding-dress.jpg' },
      { src: 'empathy_safe_herbal_1791334680080.jpg', dest: 'empathy-safe-herbal.jpg' },
      { src: 'empathy_leg_edema_1791334697534.jpg', dest: 'empathy-leg-edema.jpg' },
      { src: 'empathy_night_calm_1791334624634.jpg', dest: 'empathy_night_calm_1791280780846.jpg' },
      { src: 'empathy_metabolism_waist_1791334650179.jpg', dest: 'empathy_metabolism_waist_1791280801259.jpg' },
      { src: 'empathy_wedding_dress_1791334665831.jpg', dest: 'empathy_wedding_dress_1791280824774.jpg' },
      { src: 'empathy_safe_herbal_1791334680080.jpg', dest: 'empathy_safe_herbal_1791280846992.jpg' },
      { src: 'empathy_leg_edema_1791334697534.jpg', dest: 'empathy_leg_edema_1791280868415.jpg' }
    ];
    syncFiles.forEach(f => {
      const srcP = path.join(brainDir, f.src);
      const destP = path.join(__dirname, f.dest);
      if (fs.existsSync(srcP) && !fs.existsSync(destP)) {
        fs.copyFileSync(srcP, destP);
        console.log(`[Auto-Sync] Copied image: ${f.dest}`);
      }
    });
  }
} catch (e) {
  console.warn('[Auto-Sync Warning]', e.message);
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') {
    reqPath = '/index.html';
  } else if (reqPath === '/diet-zero' || reqPath === '/diet-zero/') {
    reqPath = '/diet-zero.html';
  } else if (reqPath === '/gongjindan' || reqPath === '/gongjindan/' || reqPath === '/gongjindan-2' || reqPath === '/gongjindan-2/') {
    reqPath = '/gongjindan.html';
  }

  let filePath = path.join(__dirname, reqPath);

  // Robust asset resolution: if path with subfolder doesn't exist, resolve by basename in __dirname or brainDir
  if (!fs.existsSync(filePath)) {
    const baseName = path.basename(reqPath);
    const directFile = path.join(__dirname, baseName);
    if (fs.existsSync(directFile)) {
      filePath = directFile;
    } else {
      const brainFile = path.join(brainDir, baseName);
      if (fs.existsSync(brainFile)) {
        filePath = brainFile;
        try {
          fs.copyFileSync(brainFile, directFile);
        } catch (err) {}
      }
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`✨ Huyml Replica Server running at: http://localhost:${PORT}`);
});
