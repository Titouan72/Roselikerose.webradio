import React, { Component } from 'react';
import './Dialog2.css';
import Grid from "@mui/material/Grid";
import OpenWithIcon from '@mui/icons-material/OpenWith';
export default class Dialog2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {}
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

    render() {
        var classes = this.props.show ? 'Dialog2' : 'Dialog2 hidden';
        return (
            <div className={classes} style={this.state.styles} onMouseDown={this._dragStart} onMouseMove={this._dragging} onMouseUp={this._dragEnd}>
                <div className='DialogTitle2'>
                    <Grid container spacing={0}>
                        <Grid item xs={1} style={{ paddingTop: '5px' }}>
                            <OpenWithIcon />
                        </Grid>
                        <Grid item xs={11}>
                            ROOM313
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={0} style={{
                    color: 'white', position: 'relative',
                    width: '500px',
                    height: '200px',
                    overflow: 'hidden'
                }}>
                    <Grid item xs={12}>
                        <img src="https://musiquetechapp.s3.eu-west-1.amazonaws.com/lasers-rave.gif" style={{
                            position: 'relative',
                            top: '0 %',
                            bottom: '10%',
                            width: '100%'
                        }}></img>
                    </Grid>
                </Grid>
            </div>
        );
    }
}