export function sRGBtoLinear(color: number) {
  return color <= 0.04045
    ? color / 12.92
    : Math.pow((color + 0.055) / 1.055, 2.4);
}

export function parseRGB(rbg: string) {
  rbg = rbg.replace('rgb(', '').replace(')', '').replace(' ', '');
  const values = rbg.split(',');
  const r = parseInt(values[0]);
  const g = parseInt(values[1]);
  const b = parseInt(values[2]);
  return { r, g, b };
}

export function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

export function calculateLuminanceHex(hexColor: string) {
  const { r, g, b } = hexToRgb(hexColor);
  return calculateLuminanceRGB(r, g, b);
}

export function calculateLuminanceRGB(r: number, g: number, b: number) {
  const linR = sRGBtoLinear(r / 255);
  const linG = sRGBtoLinear(g / 255);
  const linB = sRGBtoLinear(b / 255);

  return 0.2126 * linR + 0.7152 * linG + 0.0722 * linB;
}

export function invertHex(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return invertRgb(r, g, b);
}

export function invertRgb(r: number, g: number, b: number) {
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;
  return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
}
