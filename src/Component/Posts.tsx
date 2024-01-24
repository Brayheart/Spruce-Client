import React from 'react';

const Posts = ({ posts, sortByType, sortDate, sortCustomer, sortEmail, sortAddress }) => {
    return (
      <div className='table-container'>
        <table className='table'>
        <tbody>
          <tr>
            <th onClick={() => sortCustomer()} className='table-header'>Customer</th>
            <th onClick={() => sortEmail()} className='table-header'>Email</th>
            <th onClick={() => sortAddress()} className='table-header'>Address</th>
            <th onClick={() => sortByType()} className='table-header'>Booking Type</th>
            <th onClick={() => sortDate()} className='table-header'>Booking Date/Time</th>
          </tr>
          {posts.map(customer => {
            return (
              <tr>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.type}</td>
                <td>{customer.date + ' at ' + customer.time}</td>
              </tr>
            )
          })}
        </tbody>
        </table>
      </div>
    )
};

export default Posts;
