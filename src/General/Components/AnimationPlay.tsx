import React, {useEffect, useState} from 'react';
import {useAppSelector} from "src/store/hooks";
import {Box, Fade} from "src/mui";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import {SxProps} from "@mui/material";

const style: SxProps = {
  pointerEvents: "none",
  position: "absolute",
  zIndex: 3,
  top: "50%",
  left: "50%",
  transform: 'translate(-50%, -50%)'
}

export const AnimationPlay = () => {

  const {isPlaying} = useAppSelector(state => state.general);

  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    setIsActive(true)
    let timeOut = setTimeout(() => {
      setIsActive(false)
    }, 1500)
    return () => clearTimeout(timeOut)
  }, [isPlaying])

  return (
    <Box sx={style}>
      <Fade in={isActive}>
        {!isPlaying ? <PauseIcon sx={{fontSize: 60}}/> :
          <PlayArrowIcon sx={{fontSize: 60}}/>}

      </Fade>
    </Box>

  );
};

