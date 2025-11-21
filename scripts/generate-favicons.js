const sharp = require('sharp')
const toIco = require('to-ico')
const fs = require('fs')
const path = require('path')

const publicDir = path.join(__dirname, '..', 'public')
const input = path.join(publicDir, 'drive4less.jpg')
const out16 = path.join(publicDir, 'drive4less-16.png')
const out32 = path.join(publicDir, 'drive4less-32.png')
const out180 = path.join(publicDir, 'drive4less-180.png')
const outIco = path.join(publicDir, 'drive4less.ico')

async function generate() {
  if (!fs.existsSync(input)) {
    console.error('Input file not found:', input)
    process.exit(1)
  }

  try {
    await sharp(input).resize(16, 16, { fit: 'cover' }).png().toFile(out16)
    console.log('Created', out16)

    await sharp(input).resize(32, 32, { fit: 'cover' }).png().toFile(out32)
    console.log('Created', out32)

    await sharp(input).resize(180, 180, { fit: 'cover' }).png().toFile(out180)
    console.log('Created', out180)

    // read generated PNG buffers and convert to ICO
    const buf16 = fs.readFileSync(out16)
    const buf32 = fs.readFileSync(out32)
    const icoBuffer = await toIco([buf16, buf32])
    fs.writeFileSync(outIco, icoBuffer)
    console.log('Created', outIco)

    console.log('Favicons generated successfully.')
  } catch (err) {
    console.error('Error generating favicons:', err)
    process.exit(1)
  }
}

generate()
