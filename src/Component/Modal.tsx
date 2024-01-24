import "./modal.css";
import PropTypes from "prop-types";
import React, { useState } from 'react';
import Axios from "axios";

export default class Modal extends React.Component {

  state = {
    name: "",
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    type: '',
    date: '',
    time: '',
    validate: false
  }

  addCustomer = () => {

    var timeSplit = this.state.time.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }

    var time = hours + ':' + minutes + ' ' + meridian

    console.log(this.state.date)

    Axios.post("https://spruce-backend.herokuapp.com/create", {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      type: this.state.type,
      date: this.state.date,
      time: time
    }).then(() => {
      console.log('success')
      this.props.getCustomers()
    });
  };

  onClose = e => {
    if(e.target === e.currentTarget) {
        this.props.onClose && this.props.onClose(e);
    }
  };

  validate = (e) => {
    if(!this.state.name || !this.state.email || !this.state.address || !this.state.type || !this.state.time || !this.state.date) {
      this.setState({validate: true})
    } else {
      this.setState({
        name: "",
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        type: '',
        date: '',
        time: '',
        validate: false
      })
      this.onClose(e);
      this.addCustomer();
      this.props.getCustomers();
    }
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div  onClick={(e) => this.onClose(e)} className='modal-container'>
        <div className='modal'>
        <div className='container'>
          <h2>Create Booking</h2>
        </div>
        <div className="content">
          <div>
            <div className='title'>Name</div>
            <input onChange={(event) => this.setState({name: event.target.value})} className='input-full' type="text" id="fname" name="fname" required></input>
            <div className='title'>Email</div>
            <input onChange={(event) => this.setState({email: event.target.value})} className='input-full' type="email" id="fname" name="fname"></input>
            <div className='title'>Street Address</div>
            <input onChange={(event) => this.setState({address: event.target.value})} className='input-full' type="text" id="fname" name="fname"></input>
            <div className='title'>City</div>
            <input onChange={(event) => this.setState({city: event.target.value})}  className='input-full' type="text" id="fname" name="fname"></input>
            <div style={{display: 'flex'}}>
              <div className='half' >
                <div className='title'>State</div>
                <input onChange={(event) => this.setState({state: event.target.value})}  className='input-half' type="text" id="fname" name="fname"></input>
              </div>
              <div className='half half2'>
                <div className='title'>Zip Code</div>
                <input onChange={(event) => this.setState({zip: event.target.value})}  className='input-half' type="number" id="fname" name="fname"></input>
              </div>
            </div>
          </div>
        <div>
          <div className='title'>Booking Type</div>
          <select onChange={(event) => this.setState({type: event.target.value})}>
              <option value="">-- Please Select an Option--</option>
              <option value="HouseKeeping">HouseKeeping</option>
              <option value="Dog walker">Dog walker</option>
          </select>

          <div className='title'>Booking Date</div>
          <input onChange={(event) => this.setState({date: event.target.value})}  className='input-full' type="date" id="fname" name="fname"></input>
          <div className='title'>Booking Time</div>
          <input onChange={(event) => this.setState({time: event.target.value})} className='input-full' type="time" id="fname" name="fname"></input>

          {this.state.validate && <div className='validate-container'>
            <p>Please fill in all required fields</p>
            <div className="unorderedlist-container">
              <ul>
                <li>Name</li>
                <li>Email</li>
                <li>Address</li>
              </ul>
              <ul>
                <li>Date</li>
                <li>Type</li>
                <li>Time</li>
              </ul>
              </div>
            </div>
          }

            <button onClick={(e) => {
              this.validate(e)
            }} className='create-bookings button'>Create Booking</button>

        </div>
        </div>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
