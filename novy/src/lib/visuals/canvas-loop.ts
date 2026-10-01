/** One bounded loop per canvas: no frames off-screen or while the tab is hidden. */
export function startCanvasLoop(canvas: HTMLCanvasElement, draw: () => void, fps = 30) {
  let frame: number | null = null;
  let inView = false;
  let lastFrame = 0;
  let disposed = false;
  const tick = (time: number) => {
    frame = null;
    if (disposed || !inView || document.hidden) return;
    if (time - lastFrame >= 1000 / fps) {
      lastFrame = time;
      draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const update = () => {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    if (!disposed && inView && !document.hidden) frame = requestAnimationFrame(tick);
  };
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    update();
  }, { threshold: 0.01 });
  observer.observe(canvas);
  document.addEventListener("visibilitychange", update);
  return () => {
    disposed = true;
    if (frame !== null) cancelAnimationFrame(frame);
    observer.disconnect();
    document.removeEventListener("visibilitychange", update);
  };
}
