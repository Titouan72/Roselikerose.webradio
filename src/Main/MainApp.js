import React, { Component } from 'react';
import './MainApp.css';
import Dialog1 from '../Components/Dialog1';
import Dialog2 from '../Components/Dialog2';
import Dialog3 from '../Components/Dialog3';

export default class MainApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog1: false,
            showDialog2: false,
            showDialog3: false,
        }
    }

    _showDialog1() {
        this.setState({showDialog1: !this.state.showDialog1});
    }
    _showDialog2() {
        this.setState({showDialog2: !this.state.showDialog2});
    }
    _showDialog3() {
        this.setState({showDialog3: !this.state.showDialog3});
    }
	
	render() {
        
		return (
			<div className='MainApp'>
                <div className='Title'>Example Dialog Popper</div>
				<div className='button' onClick={this._showDialog1.bind(this)}> Show Dialog 1 </div>
                <Dialog1 onClose={this._showDialog1.bind(this)} show={this.state.showDialog1}/>
                <div className='button' onClick={this._showDialog2.bind(this)}> Show Dialog 2 </div>
                <Dialog2 onClose={this._showDialog2.bind(this)} show={this.state.showDialog2} />
                <div className='button' onClick={this._showDialog3.bind(this)}> Show Dialog 3 </div>
                <Dialog3 onClose={this._showDialog3.bind(this)} show={this.state.showDialog3} />
			</div>

		);
	}
} 