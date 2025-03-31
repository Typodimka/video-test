import React, {useEffect, useRef} from 'react';
import {urlVideo} from "src/constants/constants";
import {useAppSelector} from "src/store/hooks";

export const Player = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {isPlaying} = useAppSelector(state => state.general);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(e => {
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <video
      src={urlVideo}
      width="100%"
      height="100%"
      style={{background: "black", position: "absolute", zIndex: 0}}
      id="video"
      ref={videoRef}

    />
  );
};


