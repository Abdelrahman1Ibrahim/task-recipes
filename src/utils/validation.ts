export function validateSrcImage(src: string | null | undefined) {
  let isValidUrl = true;
  if (src) {
    try {
      new URL(src);
    } catch {
      isValidUrl = false;
    }
  }
  return isValidUrl;
}
