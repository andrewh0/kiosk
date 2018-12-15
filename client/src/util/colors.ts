export const AQI_CATEGORY_COLORS: { [number: number]: string } = {
  1: '#00E400', // Good
  2: '#FFD400', // Moderate
  3: '#FF7E00', // Unhealthy for Sensitive Groups
  4: '#FF0000', // Unhealthy
  5: '#8F3F97', // Very Unhealthy
  6: '#660000' // Hazardous
};

// https://www.colorbox.io/#steps=6#hue_start=216#hue_end=216#hue_curve=easeOutQuad#sat_start=4#sat_end=4#sat_curve=easeOutQuad#sat_rate=23#lum_start=100#lum_end=9#lum_curve=easeOutQuad
export const GRAYSCALE_COLORS: Array<string> = [
  '#fdfeff',
  '#f2f3f5',
  '#dbdcdd',
  '#b0b0b1',
  '#6c6c6d',
  '#171717'
];

export const FONT_COLOR_DARK = GRAYSCALE_COLORS[5];
export const FONT_COLOR_LIGHT = GRAYSCALE_COLORS[1];
export const BACKGROUND_COLOR = GRAYSCALE_COLORS[5];
