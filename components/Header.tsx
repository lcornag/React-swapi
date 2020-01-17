import Link from 'next/link';

import Footer from '@components/Footer';

import './Header.scss';
import { FaHome } from 'react-icons/fa';
import { FaListUl } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="header">
      <Link href="/">
        <div className="homepageLink">
          <a>
            <FaHome size={25} />
          </a>
        </div>
      </Link>
      <Link href="/list">
        <div className="listLink">
          <a>
            <FaListUl size={25} />
          </a>
        </div>
      </Link>
      <div className="lastVisited">
        <FaHistory size={25} />
      </div>
      <div className="searchbar">
        <FaSearch size={25} />
        <input type="text" placeholder="Search!" />
      </div>
    </div>
  );
};

export default Header;
