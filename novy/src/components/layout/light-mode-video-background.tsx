"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const VIDEO_URL =
  "https://stream.mux.com/Jwr2RhmsNrd6GEspBNgm02vJsRZAGlaoQIh4AucGdASw.m3u8";

const POSTER_URL =
  "https://image.mux.com/Jwr2RhmsNrd6GEspBNgm02vJsRZAGlaoQIh4AucGdASw/thumbnail.webp?time=0";

export function LightModeVideoBackground() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || resolvedTheme !== "light") {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    let hls: import("hls.js").default | null = null;
    let cancelled = false;

    const setupVideo = async () => {
      if (cancelled) {
        return;
      }

      // Safari / iPhone / iPad can play HLS natively.
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = VIDEO_URL;

        try {
          await video.play();
        } catch {
          // The poster remains visible if autoplay is temporarily blocked.
        }

        return;
      }

      // Chrome / Edge / Firefox use hls.js.
      const { default: Hls } = await import("hls.js");

      if (cancelled || !videoRef.current || !Hls.isSupported()) {
        return;
      }

      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 8,
        maxBufferLength: 18,
        maxMaxBufferLength: 24,
        startLevel: -1,
      });

      hls.loadSource(VIDEO_URL);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!cancelled) {
          video.play().catch(() => {});
        }
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal || !hls || cancelled) {
          return;
        }

        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad();
            break;

          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError();
            break;

          default:
            hls.destroy();
            hls = null;
            break;
        }
      });
    };

    void setupVideo();

    return () => {
      cancelled = true;

      if (hls) {
        hls.destroy();
        hls = null;
      }

      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [mounted, resolvedTheme]);

  if (!mounted || resolvedTheme !== "light") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white"
    >
      <video
        ref={videoRef}
        poster={POSTER_URL}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Keep the video visible while preserving text contrast.
          Reduce /15 to /10 if you want the background even stronger. */}
      <div className="absolute inset-0 bg-white/15" />
    </div>
  );
}
