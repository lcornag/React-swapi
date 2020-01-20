import Link from 'next/link';
import { Router } from 'next/router';

import Footer from '@components/Footer';
import LiveSearch from '@components/LiveSearch';
import History from '@components/History';

import './Header.scss';
import { FaHome, FaListUl } from 'react-icons/fa';

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
        <History />
      </div>
      <div className="searchbar">
        <LiveSearch />
      </div>
    </div>
  );
};

export default Header;
