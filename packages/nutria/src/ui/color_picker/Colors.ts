import Rgb from "./Rgb";
import { Random } from '@nutriadoc/classes';



function hexToRgb(hex: string): Rgb {
  if (hex.length === 4) {
      hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { Red: r, Green: g, Blue: b }
}

export function randomColor(): string {
  for (let i = 0; i < 30; i++) {
    const r1 = Random.getRandomNumber(0, One.length - 1)
    const r2 = Random.getRandomNumber(0, One[r1].length - 1)

    const color = One[r1][r2]
    const rgb = hexToRgb(color)

    if (rgb.Blue <= 200 && rgb.Red <= 200 && rgb.Green <= 200) {
      return color
    }
  }

  throw new Error("Could not find a color")
}

export const One = [

  [
    "#FFFFFF",
    "#F2F2F2",
    "#D8D8D8",
    "#BFBFBF",
    "#A5A5A5",
    "#939393",
  ],
  [
    "#000000",
    "#7F7F7F",
    "#595959",
    "#3F3F3F",
    "#262626",
    "#0D0D0D",
  ],
  [
    "#485368",
    "#F3F5F7",
    "#C5CAD3",
    "#808B9E",
    "#353B45",
    "#24272E"
  ],
  [
    "#2972F4",
    "#E5EFFF",
    "#C7DCFF",
    "#99BEFF",
    "#1450B8",
    "#0C306E",
  ],
  [
    "#00A3F5",
    "#E5F6FF",
    "#C7ECFF",
    "#99DDFF",
    "#1274A5",
    "#0A415C",
  ],
  [
    "#319B62",
    "#EAFAF1",
    "#C3EAD5",
    "#98D7B6",
    "#277C4F",
    "#184E32",
  ],
  [
    "#DE3C36",
    "#FFE9E8",
    "#FFC9C7",
    "#FF9C99",
    "#9E1E1A",
    "#58110E",
  ],
  [
    "#F88825",
    "#FFF3EB",
    "#FFDCC4",
    "#FFBA84",
    "#B86014",
    "#58110E",
  ],
  [
    "#F5C400",
    "#FFF9E3",
    "#FFEEAD",
    "#FFE270",
    "#A38200",
    "#665200",
  ],
  [
    "#9A38D7",
    "#FDEBFF",
    "#F2C7FF",
    "#D58EFF",
    "#5E2281",
    "#3B1551"
  ]
]