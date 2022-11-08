
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
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";

const Dialog1 = () => {
    console.log("hScreen " + window.innerHeight);
    console.log("wScreen " + window.innerWidth);
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

    const [fastSeeker, setFastSeeker] = React.useState();
    const [actualArtist, setActualArtist] = React.useState("Unknown");
    const [actualSongname, setActualSongname] = React.useState("Unknown");
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

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const audioTuneToPlay = actualMusic;
    console.log(typeof (audioTuneToPlay))
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
                timer = timerArray.reduce((a, b) => {
                    return a + b;
                });
                console.log(timer * 1000);
                const audioTune = new Audio(arrayDataShuffled[i].file);
                audioTune.load();
                if (i == 0) {
                    setActualMusic(audioTune);
                    setBackground("url('" + arrayDataShuffled[i].img + "')");
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
                        setBackground("url('" + arrayDataShuffled[i].img + "')");
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

    const sidebarJob = () => {
        console.log('sidebarJob')
        if (sidebar == true) {
            setSidebar(false);
        } else {
            setSidebar(true);
        }
    };

    const chatJob = () => {
        console.log('chatJob')
        if (chat == true) {
            console.log('false')
            setChat(false);
        } else {
            console.log('true')
            setChat(true);
        }
    };
    if (screenType == "big") {
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
                    zIndex: "100",
                }}
                onLoad={checkScreenSize}
                id="test"
            >
                <div
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        position: "fixed",
                        bottom: "0",
                        zIndex: "12",
                        height: "5%",
                        width: "20%",
                        right: "0",
                    }}
                >
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <Button
                                variant="text"
                                style={{ color: "white", top: "-15%", marginLeft: "50px" }}
                                onClick={chatJob}
                            >
                                <ChatIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="text"
                                style={{ color: "white", top: "-15%", marginLeft: "50px" }}
                                onClick={sidebarJob}
                            >
                                <InfoIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <div
                    style={{
                        backgroundColor: "white",
                        color: "black",
                        position: "fixed",
                        bottom: "0",
                        left: "0",
                        zIndex: "13",
                        height: "7%",
                        width: "20%",
                        right: "0",
                        top: "55%",
                    }}
                >
                    <marquee
                        behavior="scroll"
                        style={{
                            marginLeft: "15px",
                            marginRight: "15px",
                            fontFamily: "system-ui",
                            fontSize: "25px",
                            fontStyle: "italic",
                            fontWeight: "900",
                        }}
                    >
                        Song {actualSongname} from {actualArtist}
                    </marquee>
                </div>
                <div
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        position: "fixed",
                        bottom: "0",
                        left: "50px",
                        zIndex: "13",
                        height: "7%",
                        width: "4%",
                        right: "1",
                        top: "0",
                    }}
                >
                    <img
                        src="https://c.tenor.com/U-ttF4Ohd8cAAAAM/kassadin-kassa-jam.gif"
                        height="50px"
                        style={{ left: "13px", position: "relative", top: "8px" }}
                    ></img>
                </div>
                <div
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        position: "fixed",
                        bottom: "0",
                        left: "127px",
                        zIndex: "13",
                        height: "7%",
                        width: "4%",
                        right: "1",
                        top: "0",
                        cursor: "none",
                    }}
                >
                    <p id="rec" style={{ color: rec == false ? "white" : "red" }}>
                        •
                    </p>
                </div>
                {showPlayOrPause == "first" && (
                    <button
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            position: "fixed",
                            bottom: "0",
                            left: "0",
                            zIndex: "12",
                            height: "40%",
                            width: "20%",
                            right: "0",
                        }}
                        id="work"

                        class="buttonNeon"
                        onClick={playSound}
                    >
                        {/* <VolumeOffIcon style={{ fontSize: "110px", color: 'white'}}  /> */}
                        <p
                            class="buttonNeon"
                            style={{
                                fontSize: "50px",
                                color: "white",
                                textShadow: "0 0 50px #FFFFFF",
                            }}
                        >
                            TURNED OFF
                        </p>
                    </button>
                )}
                {showPlayOrPause == "second" && (
                    <button
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            position: "fixed",
                            bottom: "0",
                            left: "0",
                            zIndex: "12",
                            height: "40%",
                            width: "20%",
                            right: "0",
                        }}
                        onClick={muteSound}
                    >
                        {/* <VolumeUpIcon style={{ fontSize: "110px" }} /> */}
                        {wait == false && (
                            <p
                                class="buttonNeon"
                                style={{
                                    fontSize: "50px",
                                    color: "white",
                                    textShadow: "0 0 50px #FFFFFF",
                                }}
                            >
                                TURNED ON
                            </p>
                        )}
                        {wait == true && (
                            <p
                                style={{
                                    fontSize: "20px",
                                    color: "white",
                                    cursor: "wait",
                                    textShadow: "0 0 50px #FFFFFF",
                                    fontStyle: "italic",
                                }}
                            >
                                Turning on...
                            </p>
                        )}
                    </button>
                )}
                {showPlayOrPause == "third" && (
                    <button
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            position: "fixed",
                            bottom: "0",
                            left: "0",
                            zIndex: "12",
                            height: "40%",
                            width: "20%",
                            right: "0",
                        }}
                        id="work"
                        onClick={resumeSound}
                    >
                        {/* <VolumeOffIcon style={{ fontSize: "110px" }} /> */}
                        <p
                            class="buttonNeon"
                            style={{
                                fontSize: "50px",
                                color: "white",
                                textShadow: "0 0 50px #FFFFFF",
                            }}
                        >
                            TURNED OFF
                        </p>
                    </button>
                )}

                <div
                    style={{
                        background: "black",
                        width: "50%",
                        position: "fixed",
                        top: "40%",
                        left: "25%",
                        paddingRight: "20px",
                        paddingLeft: "20px",
                    }}
                >
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                            <VolumeUp
                                style={{ color: "white", position: "relative", top: "-4px" }}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Slider
                                style={{ width: "97%", color: "white" }}
                                value={typeof value === "number" ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                            />
                        </Grid>
                    </Grid>
                </div>

                {/* ////////////////////////////////////////////////////////////BEGINING OF POMODORO///////////////////////////////////////////////////
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          position: "fixed",
          top: "0",
          zIndex: "12",
          height: "20%",
          width: "30%",
          right: "0",
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <div id="timer">
              <div id="time">
                <span id="minutes">25</span>
                <span id="colon">:</span>
                <span id="seconds">00</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <p style={{ marginTop: "70px" }}>{valueTime}</p>
          </Grid>
        </Grid>
      </button> 
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
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
                        {/* <VolumeOffIcon style={{ fontSize: "110px", color: 'white'}}  /> */}
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
