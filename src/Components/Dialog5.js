
import './Dialog5.css';
import React, { useState, useEffect } from "react";
import Sketch from 'react-p5'
import Grid from "@mui/material/Grid";
import './Dialog5.css';
import { WaveformVisualizer, WaveformVisualizerTheme } from 'react-audio-visualizers';
import OpenWithIcon from '@mui/icons-material/OpenWith';

const Dialog5 = (props) => {
    console.log('pls')
    const [styles, setStyles] = React.useState({});
    const [dragging, setDragging] = React.useState(false);
    const [diffY, setDiffY] = React.useState(0);
    const [diffX, setDiffX] = React.useState(0);
    const [song, setSong] = React.useState(props.songToplay);

    const _dragStart = (e) => {
        setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left)
        setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top)
        setDragging(true)
    }

    const _dragging = (e) => {

        if (dragging) {
            var left = e.screenX - diffX;
            var top = e.screenY - diffY;
            setStyles({
                left: left,
                top: top
            })
        }
    }
    const _dragEnd = () => {
        setDragging(false)
    }
    var classes = props.show ? 'Dialog5' : 'Dialog5 hidden';
    console.log('test')
    return (
        <div className={classes} style={styles} onMouseDown={_dragStart} onMouseMove={_dragging} onMouseUp={_dragEnd} >
            <div className='DialogTitle5'>
                <Grid container spacing={0}>
                    <Grid item xs={1} style={{ paddingTop: '5px' }}>
                        <OpenWithIcon />
                    </Grid>
                    <Grid item xs={11}>
                        {props.songName}
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={0} style={{
                color: 'white', position: 'relative',
                width: '100%',
                height: '60%',
                overflow: 'hidden'
            }}>
                <WaveformVisualizer
                    audio={props.songToPlay}
                    theme={WaveformVisualizerTheme.line}
                    colors={['#0BFD67', '#26a69a']}
                    iconsColor="#26a69a"
                    backgroundColor="black"
                    highFrequency={800}
                    style={{ height: '60%' }}
                    id='clickStart'
                    className='pute'
                />

            </Grid>
        </div>
    );
}
export default Dialog5;
