import React, { Component } from 'react';
import './Dialog4.css';
import Grid from "@mui/material/Grid";
import OpenWithIcon from '@mui/icons-material/OpenWith';

export default class Dialog4 extends Component {
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

    render() {
        var classes = this.props.show ? 'Dialog4' : 'Dialog4 hidden';
        return (
            <div className={classes} style={this.state.styles} onMouseDown={this._dragStart} onMouseMove={this._dragging} onMouseUp={this._dragEnd}>
                <div className='DialogTitle4'>
                    <Grid container spacing={0}>
                        <Grid item xs={1} style={{ paddingTop: '5px', paddingLeft: '5px' }}>
                            <OpenWithIcon />
                        </Grid>
                        <Grid item xs={11}>
                            HAHAHXDD
                        </Grid>
                    </Grid></div>

                <img src="https://musiquetechapp.s3.eu-west-1.amazonaws.com/pi3.png"
                    style={{
                        position: 'relative',
                        top: '-10 %',
                        bottom: '0%',
                        width: '100%'
                    }}></img>
            </div>
        );
    }
}