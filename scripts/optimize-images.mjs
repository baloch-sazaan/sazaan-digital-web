import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imgDir = path.join(root, 'assets', 'img');
const backup = path.join(__dirname, 'originals');

fs.mkdirSync(backup, { recursive: true });

async function optimizeFolder() {
  if (!fs.existsSync(imgDir)) return;

  const files = fs.readdirSync(imgDir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));

  for (const file of files) {
    const srcPath = path.join(imgDir, file);
    const tempPath = path.join(imgDir, `temp_${file}`);
    const originalSize = fs.statSync(srcPath).size;
    const ext = path.extname(file).toLowerCase();
    
    try {
      let pipeline = sharp(srcPath);

      // Aggressive resize for the logo assets used in preloader/favicon
      if (file.toLowerCase().includes('favicon')) {
        pipeline = pipeline.resize(512, 512, { fit: 'inside' });
      }

      if (ext === '.webp') {
        await pipeline.webp({ quality: 65, effort: 6 }).toFile(tempPath);
      } else if (ext === '.png') {
        // High compression for PNG
        await pipeline.png({ quality: 70, compressionLevel: 9, palette: true }).toFile(tempPath);
      } else {
        await pipeline.jpeg({ quality: 65, mozjpeg: true }).toFile(tempPath);
      }

      const newSize = fs.statSync(tempPath).size;
      if (newSize < originalSize) {
        fs.copyFileSync(tempPath, srcPath);
        console.log(`✓ ${file}: ${kb(originalSize)} → ${kb(newSize)}`);
      }
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    } catch (err) {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
}

function kb(bytes) { return `${(bytes / 1024).toFixed(1)} KB`; }

optimizeFolder();
