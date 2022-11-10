
/* import './Dialog5.css';
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
    //document.getElementsByClassName('css-52oi9o').click()
    
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
} */

import Wavesurfer from "wavesurfer.js";
import React, { useEffect, useRef } from "react";
import { Flex, Button } from "@chakra-ui/react";
import Grid from "@mui/material/Grid";
import './Dialog5.css';

const Dialog5 = (props, {count}) => {
    const waveform = useRef(null);
    const [styles, setStyles] = React.useState({});
    const [dragging, setDragging] = React.useState(false);
    const [diffY, setDiffY] = React.useState(0);
    const [diffX, setDiffX] = React.useState(0);
    const [p, setP] = React.useState(false);
    const [song, setSong] = React.useState(props.songToplay);
    useEffect(() => {
        // Check if wavesurfer object is already created.
        if (!waveform.current) {
            // Create a wavesurfer object
            // More info about options here https://wavesurfer-js.org/docs/options.html
            waveform.current = Wavesurfer.create({
                container: "#waveform",
                waveColor: "#567FFF",
                barGap: 2,
                barWidth: 3,
                barRadius: 3,
                cursorWidth: 3,
                cursorColor: "#567FFF",
            });
            // Load audio from a remote url.
            waveform.current.load(props.songToPlay);
            /* To load a local audio file
                  1. Read the audio file as a array buffer.
                  2. Create a blob from the array buffer
                  3. Load the audio using wavesurfer's loadBlob API
           */
        }
    }, []);


    useEffect(() => {
        const playAudio = () => {
            // Check if the audio is already playing
            if (waveform.current.isPlaying()) {
                setP(true)
                waveform.current.pause();
            } else {
                setP(false)
                waveform.current.play();
            }
        };

        // 👇️ don't run on initial render
        if (props.count == false) {
            playAudio();
        }
    }, [count]);

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

    return (


        <div className={classes} style={styles} onMouseDown={_dragStart} onMouseMove={_dragging} onMouseUp={_dragEnd}>
            <div classes='DialogTitle5' style={{ borderBottom: '4px solid #0BFD67' }}>
                TITOUAN
            </div>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Flex flexDirection="column" w="100%">
                                <div id="waveform" />
                            </Flex>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>

        </div>
    );
};
export default Dialog5;
