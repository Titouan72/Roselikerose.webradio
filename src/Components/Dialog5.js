import Wavesurfer from "wavesurfer.js";
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import React, { useEffect, useRef } from "react";
import { Flex, Button } from "@chakra-ui/react";
import Grid from "@mui/material/Grid";
import './Dialog5.css';
import OpenWithIcon from '@mui/icons-material/OpenWith';
const Dialog5 = (props) => {
    const waveform = useRef(null);
    const [styles, setStyles] = React.useState({});
    const [dragging, setDragging] = React.useState(false);
    const [diffY, setDiffY] = React.useState(0);
    const [diffX, setDiffX] = React.useState(0);
    const [p, setP] = React.useState(false);
    const [zindex, setZIndex] = React.useState(9999);
    const [song, setSong] = React.useState(props.songToplay);
    useEffect(() => {
        // Check if wavesurfer object is already created.
        if (!waveform.current) {
            // Create a wavesurfer object
            // More info about options here https://wavesurfer-js.org/docs/options.html
            waveform.current = Wavesurfer.create({
                container: "#waveform",
                waveColor: "hsl(281, 62%, 35%)",
                barGap: 1,
                barWidth: 1,
                barRadius: 5,
                cursorWidth: 3,
                cursorColor: "transparent",
 /*                 plugins: [
                    Wavesurfer.Timeline.create({
                        container: "#wave-timeline"
                    }),
                    Wavesurfer.spectrogram.create({
                        wavesurfer: waveform,
                        container: "#wave-spectrogram",
                        labels: true,
                        height: 256,
                    })
                  ]  */
            });
            waveform.current.load(props.songToPlay);

            playAudio()

            //job()
            // Load audio from a remote url.

            /* To load a local audio file
                  1. Read the audio file as a array buffer.
                  2. Create a blob from the array buffer
                  3. Load the audio using wavesurfer's loadBlob API
           */
        }
    }, []);

    const job = async () => {
        //await waveform.current.load(props.songToPlay);
        //if (waveform.current.isPlaying()) {
        //    setP(true)
        //    waveform.current.pause();
        //} else {
        //    setP(false)
        await waveform.current.load(props.songToPlay);
        await waveform.current.play();
        console.log(waveform.current.play())
        console.log(props.songToPlay)
        // }
    }

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
                top: top,
                zIndex: zindex
            })
        }
    }
    const playAudio = () => {
        // Check if the audio is already playing
        console.log(waveform.current)
        if (waveform.current.isPlaying()) {
            waveform.current.pause();
        } else {
            if (waveform.current.isReady) {
                waveform.current.play();
                console.log('so')
            }

        }
    };


    const _dragEnd = (e) => {
        setDragging(false)
        var left = e.screenX - diffX;
        var top = e.screenY - diffY;
        setStyles({
            left: left,
            top: top,
            zIndex: 5
        })
    }
    var classes = props.show ? 'Dialog5' : 'Dialog5 hidden';

    return (
        <div className={classes} onMouseDown={_dragStart} onMouseMove={_dragging} onMouseUp={_dragEnd} style={styles}>

            <div classes='DialogTitle5' style={{ borderBottom: '4px solid #0BFD67', backgroundColor: '#0BFD67', color: 'black',fontSize: '25px', fontWeight: '50', textAlign: 'right', paddingRight:' 5px'}}>
            <Grid container spacing={0}>
                        <Grid item xs={1} style={{ paddingTop: '5px' }}>
                            <OpenWithIcon />
                        </Grid>
                        <Grid item xs={11}>
                            OSCILLO3000
                        </Grid>
                    </Grid>
            </div>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Flex flexDirection="column" w="100%" h='10%'>
                                <div id="waveform" style={{height:'10%'}}/>
                                <div id="waveform2" style={{height:'80%'}}>
                                <img src="https://musiquetechapp.s3.eu-west-1.amazonaws.com/68747470733a2f2f692e696d6775722e636f6d2f6b6a3331796c712e676966.gif"  style={{height: '95%', width: '131%'}}/>
                                </div>
                            </Flex>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
};
export default Dialog5;
