
import './DialogMobile.css';
import Dialog5 from './Dialog5';
import React, { useState, useEffect, useRef } from "react";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import { DialogTitle } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import CloseIcon from '@mui/icons-material/Close';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

const DialogMobile = (props) => {

    return (
        <><div className='Title9'>You better go on a computer because the mobile version isn't made yet. Sorry, but its coming soon. Stay tuned.</div><img src="https://musiquetechapp.s3.eu-west-1.amazonaws.com/giphy.gif"
            style={{
                position: 'relative',
                bottom: '0%',
                width: '70%',
                padding: '20px'
            }}></img></>
    );
}


export default DialogMobile;
