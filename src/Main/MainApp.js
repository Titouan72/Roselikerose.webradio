import React, { Component } from 'react';
import './MainApp.css';
import Dialog1 from '../Components/Dialog1';
import Dialog2 from '../Components/Dialog2';
import Dialog3 from '../Components/Dialog3';
import Dialog4 from '../Components/Dialog4';
import Dialog5 from '../Components/Dialog5';
import Dialog6 from '../Components/Dialog6';
import DialogMobile from '../Components/DialogMobile';
//import 'tarang/dist/index.css'

export default class MainApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog1: true,
            showDialog2: true,
            showDialog3: true,
            showDialog4: true,
            showDialog5: true,
            showDialog6: true,
            DialogMobile: true,
            wScreen: null,
            hScreen: null
        }
    }
    componentDidMount() {
        var hScreen = window.innerHeight;
        var wScreen = window.innerWidth;
        console.log(hScreen + ' ' + wScreen)
        this.setState({hScreen: hScreen, wScreen: wScreen})
    }
    _showDialog1() {
        this.setState({ showDialog1: !this.state.showDialog1 });
    }
    _showDialog2() {
        this.setState({ showDialog2: !this.state.showDialog2 });
    }
    _showDialog3() {
        this.setState({ showDialog3: !this.state.showDialog3 });
    }
    _showDialog4() {
        this.setState({ showDialog4: !this.state.showDialog4 });
    }
    _showDialog5() {
        this.setState({ showDialog5: !this.state.showDialog5 });
    }
    _showDialog6() {
        this.setState({ showDialog6: !this.state.showDialog6 });
    }


    render() {
if (this.state.hScreen < 658 && this.state.wScreen < 1162){
    return (
        <div className='MainApp'>
            <DialogMobile show={this.state.showDialogMobile} />
        </div>

    );
} else {
    return (
        <div className='MainApp'>
            <div className='Title'>ROSELIKEROSE.webradio</div>
            <div className='button' onClick={this._showDialog1.bind(this)} style={{ display: 'none' }}> Show Dialog 1 </div>
            <Dialog1 onClose={this._showDialog1.bind(this)} show={this.state.showDialog1} />
            <div className='button' onClick={this._showDialog2.bind(this)} style={{ display: 'none' }}> Show Dialog 2 </div>
            <Dialog2 onClose={this._showDialog2.bind(this)} show={this.state.showDialog2} />
            <div className='button' onClick={this._showDialog3.bind(this)} style={{ display: 'none' }}> Show Dialog 3 </div>
            <Dialog3 onClose={this._showDialog3.bind(this)} show={this.state.showDialog3} />
            <Dialog4 onClose={this._showDialog4.bind(this)} show={this.state.showDialog4} />
            <Dialog6 onClose={this._showDialog6.bind(this)} show={this.state.showDialog6} />
        </div>

    );
}
}

} 