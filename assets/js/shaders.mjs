/* Live Paper shaders, progressive enhancement.
   The exported stills stay in the markup as the rendered fallback; each
   shader mounts a canvas over its still and fades the still out only once
   the first frame is up. If WebGL, this module, or an asset fails, the
   stills simply remain. Parameters are verbatim from the Paper file
   01KZW0Y27PGW3NV0QJRPXAJ9DZ, artboard "BUYER 1440".
   Library: @paper-design/shaders v0.0.80, self hosted under
   assets/vendor/paper-shaders (MIT), no CDN. */

import { ShaderMount } from '../vendor/paper-shaders/shader-mount.js';
import { getShaderColorFromString } from '../vendor/paper-shaders/get-shader-color-from-string.js';
import { getShaderNoiseTexture } from '../vendor/paper-shaders/get-shader-noise-texture.js';
import { ShaderFitOptions } from '../vendor/paper-shaders/shader-sizing.js';
import { grainGradientFragmentShader, GrainGradientShapes } from '../vendor/paper-shaders/shaders/grain-gradient.js';
import { liquidMetalFragmentShader, LiquidMetalShapes } from '../vendor/paper-shaders/shaders/liquid-metal.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IMG = '../../assets/img/';

function sizing(overrides) {
  return Object.assign({
    u_fit: ShaderFitOptions.contain,
    u_scale: 1,
    u_rotation: 0,
    u_offsetX: 0,
    u_offsetY: 0,
    u_originX: 0.5,
    u_originY: 0.5,
    u_worldWidth: 0,
    u_worldHeight: 0,
  }, overrides || {});
}

/* ---- Mount scheduling ---------------------------------------------------
   Constructing a ShaderMount is synchronous and not cheap: a WebGL context,
   a shader compile and link, a texture upload and a first draw. Two remain
   on this page, both in the prestige band, and they enter the observer's
   margin together, so left alone they land in one task while the visitor is
   scrolling.

   So gate every mount: one at a time, and only in idle time. The exported
   still stays in place until its own shader is up, so a mount deferred until
   scrolling settles shows the still meanwhile rather than a gap.

   This is a precaution rather than a measured win. The card stack's jank was
   the drop-shadow filter on .truth-card, fixed in the stylesheet; the mount
   burst could not be isolated as a second cause here, because this container
   has no GPU and software WebGL distorts exactly these numbers. Serialising
   the two is still the right shape on weak hardware, and it costs nothing
   when the machine is fast. */
let mountQueue = Promise.resolve();

function whenIdle() {
  return new Promise((resolve) => {
    if (typeof requestIdleCallback === 'function') requestIdleCallback(() => resolve(), { timeout: 2000 });
    else setTimeout(resolve, 0);
  });
}

/* Run `mount` once the queue reaches it and the main thread is idle. The
   queue waits for the work itself, not just for the idle slot, so two mounts
   can never share a task. Failures are swallowed on the queue's copy of the
   promise so one bad mount cannot stall the rest; the caller still sees the
   rejection. */
function queueMount(mount) {
  const done = mountQueue.then(whenIdle).then(mount);
  mountQueue = done.catch(() => {});
  return done;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* Mount a shader into a host div layered over `stillEl`, then fade the still.
   Resolves with the mount, once the queue has had its idle slot. */
/* ---- Render resolution ---------------------------------------------------
   Added 28 Sep 2026 after the prestige band was reported laggy on scroll.
   ShaderMount defaults to a minimum pixel ratio of 2, so even a 1x monitor
   rendered both shaders at double resolution: about 3.7M pixels a frame
   for the full-bleed grain and 2M for the liquid mark, every frame at 60fps.
   The grain is a soft gradient under noise, so it renders at the screen's
   own ratio and never above about 0.9M pixels. The mark keeps more detail,
   capped at 1.2M, which is about 1.5x on a retina screen. Together that is
   roughly 2.1M pixels a frame at most, down from 5.6M. The library already
   pauses a mount that is off screen or in a hidden tab. */
const GRAIN_RES = { minPixelRatio: 1, maxPixelCount: 1280 * 720 };
const MARK_RES = { minPixelRatio: 1, maxPixelCount: 1200000 };

function mountOver(stillEl, fragment, uniforms, speed, frame, res) {
  return queueMount(function () {
    const host = document.createElement('div');
    host.className = 'shader-host';
    stillEl.insertAdjacentElement('afterend', host);
    const mount = new ShaderMount(host, fragment, uniforms, undefined, reduced ? 0 : speed, frame,
      res.minPixelRatio, res.maxPixelCount);
    requestAnimationFrame(() => stillEl.classList.add('still-behind-shader'));
    return mount;
  });
}

const noiseTexture = getShaderNoiseTexture ? getShaderNoiseTexture() : undefined;

/* The noise texture is a data-URI image that still decodes async; ShaderMount
   refuses images that are not complete, so wait for it. */
async function readyNoiseTexture() {
  if (!noiseTexture) return undefined;
  if (!noiseTexture.complete) {
    await new Promise((resolve) => {
      noiseTexture.onload = resolve;
      noiseTexture.onerror = () => resolve();
    });
  }
  return noiseTexture.complete && noiseTexture.naturalWidth > 0 ? noiseTexture : undefined;
}

/* ---- Prestige: grain gradient background ------------------------------- */
async function prestigeGrain() {
  const band = document.querySelector('.prestige');
  if (!band) return;
  const noise = await readyNoiseTexture();
  const host = document.createElement('div');
  host.className = 'shader-host shader-host--band';
  await queueMount(function () {
    band.prepend(host);
    return new ShaderMount(host, grainGradientFragmentShader, sizing({
      u_scale: 1.93,
      u_colorBack: getShaderColorFromString('#00000000'),
      u_colors: ['#001114', '#202020', '#464646', '#00404B'].map(getShaderColorFromString),
      u_colorsCount: 4,
      u_softness: 1,
      u_intensity: 0.26,
      u_noise: 0.19,
      u_shape: GrainGradientShapes.corners,
      u_noiseTexture: noise,
    }), undefined, reduced ? 0 : 1, 147046.53, GRAIN_RES.minPixelRatio, GRAIN_RES.maxPixelCount);
  });
}

/* ---- Prestige: liquid metal mark ----------------------------------------
   The mask is baked by tools/bake-liquid-metal.mjs rather than computed
   here. Calling toProcessedLiquidMetal() at runtime rasterised the source
   SVG at the library's hardcoded 4096px and solved a Poisson equation over
   it: about 3s of main-thread time and a 1.3MB blob per visit, measured
   18 Aug 2026. The mask is identical for every visitor, so it is now a
   121KB cached image. Re-run npm run bake if prestige-mark.svg changes. */
async function prestigeLiquid() {
  const still = document.querySelector('.prestige-visual img');
  if (!still) return;
  const img = await loadImage(IMG + 'prestige-mark-mask.webp');
  mountOver(still, liquidMetalFragmentShader, sizing({
    u_scale: 0.6,
    u_image: img,
    u_isImage: true,
    u_colorBack: getShaderColorFromString('#00000000'),
    u_colorTint: getShaderColorFromString('#FFFFFF'),
    u_repetition: 2,
    u_softness: 0.1,
    u_shiftRed: 0.3,
    u_shiftBlue: 0.3,
    u_distortion: 0.07,
    u_contour: 0.4,
    u_angle: 70,
    u_shape: LiquidMetalShapes.diamond,
  }), 1, 349839.6, MARK_RES);
}

/* WebGL sanity check before doing any work. */
function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

/* Mount when the target is within one viewport of the fold, so a visitor who
   never scrolls that far never pays for the shader. Every mount is a WebGL
   context plus a shader compilation, and both of them sit in the prestige
   band below the fold. The still stays in place until its shader is up, so
   nothing pops. */
function whenNear(target, run, label) {
  if (!target) return;
  const io = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    Promise.resolve()
      .then(run)
      .catch((e) => console.warn(label + ' failed:', e));
  }, { rootMargin: '100% 0px' });
  io.observe(target);
}

if (webglAvailable()) {
  const prestige = document.querySelector('.prestige');
  whenNear(prestige, prestigeGrain, 'grain mount');
  whenNear(prestige, prestigeLiquid, 'liquid mount');
}
