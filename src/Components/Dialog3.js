import React, { Component } from 'react';
import './Dialog3.css';
import Grid from "@mui/material/Grid";
import OpenWithIcon from '@mui/icons-material/OpenWith';

export default class Dialog3 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {},
            zindex: 9999
        }

        this._dragStart = this._dragStart.bind(this);
        this._dragging = this._dragging.bind(this);
        this._dragEnd = this._dragEnd.bind(this);
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
                    top: top,
                    zIndex: this.state.zindex
                }
            });
        }
    }
    _dragEnd(e) {
        this.setState({
            dragging: false
        });
        var left = e.screenX - this.state.diffX;
        var top = e.screenY - this.state.diffY;
        this.setState({
            left: left,
            top: top,
            zindex: 1
        })
    }
//pls enjoy the music and contact me for information on my personal instagram (ps: dont hesitate to give me money): <a>https://www.instagram.com/roselikerose_/</a>
    render() {
        var classes = this.props.show ? 'Dialog3' : 'Dialog3 hidden';
        return (
            <div className={classes} style={this.state.styles} onMouseDown={this._dragStart} onMouseMove={this._dragging} onMouseUp={this._dragEnd}>
                <div className='DialogTitle3'>
                    <Grid container spacing={0}>
                        <Grid item xs={1} style={{ paddingTop: '5px' }}>
                            <OpenWithIcon />
                        </Grid>
                        <Grid item xs={11}>
                            WHOAMI?
                        </Grid>
                    </Grid>
                </div>

                <div className='Contents3'>
                    This webradio is a project for my personal experience on react.js and AWS. This is a webradio just for lover of underground weird techno music, such as terrorcore, breakcore, frenchcore... <br/> This is the <strong>first</strong> release of this webradio, this one will get soon update (online chat, programmation, new dialog boxes). 
                </div>
            </div>
        );
    }
}