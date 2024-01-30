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

    const dateFormat = new Date(this.state.date);

    // Specify options for the toLocaleDateString function
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
    // Format the date according to the specified options
    const newDateStr = dateFormat.toLocaleDateString('en-US', options);
  
    const newCustomer = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      type: this.state.type,
      date: newDateStr,
      time: time,
    };

     // Get the existing customers from local storage or set an empty array if none
    const existingCustomers = JSON.parse(localStorage.getItem('customers')) || [];

    // Add the new customer to the array
    const updatedCustomers = [...existingCustomers, newCustomer];

    // Save the updated customers back to local storage
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));

    console.log(this.props.updateCustomers, updatedCustomers)
    this.props.updateCustomers(updatedCustomers);

  };

  onClose = e => {
    if(e.target === e.currentTarget) {
        this.props.onClose && this.props.onClose(e);
    }
  };

  validate = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const zipRegex = /^\d{5}$/; // Zip code regex for exactly 5 digits
  
    // Initialize an errors object to keep track of any validation errors
    let errors = {};
  
    if (!this.state.name) {
      errors.name = "Name is required.";
    }
    console.log(!this.state.email, this.state.email)
    if (!this.state.email || !emailRegex.test(this.state.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!this.state.address) {
      errors.address = "Address is required.";
    }
    if (!this.state.city) {
      errors.city = "City is required.";
    }
    if (!this.state.state) {
      errors.state = "State is required.";
    }
    if (!this.state.zip || !zipRegex.test(this.state.zip)) {
      errors.zip = "Zip code must be exactly 5 digits long.";
    }
    if (!this.state.type) {
      errors.type = "Booking type is required.";
    }
    if (!this.state.date) {
      errors.date = "Date is required.";
    }
    if (!this.state.time) {
      errors.time = "Time is required.";
    }
  
    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      // If there are errors, update the state to trigger the display of error messages
      this.setState({ validate: true, errors: errors });
    } else {
      // If there are no errors, proceed with the rest of the process
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
      });
      this.onClose(e);
      this.addCustomer();
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
            <input  onChange={(event) => this.setState({name: event.target.value})} className='input-full' type="text" id="fname" name="fname" required></input>
            <div className='title'>Email</div>
            <input onChange={(event) => this.setState({email: event.target.value})} className='input-full' type="email" id="fname" name="fname"></input>
            <div className='title'>Street Address</div>
            <input onChange={(event) => this.setState({address: event.target.value})} className='input-full' type="text" id="fname" name="fname"></input>
            <div className='title'>City</div>
            <input onChange={(event) => this.setState({city: event.target.value})}  className='input-full' type="text" id="fname" name="fname"></input>
            <div className="inputConatiner">
              <div className='half' >
                <div className='title'>State</div>
                <select onChange={(event) => this.setState({state: event.target.value})}  className='input-half' id="fname" name="fname">
<option value="AL">AL</option>
<option value="AK">AK</option>
<option value="AZ">AZ</option>
<option value="AR">AR</option>
<option value="CA">CA</option>
<option value="CO">CO</option>
<option value="CT">CT</option>
<option value="DE">DE</option>
<option value="FL">FL</option> 
<option value="GA">GA</option>
<option value="HI">HI</option>
<option value="ID">ID</option>
<option value="IL">IL</option>
<option value="IN">IN</option>
<option value="IA">IA</option>
<option value="KS">KS</option>
<option value="KY">KY</option>
<option value="LA">LA</option>
<option value="ME">ME</option>
<option value="MD">MD</option>
<option value="MA">MA</option>
<option value="MI">MI</option>
<option value="MN">MN</option>
<option value="MS">MS</option>
<option value="MO">MO</option>
<option value="MT">MT</option>
<option value="NE">NE</option> 
<option value="NV">NV</option>
<option value="NH">NH</option>
<option value="NJ">NJ</option>
<option value="NM">NM</option>
<option value="NY">NY</option>
<option value="NC">NC</option>
<option value="ND">ND</option>
<option value="OH">OH</option>
<option value="OK">OK</option>
<option value="OR">OR</option>
<option value="PA">PA</option>
<option value="RI">RI</option>
<option value="SC">SC</option>
<option value="SD">SD</option>
<option value="TN">TN</option>
<option value="TX">TX</option>
<option value="UT">UT</option>
<option value="VT">VT</option>
<option value="VA">VA</option>
<option value="WA">WA</option>
<option value="WV">WV</option>  
<option value="WI">WI</option>
<option value="WY">WY</option>
                </select>
              </div>
              <div className='half half2'>
                <div className='title'>Zip Code</div>
                <input onChange={(event) => this.setState({zip: event.target.value})} style={{height: '19px'}}  className='input-half' type="number" id="fname" name="fname"></input>
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
            <div>
              {this.state.validate && this.state.errors.name && <div className="error-message">{this.state.errors.name}</div>}
              {this.state.validate && this.state.errors.email && <div className="error-message">{this.state.errors.email}</div>}
              {this.state.validate && this.state.errors.address && <div className="error-message">{this.state.errors.address}</div>}
              {this.state.validate && this.state.errors.city && <div className="error-message">{this.state.errors.city}</div>}
              {this.state.validate && this.state.errors.state && <div className="error-message">{this.state.errors.state}</div>}
              {this.state.validate && this.state.errors.zip && <div className="error-message">{this.state.errors.zip}</div>}
              {this.state.validate && this.state.errors.type && <div className="error-message">{this.state.errors.type}</div>}
              {this.state.validate && this.state.errors.date && <div className="error-message">{this.state.errors.date}</div>}
              {this.state.validate && this.state.errors.time && <div className="error-message">{this.state.errors.time}</div>}
            </div>
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
