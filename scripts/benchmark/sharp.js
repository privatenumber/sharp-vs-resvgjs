import sharp from 'sharp';

export default svg => sharp(svg, { density: 2400 }).toBuffer();
