import Head from 'next/head';

import Footer from './Footer';
import Header from './Header';

import './index.scss';
import './Layout.scss';

const background = '/static/galaxyfaraway.jpg';

const Layout = props => (
  <div className="layout">
    <Header />
    <Head>
      <title> GOOD SWAPI </title>
    </Head>

    <div
      className="content"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {props.children}
    </div>

    <Footer />
  </div>
);

export default Layout;
