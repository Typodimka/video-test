import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import {useAppSelector} from "src/store/hooks";

const style: CSSProperties = {
  pointerEvents: "none",
  position: "absolute",
  zIndex: 2,
  top: 0,
  left: 0,
}

export const Contours = () => {

  const {updateEvents} = useAppSelector(state => state.general);

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState<null | { width: number, height: number }>(null)

  useEffect(() => {
    videoRef.current = document.getElementById("video") as HTMLVideoElement
  }, [])

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const {width, height} = entry.contentRect
        setCanvasSize({width, height})
      }
    });

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, [videoRef.current]);

  const createContours = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const {currentTime} = video
    const findEvents = updateEvents.filter(event => event.timestamp < currentTime && event.endTime > currentTime)
    const ctx = canvas.getContext('2d');
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!findEvents.length) return;
    findEvents.forEach(event => {
      const {top, left, width, height} = event.zone
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.strokeRect(left, top, width, height);
    })
  }


  useEffect(() => {
    createContours()

    const interval = setInterval(() => {
      createContours()
    }, 100)

    return () => clearInterval(interval)
  }, [updateEvents, canvasSize, videoRef.current])

  if (!canvasSize) return null
  return (
    <canvas
      style={style}
      width={canvasSize.width}
      height={canvasSize.height}
      ref={canvasRef}/>
  );
};

