import { useCallback, useEffect, useRef } from "react";

export const useSounds = () => {
  const audioContextRef = useRef(null);
  const pressBufferRef = useRef(null);
  const releaseBufferRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const pressRes = await fetch("/audio/keycap-sounds/press.mp3");
        pressBufferRef.current = await ctx.decodeAudioData(
          await pressRes.arrayBuffer()
        );

        const releaseRes = await fetch("/audio/keycap-sounds/release.mp3");
        releaseBufferRef.current = await ctx.decodeAudioData(
          await releaseRes.arrayBuffer()
        );
      } catch (error) {
        console.error("Failed to load keycap sounds", error);
      }
    };

    loadSound();
    return () => audioContextRef.current?.close();
  }, []);

  const getContext = useCallback(() => {
    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume().catch(() => {});
    }
    return audioContextRef.current;
  }, []);

  const playSoundBuffer = useCallback(
    (buffer) => {
      try {
        const ctx = getContext();
        if (!ctx || !buffer) return;

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.detune.value = Math.random() * 200 - 100;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.4;

        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start(0);
      } catch (err) {
        console.error(err);
      }
    },
    [getContext]
  );

  const playPressSound = useCallback(() => {
    playSoundBuffer(pressBufferRef.current);
  }, [playSoundBuffer]);

  const playReleaseSound = useCallback(() => {
    playSoundBuffer(releaseBufferRef.current);
  }, [playSoundBuffer]);

  return { playPressSound, playReleaseSound };
};
