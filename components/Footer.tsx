import Link from 'next/link';

import './Footer.scss';
import { FaHome } from 'react-icons/fa';

const Footer = () => (
  <div className="footer">
    <Link href="/">
      <div className="homepageLink">
        <a>
          <FaHome size={25} />
        </a>
      </div>
    </Link>
    <p>Copyright © 2020. All rights reserved.</p>
  </div>
);

export default Footer;
