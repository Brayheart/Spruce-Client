import { render } from '@testing-library/react';
import Modal from '../Component/Modal.js';
import Pagination from '../Component/Pagination.js';
import Posts from '../Component/Posts.js';
import App from '../App.js'

var seed = [
  ['Walter',	'arjun_auer@hotmail.com',	'8990 Vale Street Syosset',	'Eastfox',	'NY',	'11791',	'HouseKeeper',	'09-23-1917',	'5:20 PM'],
  ['Stanley',	'filomena35@hotmail.com',	'52 Rockwell St. Wantagh',	'Southbridge',	'NY',	'11793',	'Dog Walker',	'01-29-1983',	'4:14 PM'],
  ['Ella',	'kip35@hotmail.com',	'9399 Ocean Ave. South El Monte',	'Springwick',	'CA',	'91733',	'HouseKeeper',	'06-09-1976',	'9:06 AM']
]

describe('Components Render', () => {
  test('renders App component', () => {
    render(<App />);
  });
  test('renders Modal component', () => {
    render(<Modal />);
  });
  test('renders Posts component', () => {
    render(<Posts posts={seed}/>);
  });
  test('renders App component', () => {
    render(<App />);
  });
});
