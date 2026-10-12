/* ==========================================================================
   Background removal, entirely in the browser. Nothing is uploaded.

   Model: MODNet (Apache 2.0), a portrait matting model, through
   Transformers.js (Apache 2.0). Both are fetched on first use from public
   CDNs, about 25 MB, then cached by the browser, so the second photo is
   quick. Runs on WebGPU where the browser has it, WebAssembly otherwise.
   ========================================================================== */

const TRANSFORMERS = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';
const MODEL = 'Xenova/modnet';
const MAX_EDGE = 2000;

let loading = null;

async function hasWebGPU() {
  try { return !!(navigator.gpu && (await navigator.gpu.requestAdapter())); } catch { return false; }
}

function load(onStatus) {
  if (loading) return loading;
  loading = (async () => {
    onStatus?.('Loading the background remover (first time only, about 25 MB)');
    const { AutoModel, AutoProcessor, RawImage, env } = await import(TRANSFORMERS);
    env.allowLocalModels = false;
    const device = (await hasWebGPU()) ? 'webgpu' : 'wasm';
    const progress = (p) => {
      if (p.status === 'progress' && p.total) onStatus?.(`Downloading model ${Math.round((p.loaded / p.total) * 100)}%`);
    };
    let model;
    try {
      model = await AutoModel.from_pretrained(MODEL, { device, dtype: 'fp32', progress_callback: progress });
    } catch (e) {
      if (device === 'wasm') throw e;
      model = await AutoModel.from_pretrained(MODEL, { device: 'wasm', dtype: 'fp32', progress_callback: progress });
    }
    const processor = await AutoProcessor.from_pretrained(MODEL);
    return { model, processor, RawImage };
  })();
  loading.catch(() => { loading = null; });
  return loading;
}

/** Decode a file into a canvas, honouring EXIF rotation, capped at MAX_EDGE. */
export async function fileToCanvas(file, maxEdge = MAX_EDGE) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    const k = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * k);
    c.height = Math.round(img.naturalHeight * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** True when a decoded image already carries a transparent background. */
export function hasTransparency(canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let clear = 0;
  const step = 4 * 7;
  let n = 0;
  for (let i = 3; i < data.length; i += step) { n++; if (data[i] < 200) clear++; }
  return clear / n > 0.03;
}

/** Crop away fully transparent margins. */
export function trim(canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const { width: w, height: hgt } = canvas;
  const { data } = ctx.getImageData(0, 0, w, hgt);
  let minX = w, minY = hgt, maxX = -1, maxY = -1;
  for (let y = 0; y < hgt; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return canvas;
  const out = document.createElement('canvas');
  out.width = maxX - minX + 1;
  out.height = maxY - minY + 1;
  out.getContext('2d').drawImage(canvas, minX, minY, out.width, out.height, 0, 0, out.width, out.height);
  return out;
}

/** Person photo in, transparent cutout canvas out. */
export async function removeBackground(canvas, onStatus) {
  const { model, processor, RawImage } = await load(onStatus);
  onStatus?.('Removing the background');
  const image = RawImage.fromCanvas(canvas);
  const { pixel_values } = await processor(image);
  const { output } = await model({ input: pixel_values });
  const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(canvas.width, canvas.height);

  const out = document.createElement('canvas');
  out.width = canvas.width;
  out.height = canvas.height;
  const ctx = out.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(canvas, 0, 0);
  const px = ctx.getImageData(0, 0, out.width, out.height);
  const m = mask.data;
  const ch = mask.channels || 1;
  for (let i = 0, j = 0; i < px.data.length; i += 4, j += ch) px.data[i + 3] = m[j];
  ctx.putImageData(px, 0, 0);
  return trim(out);
}

export function canvasToBlob(canvas, type = 'image/png', quality) {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not encode the image'))), type, quality));
}
