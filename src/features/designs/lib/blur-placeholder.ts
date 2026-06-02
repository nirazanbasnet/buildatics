// A tiny neutral-grey raster used as next/image's blur placeholder while remote design previews load,
// so cards show a soft blurred block (image "is there") that sharpens in on load. Remote SAS URLs
// have no low-res variant, so a generic LQIP is the standard approach.
export const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAFElEQVR42mNkYGD4z8DAwMgABXAGADHmAaWj6XzgAAAAAElFTkSuQmCC";
