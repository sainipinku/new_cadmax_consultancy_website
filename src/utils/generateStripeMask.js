/**
 * generateStripeMask — builds a CSS `linear-gradient` string
 * that acts as a horizontal-stripe "venetian blind" mask.
 *
 * Each stripe has a slightly delayed progress so the reveal
 * cascades from top to bottom (30 stripes × 3.333 % each).
 *
 * @param {number} progress  0 → 1  (global scroll progress for the slide)
 * @param {number} stripes   Number of horizontal bands (default 30)
 * @param {number} delay     Delay per stripe (default 0.025)
 * @returns {string}         CSS gradient compliant with mask-image
 */
export function generateStripeMask(
  progress = 0,
  stripes = 30,
  delay = 0.025
) {
  if (progress <= 0) {
    // Fully hidden (all transparent)
    const stops = [];
    for (let i = 0; i < stripes; i++) {
      const y1 = (i / stripes) * 100;
      const y2 = ((i + 1) / stripes) * 100;
      stops.push(`transparent ${y1}%, transparent ${y2}%`);
    }
    return `linear-gradient(to bottom, ${stops.join(', ')})`;
  }

  if (progress >= 1) {
    // Fully revealed (all black)
    const stops = [];
    for (let i = 0; i < stripes; i++) {
      const y1 = (i / stripes) * 100;
      const y2 = ((i + 1) / stripes) * 100;
      stops.push(`black ${y1}%, black ${y2}%`);
    }
    return `linear-gradient(to bottom, ${stops.join(', ')})`;
  }

  const stops = [];
  for (let i = 0; i < stripes; i++) {
    const stripeProgress = Math.max(
      0,
      Math.min(1, progress - i * delay)
    );

    const stripeHeight = 100 / stripes;
    const yBase = i * stripeHeight;

    // The stripe "grows" from the top of its band downward
    const fillHeight = stripeProgress * stripeHeight;
    const top = yBase;
    const bottom = yBase + fillHeight;

    // Black = visible, transparent = hidden
    stops.push(`black ${top}%, black ${bottom}%`);

    if (bottom < yBase + stripeHeight) {
      stops.push(`transparent ${bottom}%, transparent ${yBase + stripeHeight}%`);
    }
  }

  return `linear-gradient(to bottom, ${stops.join(', ')})`;
}

/**
 * Smoothly maps a raw progress value (0-1) using an easing curve.
 * Useful for giving the stripe reveal a more organic feel.
 */
export function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}