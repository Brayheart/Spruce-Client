import React from "react";
import Modal from "./Component/Modal.tsx";
import "./App.css";
import Axios from "axios";
import { ReactComponent as Svg } from './logo.svg';
import Posts from './Component/Posts.tsx'
import Pagination from './Component/Pagination.tsx';
import customers from './customers.json';

class App extends React.Component {

  state = {
    show: false,
    currentPage: 1,
    postsPerPage: 10,
    customers: customers,
    filteredUsers: customers,
    q: '',
    type: 'Dog Walker'
  };

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  Search = (event) => {
    const q = event.target.value.toLowerCase();
    this.setState({ q }, () => this.filterList());
    this.setState({currentPage: 1})
  }

  filterList = () => {
    let users = this.state.customers;
    let q = this.state.q;

    users = users.filter(function(user) {
      return user.name.toLowerCase().indexOf(q) != -1; // returns true or false
    });

    this.setState({ filteredUsers: users });
  }

  // getCustomers = () => {
  //   Axios.get("http://localhost:3000/").then((response) => {
  //     this.setState({ customers: response.data, filteredUsers: response.data})
  //   }).catch((error) => {
  //     // Handle the error here. For example, set an error state and display a message.
  //     console.error("An error occurred while fetching the customers:", error);
  //   });
  // }

  // componentDidMount = () => {
  //   this.getCustomers()
  // }

  sortDate = () => {
    var sortedDate = this.state.customers.sort((a, b) => (new Date(a.date)) - (new Date(b.date)))
    this.setState({customers: sortedDate})
  }

  sortCustomer = () => {
    var sortedCustomer = this.state.customers.sort((a, b) => (a.name.localeCompare(b.name)))
    this.setState({customers: sortedCustomer})
  }

  sortEmail = () => {
    var sortedEmail = this.state.customers.sort((a, b) => (a.email.localeCompare(b.email)))
    this.setState({customers: sortedEmail})
  }

  sortAddress = () => {
    var sortAddress = this.state.customers.sort((a, b) => (a.address.localeCompare(b.address)))
    this.setState({customers: sortAddress})
  }

  dateConvert = () => {
    if (Array.isArray(this.state.customers)) {
      this.state.customers.map(el => {
      var date = new Date(el.date + ' ');
      var options = {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
      var sDay = date.toLocaleDateString("en-US", options);
      el.date = sDay
    
      })
    } else {
      // If customers is not an array, log the error or handle it appropriately
      console.error('this.state.customers is not an array', this.state.customers);
    }
  }

  sortByType = (type) => {
    if(this.state.type === 'Dog Walker') {
      let sorted = this.state.filteredUsers.sort((a, b) => (a.type > b.type) - (a.type < b.type))
      this.setState({customers: sorted, type: 'HouseKeeper'})
    } else {
      let sorted = this.state.filteredUsers.sort((a, b) => (a.type < b.type) - (a.type > b.type))
      this.setState({customers: sorted, type: 'Dog Walker'})
    }
  }


  render() {

    this.dateConvert()

    // Get current posts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    let currentPosts = this.state.filteredUsers.slice(indexOfFirstPost, indexOfLastPost);
console.log(customers, currentPosts)
    const paginate = pageNumber => this.setState({currentPage: pageNumber});

    return (
      <div className="App">
        <div className='nav'>
          <div className='svg'><Svg/></div>
        </div>
          <div className='header-container'>
            <div className='bookings'>Bookings</div>
            <button
              className='create-bookings'
              onClick={e => {
                this.showModal(e);
              }}
            >
              {" "}
              Create Booking{" "}
            </button>
          </div>

          <label className='searchByLabel'>Search By:</label>
          <input type="text" id="myInput" onChange={this.Search} placeholder="Search for names.." title="Type in a name"></input>

        <Posts
          posts={currentPosts}
          sortByType={this.sortByType}
          sortDate={this.sortDate}
          sortCustomer={this.sortCustomer}
          sortEmail={this.sortEmail}
          sortAddress={this.sortAddress}
        />
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.filteredUsers.length}
          paginate={paginate}
        />
        <Modal
          getCustomers={this.getCustomers}
          onClose={this.showModal}
          show={this.state.show}>
        </Modal>
    </div>
    );
  }
}

export default App;
