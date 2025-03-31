import React from 'react';
import {Box, List, ListItemButton, ListItemText} from "src/mui";
import {useAppSelector} from "src/store/hooks";
import {UpdateEventType} from "src/store/general-reducer";

export const formatTime = (timeFloat: number) => {
  const totalSeconds = Math.floor(timeFloat);
  const milliseconds = Math.round((timeFloat - totalSeconds) * 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}

export const Events = () => {

  const {updateEvents} = useAppSelector(state => state.general);

  const clickHandler = (event: UpdateEventType) => {
    const video = document.getElementById("video") as HTMLVideoElement
    if (!video) return
    video.currentTime = event.timestamp
  }

  return (
    <Box sx={{width: "150px", height: "100vh", borderRadius: 0}}>
      <List sx={{overflow: "auto", maxHeight: "100vh"}}>
        {updateEvents.map((event, i) => {
          return (
            <ListItemButton component="a" href="#simple-list" key={i}
                            onClick={() => clickHandler(event)}>
              <ListItemText primary={formatTime(event.timestamp)}/>
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  );
};

