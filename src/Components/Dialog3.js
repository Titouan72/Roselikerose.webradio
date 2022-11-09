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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        );
    }
}