// TDS's Cloudinary account. Photos are referenced by their Cloudinary ID (usually the
// uploaded filename without extension, e.g. "Komal"); full URLs and /local paths still work.
const CLOUD_NAME = "dufgdskxu";

/**
 * Build a photo URL. Cloudinary finds the face and crops around it
 * (c_thumb + g_face; the low `zoom` keeps an upper-body framing rather than a tight headshot), resizes to `width`,
 * and serves the best format and quality for the visitor's browser. The leading f_jpg step
 * normalises uploads first: face detection doesn't work on iPhone HEIC files directly.
 */
export function photoUrl(id, { width = 600, aspect = "4:5", zoom = 0.3 } = {}) {
  if (!id) return "";
  if (/^(https?:)?\/\//.test(id) || id.startsWith("/")) return id;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_jpg/c_thumb,g_face,z_${zoom},w_${width},ar_${aspect},q_auto,f_auto/${id}`;
}
