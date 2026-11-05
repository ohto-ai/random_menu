"use strict";

/**
 * MenuWheel — a dependency-free canvas prize wheel.
 * Public API: MenuWheel.create(canvas, { dark, onSpinEnd })
 *   -> { setItems(items), setDark(bool), spin(), isSpinning() }
 */
(function (global) {
  const PALETTE = [
    "#ff9f43",
    "#54a0ff",
    "#1dd1a1",
    "#feca57",
    "#ff6b6b",
    "#5f27cd",
    "#f368e4",
    "#00d2d3",
    "#a55eea",
    "#48dbfb",
    "#f19066",
    "#26de81",
    "#4b7bec",
    "#eb3b5a",
    "#2bcbba",
  ];
  const SPIN_DURATION_MS = 4200;
  const MIN_REVOLUTIONS = 4;
  const MAX_REVOLUTIONS = 6;

  function truncateLabel(text, maxWidth, ctx) {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let cut = text.length - 1;
    while (cut > 1 && ctx.measureText(`${text.slice(0, cut)}…`).width > maxWidth) {
      cut--;
    }
    return `${text.slice(0, cut)}…`;
  }

  function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  }

  function create(canvas, options) {
    const opts = options || {};
    const ctx = canvas.getContext("2d");
    let items = [];
    let dark = Boolean(opts.dark);
    let rotation = 0; // radians, accumulated
    let spinning = false;
    const onSpinEnd = typeof opts.onSpinEnd === "function" ? opts.onSpinEnd : () => {};

    function resize() {
      const cssSize = canvas.clientWidth || 300;
      const dpr = global.devicePixelRatio || 1;
      const px = Math.round(cssSize * dpr);
      if (canvas.width !== px) {
        canvas.width = px;
        canvas.height = px;
      }
      draw();
    }

    function fontSizeFor(count, radius) {
      if (count <= 8) return Math.max(14, radius * 0.075);
      if (count <= 16) return Math.max(12, radius * 0.06);
      return Math.max(10, radius * 0.05);
    }

    function draw() {
      const dpr = global.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const cx = width / 2;
      const cy = width / 2;
      const radius = width / 2 - 8;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, width);

      const count = items.length;
      if (!count) {
        // Empty state ring
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = dark ? "#3d3d3d" : "#eee";
        ctx.fill();
        ctx.fillStyle = dark ? "#aaa" : "#888";
        ctx.font = `${Math.max(13, radius * 0.09)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🍱", cx, cy);
        return;
      }

      const segmentAngle = (Math.PI * 2) / count;
      const strokeColor = dark ? "#2d2d2d" : "#ffffff";

      for (let i = 0; i < count; i++) {
        const start = rotation + i * segmentAngle;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, start, start + segmentAngle);
        ctx.closePath();
        ctx.fillStyle = PALETTE[i % PALETTE.length];
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(1, radius * 0.008);
        ctx.stroke();
      }

      // Labels along each segment, rotated to the segment mid-angle
      const font = fontSizeFor(count, radius);
      ctx.font = `600 ${font}px system-ui, sans-serif`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
      ctx.shadowBlur = 3;

      const maxLabelWidth = radius * 0.62;
      for (let i = 0; i < count; i++) {
        const mid = rotation + (i + 0.5) * segmentAngle;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(mid);
        ctx.fillText(truncateLabel(items[i], maxLabelWidth, ctx), radius - font * 0.7, 0);
        ctx.restore();
      }
      ctx.shadowBlur = 0;

      // Outer rim
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = dark ? "#555" : "#ccc";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    function spin() {
      if (spinning || items.length < 2) return;
      spinning = true;

      const count = items.length;
      const segmentAngle = (Math.PI * 2) / count;
      const targetIndex = Math.floor(Math.random() * count);
      const jitter = (Math.random() - 0.5) * segmentAngle * 0.7;
      // Land the chosen segment's center on the top pointer (-PI/2)
      const desiredFinal = -Math.PI / 2 - (targetIndex + 0.5) * segmentAngle + jitter;
      const revolutions =
        (MIN_REVOLUTIONS + Math.floor(Math.random() * (MAX_REVOLUTIONS - MIN_REVOLUTIONS + 1))) *
        Math.PI *
        2;
      const startRotation = rotation;
      const totalDelta =
        revolutions +
        ((((desiredFinal - startRotation) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2));
      const startTime = performance.now();

      const frame = (now) => {
        const progress = Math.min(1, (now - startTime) / SPIN_DURATION_MS);
        rotation = startRotation + totalDelta * easeOutCubic(progress);
        draw();

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          spinning = false;
          onSpinEnd(items[targetIndex]);
        }
      };
      requestAnimationFrame(frame);
    }

    function setDark(nextDark) {
      const changed = dark !== Boolean(nextDark);
      dark = Boolean(nextDark);
      if (changed) draw();
    }

    return {
      setItems(nextItems) {
        items = Array.isArray(nextItems) ? nextItems.slice() : [];
        resize();
      },
      setDark,
      spin,
      isSpinning: () => spinning,
      resize,
    };
  }

  global.MenuWheel = { create };
})(window);
