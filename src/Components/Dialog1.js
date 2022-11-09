
import './Dialog1.css';


/* export default class Dialog1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {},
            value: 30,
            actualMusic: null,
            wait: false,
            rec: false,
            actualArtist: 'Unknown',
            actualSongName: 'Unknown',
            showPlayOrPause: 'first'
        }

        this._dragStart = this._dragStart.bind(this);
        this._dragging = this._dragging.bind(this);
        this._dragEnd = this._dragEnd.bind(this);
        this.playSound = this.playSound.bind(this);
        this.muteSound = this.muteSound.bind(this);
        this.resumeSound = this.resumeSound.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    _dragStart(e) {
        this.setState({
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        });
    }

    _dragging(e) {

        if (this.state.dragging) {
            var left = e.screenX - this.state.diffX;
            var top = e.screenY - this.state.diffY;

            this.setState({
                styles: {
                    left: left,
                    top: top
                }
            });
        }
    }

    _dragEnd() {
        this.setState({
            dragging: false
        });
    }

    /////////////////////////////////////

    async componentDidMount() {
        const data = await axios.get(
            "https://rkzg4yhvcf.execute-api.eu-west-1.amazonaws.com/default/fetchDynamoDBData"
        );
        this.setState({
            data: data.data,
        });
        this.setState({
            audioTuneToPlay: this.state.actualMusic,
        });
        if (this.state.audioTuneToPlay != null) {
            //audioTuneToPlay.currentTime = 200
            this.state.audioTuneToPlay.play();
        }

    }

    handleSliderChange(event, newValue) {
        this.setState({ volume: parseFloat(newValue / 100), value: newValue })
        this.state.audioTuneToPlay.volume = newValue / 100;
    };

    playSound() {
        this.setState({ wait: true, showPlayOrPause: 'second' })
        var timerArray = [];
        var timer;
        var timerFor;
        var elderTimerArray = [0];
        var elderTimer;
        for (let i = 0; i < this.state.data.length; i++) {
            timerArray.push(this.state.data[i].time);
        }
        var arrayDataShuffled = this.state.data.sort(() => Math.random() - 0.5);
        this.setState({ actualSongname: arrayDataShuffled[0].artist, actualSongname: arrayDataShuffled[0].name })
        elderTimerArray.push(13);

        for (let x = 0; x < 10; x++) {
            for (let i = 0; i < arrayDataShuffled.length; i++) {
                timer = timerArray.reduce((a, b) => {
                    return a + b;
                });
                console.log(timer * 1000);
                const audioTune = new Audio(arrayDataShuffled[i].file);
                audioTune.load();

                if (i == 0) {
                    this.setState({ actualMusic: audioTune, actualArtist: arrayDataShuffled[i].artist, actualArtist: arrayDataShuffled[i].name })
                    console.log(
                        "playing " +
                        arrayDataShuffled[i].name +
                        " from " +
                        arrayDataShuffled[i].artist
                    );
                    audioTune.play();
                }
                if (i != 0) {
                    elderTimer = elderTimerArray.reduce((a, b) => {
                        return a + b;
                    });
                    timerFor = elderTimer + arrayDataShuffled[i - 1].time;
                    elderTimerArray.push(arrayDataShuffled[i - 1].time);
                    setTimeout(() => {
                        this.setState({ actualMusic: audioTune, actualArtist: arrayDataShuffled[i].artist, actualArtist: arrayDataShuffled[i].name })
                        console.log(
                            "playing " +
                            arrayDataShuffled[i].name +
                            " from " +
                            arrayDataShuffled[i].artist
                        );
                        audioTune.play();
                    }, timerFor * 1000);
                }
            }
        }
        setTimeout(() => {
            this.setState({ wait: false, rec: true })
        }, 7000);
    };

    muteSound() {
        this.setState({ showPlayOrPause: 'third', volume: 0 })
        this.state.audioTuneToPlay.volume = 0;
    };
    resumeSound() {
        this.setState({ showPlayOrPause: 'second', volume: 0.3 })
        this.state.audioTuneToPlay.volume = 0.3;
    };

    render() {
        var classes = this.props.show ? 'Dialog1' : 'Dialog1 hidden';
        return (
            <div className={classes} style={this.state.styles} onMouseDown={this._dragStart} onMouseMove={this._dragging} onMouseUp={this._dragEnd}>
                <div className='DialogTitle'>
                    <marquee
                        behavior="scroll"
                        style={{
                            marginLeft: "15px",
                            marginRight: "15px",
                            fontFamily: "system-ui",
                            fontSize: "25px",
                            fontStyle: "italic",
                            fontWeight: "900",
                            borderBoottom: '3px solid grey'
                        }}
                    >
                        Song {this.state.actualSongname} from {this.state.actualArtist}
                    </marquee>
                </div>
                {this.state.showPlayOrPause == "first" && (
                    <button
                        style={{
                        }}
                        id="work"

                        class="buttonNeon"
                        onClick={this.playSound}
                    >

                        <p
                            class="buttonNeon"
                            style={{
                            }}
                        >
                            TURNED OFF
                        </p>
                    </button>
                )}
                {this.state.showPlayOrPause == "second" && (
                    <button
                        style={{
                        }}
                        onClick={this.muteSound}
                    >

                        {this.state.wait == false && (
                            <p
                                class="buttonNeon"
                                style={{
                                }}
                            >
                                TURNED ON
                            </p>
                        )}
                        {this.state.wait == true && (
                            <p
                                style={{
                                }}
                            >
                                Turning on...
                            </p>
                        )}
                    </button>
                )}
                {this.state.showPlayOrPause == "third" && (
                    <button
                        style={{
                        }}
                        id="work"
                        onClick={this.resumeSound}
                    >

                        <p
                            class="buttonNeon"
                            style={{
                            }}
                        >
                            TURNED OFF
                        </p>
                    </button>
                )}
                <div className='closeButton' onClick={this.props.onClose}>
                    Close
                </div>
            </div>
        );
    }
} */


import React, { useState, useEffect } from "react";
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

const Dialog1 = (props) => {
    var hScreen = window.innerHeight;
    var wScreen = window.innerWidth;
    var rdmNb = Math.floor(Math.random() * 3);
    var defaultBg =
        "https://musiquetechapp.s3.eu-west-1.amazonaws.com/img_" + rdmNb + ".jpg";
    const [playInLoop, setPlayInLoop] = useState(true);
    const [valueTime, setValueTime] = React.useState("05:00");
    const [value, setValue] = React.useState(30);
    const [volume, setVolume] = React.useState(0.3);
    const [data, setData] = React.useState("");
    const [actualMusic, setActualMusic] = React.useState();
    const [sidebar, setSidebar] = React.useState(false);
    const [wait, setWait] = React.useState(false);
    const [rec, setRec] = React.useState(false);
    const [chat, setChat] = React.useState(false);
    const [screenType, setScreenType] = React.useState("big");
    const [isFirstSong, setIsFirstSong] = React.useState(true);
    const [dragging, setDragging] = React.useState(false);
    const [diffY, setDiffY] = React.useState(0);
    const [diffX, setDiffX] = React.useState(0);
    const [fastSeeker, setFastSeeker] = React.useState();
    const [actualArtist, setActualArtist] = React.useState("Unknown");
    const [actualSongname, setActualSongname] = React.useState("Unknown");
    const [styles, setStyles] = React.useState({});
    const [background, setBackground] = React.useState(
        "url('" + defaultBg + "')"
    );
    const [showPlayOrPause, setShowPlayOrPause] = React.useState("first");
    ////////////////////////////////////////// RESPONSIVE JOB ////////////////////////////////////////////
    const checkScreenSize = () => {
        if (hScreen > 930 && hScreen < 1100 && wScreen > 1900 && wScreen < 2100) {
            setScreenType("big");
            console.log("isBig");
        }
        if (hScreen > 700 && hScreen < 930 && wScreen > 1500 && wScreen < 1900) {
            setScreenType("normal");
            console.log("isNormal");
        }
        if (hScreen > 500 && hScreen < 700 && wScreen > 1200 && wScreen < 1500) {
            setScreenType("normalSmall");
            console.log("isNormalSmall");
        }
        if (hScreen > 650 && hScreen < 900 && wScreen > 300 && wScreen < 400) {
            setScreenType("small");
            console.log("isSmall");
        }
    };


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
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const audioTuneToPlay = actualMusic;
    console.log(audioTuneToPlay)
    if (audioTuneToPlay != null) {
        //audioTuneToPlay.currentTime = 200
        audioTuneToPlay.play();
    }
    /*   if (audioTuneToPlay != null && isFirstSong == false) {
      audioTuneToPlay.play();
    } */

    const handleSliderChange = (event, newValue) => {
        setVolume(parseFloat(newValue / 100));
        setValue(newValue);
        audioTuneToPlay.volume = newValue / 100;
    };

    useEffect(() => {
        async function fetchData() {
            const dataSong = await axios.get(
                "https://rkzg4yhvcf.execute-api.eu-west-1.amazonaws.com/default/fetchDynamoDBData"
            );
            setData(dataSong.data);
        }
        fetchData();
    }, [setData]);

    const playSound = () => {
        /*     var fastSeek = Math.floor(Math.random() * 70) + 30;
        console.log('first' + fastSeek)
        setFastSeeker(fastSeek) */
        setWait(true);
        setShowPlayOrPause("second");
        var timerArray = [];
        var timer;
        var timerFor;
        var elderTimerArray = [0];
        var elderTimer;
        for (let i = 0; i < data.length; i++) {
            timerArray.push(data[i].time);
        }
        var arrayDataShuffled = data.sort(() => Math.random() - 0.5);
        setActualArtist(arrayDataShuffled[0].artist);
        setActualSongname(arrayDataShuffled[0].name);
        elderTimerArray.push(13);

        for (let x = 0; x < 10; x++) {
            for (let i = 0; i < arrayDataShuffled.length; i++) {
                console.log(timerArray);
                timer = timerArray.reduce((a, b) => {
                    return a + b;
                });
                console.log(timer * 1000);
                const audioTune = new Audio(arrayDataShuffled[i].file);
                audioTune.load();
                if (i == 0) {
                    setActualMusic(audioTune);
                    console.log(background);
                    setActualArtist(arrayDataShuffled[i].artist);
                    setActualSongname(arrayDataShuffled[i].name);
                    console.log(
                        "playing " +
                        arrayDataShuffled[i].name +
                        " from " +
                        arrayDataShuffled[i].artist
                    );
                }
                if (i != 0) {
                    elderTimer = elderTimerArray.reduce((a, b) => {
                        return a + b;
                    });
                    timerFor = elderTimer + arrayDataShuffled[i - 1].time;
                    elderTimerArray.push(arrayDataShuffled[i - 1].time);
                    setTimeout(() => {
                        setActualMusic(audioTune);
                        setActualArtist(arrayDataShuffled[i].artist);
                        setActualSongname(arrayDataShuffled[i].name);
                        console.log(
                            "playing " +
                            arrayDataShuffled[i].name +
                            " from " +
                            arrayDataShuffled[i].artist
                        );
                    }, timerFor * 1000);
                }
            }
        }
        setTimeout(() => {
            setWait(false);
            setRec(true);
        }, 7000);
    };

    const iOSBoxShadow =
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

    const marks = [
        {
            value: 0,
        },
        {
            value: 25,
        },
        {
            value: 50,
        },
        {
            value: 75,
        },
        {
            value: 100,
        },
    ];

    const IOSSlider = styled(Slider)(({ theme }) => ({
        color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
        height: 2,
        padding: '15px 0',
        '& .MuiSlider-thumb': {
            height: 28,
            width: 28,
            backgroundColor: '#fff',
            boxShadow: iOSBoxShadow,
            '&:focus, &:hover, &.Mui-active': {
                boxShadow:
                    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    boxShadow: iOSBoxShadow,
                },
            },
        },
        '& .MuiSlider-valueLabel': {
            fontSize: 12,
            fontWeight: 'normal',
            top: -6,
            backgroundColor: 'unset',
            color: theme.palette.text.primary,
            '&:before': {
                display: 'none',
            },
            '& *': {
                background: 'transparent',
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            },
        },
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: '#bfbfbf',
        },
        '& .MuiSlider-mark': {
            backgroundColor: '#bfbfbf',
            height: 8,
            width: 1,
            '&.MuiSlider-markActive': {
                opacity: 1,
                backgroundColor: 'currentColor',
            },
        },
    }));


    const muteSound = async () => {
        await setShowPlayOrPause("third");
        await setVolume(0);
        audioTuneToPlay.volume = 0;
    };
    const resumeSound = async () => {
        await setShowPlayOrPause("second");
        await setVolume(0.3);
        audioTuneToPlay.volume = 0.3;
    };


    var classes = props.show ? 'Dialog1' : 'Dialog1 hidden';
    if (screenType == "big") {
        return (
            <div
                onLoad={checkScreenSize}
                id="test"
                className={classes} style={styles} onMouseDown={_dragStart} onMouseMove={_dragging} onMouseUp={_dragEnd}
            >
                <div classes={DialogTitle} style={{ borderBottom: '4px solid #0BFD67' }}>
                    <marquee
                        behavior="scroll"
                        style={{
                            marginLeft: "15px",
                            marginRight: "15px",
                            fontSize: "25px",
                            fontWeight: "50",
                            color: '#0BFD67',
                            fontFamily: 'system-ui'
                        }}
                    >
                        SONG {actualSongname.toUpperCase()} FROM {actualArtist.toUpperCase()}
                    </marquee>
                </div>
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <div style={{ color: '#0BFD67', marginTop: '15px' }} onClick={props.onClose}>
                            <CloseIcon style={{ border: '2px solid #0BFD67' }} />
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <IOSSlider
                                    style={{ marginTop: '15px', color: '#0BFD67' }}
                                    value={typeof value === "number" ? value : 0}
                                    onChange={handleSliderChange}
                                    aria-label="ios slider"
                                    valueLabelDisplay="on"
                                    marks={marks}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        {showPlayOrPause == "first" && (
                            <button
                                id="work"
                                style={{ background: 'transparent', border: 'none' }}
                                class="buttonNeon"
                                onClick={playSound}
                            >
                                {/* <VolumeOffIcon style={{ fontSize: "110px", color: 'white'}}  /> */}
                                <PlayArrowOutlinedIcon style={{ color: '#0BFD67', fontSize: '50px', height: '60px' }} />
                            </button>
                        )}
                        {showPlayOrPause == "second" && (
                            <button
                                style={{ background: 'transparent', border: 'none' }}
                                onClick={muteSound}
                            >
                                {/* <VolumeUpIcon style={{ fontSize: "110px" }} /> */}
                                {wait == false && (
                                    <StopIcon style={{ color: '#0BFD67', fontSize: '50px', height: '60px' }} />
                                )}
                                {wait == true && (
                                    <p
                                        style={{ color: '#0BFD67' }}
                                    >
                                        Turning on...
                                    </p>
                                )}
                            </button>
                        )}
                        {showPlayOrPause == "third" && (
                            <button
                                id="work"
                                onClick={resumeSound}
                                style={{ background: 'transparent', border: 'none' }}
                            >
                                {/* <VolumeOffIcon style={{ fontSize: "110px" }} /> */}
                                <PlayArrowOutlinedIcon style={{ color: '#0BFD67', fontSize: '50px', height: '60px' }} />
                            </button>
                        )}
                    </Grid>
                </Grid>

            </div>
        );
    }
    if (screenType == "normal") {
        return (
            <div
                onLoad={checkScreenSize}
                className="Dialog1"
            >
                <div
                >
                    <marquee
                        behavior="scroll"
                    >
                        Song {actualSongname} from {actualArtist}
                    </marquee>
                </div>
                {showPlayOrPause == "first" && (
                    <button
                        id="work"
                        class="buttonNeon"
                        onClick={playSound}
                    >
                        <p
                            class="buttonNeon"

                        >
                            TURNED OFF
                        </p>
                    </button>
                )}
                {showPlayOrPause == "second" && (
                    <button
                        onClick={muteSound}
                    >
                        {wait == false && (
                            <p
                                class="buttonNeon"
                            >
                                TURNED ON
                            </p>
                        )}
                        {wait == true && (
                            <p
                            >
                                Turning on...
                            </p>
                        )}
                    </button>
                )}
                {showPlayOrPause == "third" && (
                    <button
                        id="work"
                        onClick={resumeSound}
                    >
                        <p
                            class="buttonNeon"
                        >
                            TURNED OFF
                        </p>
                    </button>
                )}

                <div
                    style={{
                    }}
                >
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                            <VolumeUp
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Slider
                                value={typeof value === "number" ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
    if (screenType == "normalSmall") {
        return (
            <div
                onLoad={checkScreenSize}
                id="test"
            >
                <div
                >
                    <marquee
                        behavior="scroll"
                    >
                        Song {actualSongname} from {actualArtist}
                    </marquee>
                </div>
                {showPlayOrPause == "first" && (
                    <button
                        id="work"
                        class="buttonNeon"
                        onClick={playSound}
                    >
                        <p
                            class="buttonNeon"
                        >
                            TURNED OFF
                        </p>
                    </button>
                )}
                {showPlayOrPause == "second" && (
                    <button
                        onClick={muteSound}
                    >
                        {/* <VolumeUpIcon style={{ fontSize: "110px" }} /> */}
                        {wait == false && (
                            <p
                                class="buttonNeon"
                            >
                                TURNED ON
                            </p>
                        )}
                        {wait == true && (
                            <p
                            >
                                Turning on...
                            </p>
                        )}
                    </button>
                )}
                {showPlayOrPause == "third" && (
                    <button
                        id="work"
                        onClick={resumeSound}
                    >
                        {/* <VolumeOffIcon style={{ fontSize: "110px" }} /> */}
                        <p
                            class="buttonNeon"
                        >
                            TURNED OFF
                        </p>
                    </button>
                )}

                <div
                >
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                            <VolumeUp
                                style={{ color: "white", position: "relative", top: "-4px" }}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Slider
                                style={{ width: "97%", color: "white", zIndex: "100" }}
                                value={typeof value === "number" ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
    if (screenType == "small") {
        return (
            <div
                style={{
                    backgroundImage: background,
                    height: "100vh",
                    margin: "-8px",
                    fontSize: "50px",
                    overflow: "hidden",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                onLoad={checkScreenSize}
                id="test"
            >
                <div
                    style={{
                        background: "black",
                        width: "300px",
                        height: "400px",
                        position: "relative",
                        left: "10%",
                        right: "10%",
                        top: "30%",
                    }}
                >
                    <img
                        src="https://c.tenor.com/rfhztq1on6gAAAAM/anime-lucky-star.gif"
                        height="120px"
                        style={{ top: "30px", position: "relative", left: '87px', marginBottom: '20px' }}
                    ></img>

                    <p style={{ color: 'white', fontSize: '14.5px', margin: '20px', textAlign: 'justify', fontFamily: 'cursive' }}>Unlucky this web application does not work on phone.<br></br><br></br> The mobile application to be developed.
                        <br></br><br></br><br></br>I recommend you to try again on a <strong>computer</strong>. Sorry for that. <strong style={{ color: 'purple' }}><br></br><br></br>Kiss</strong></p>
                </div>
            </div>
        );
    }
};

export default Dialog1;
