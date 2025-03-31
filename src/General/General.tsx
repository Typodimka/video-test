import React, {useEffect} from 'react';
import {Box, Paper} from "src/mui";
import {Player} from "src/General/Components/Player";
import {useAppDispatch, useAppSelector} from "src/store/hooks";
import {Events} from "src/General/Components/Events";
import {
  setUpdateEvents,
  setIsPlaying
} from "src/store/general-reducer";
import {SxProps} from "@mui/material";
import {AnimationPlay} from "src/General/Components/AnimationPlay";
import {events, EventType} from "src/constants/events";
import {Contours} from "src/General/Components/Contours";

const style: SxProps = {
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  borderRadius: 0
}

export const sortEvents = (listEvents: EventType[]) => {
  let updateEvents = [...listEvents].sort((x, y) => x.timestamp - y.timestamp);
  updateEvents = updateEvents.map(event => ({
    ...event,
    endTime: event.timestamp + event.duration
  }));
  return updateEvents
}

export const General = () => {

  const dispatch = useAppDispatch()
  const {isPlaying} = useAppSelector(state => state.general);

  useEffect(() => {
    dispatch(setUpdateEvents(sortEvents(events)))
  }, [])

  return (
    <Paper sx={style}>
      <Events/>
      <Box sx={{width: "100%", height: "100%", flex: 1, position: "relative"}}
           onClick={() => dispatch(setIsPlaying(!isPlaying))}>
        <Player/>
        <AnimationPlay/>
        <Contours/>
      </Box>
    </Paper>
  );
};

