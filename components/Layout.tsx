import Head from 'next/head';

import Footer from './Footer';
import Header from './Header';

import './Layout.scss';
import './index.scss';

const background = '/static/galaxyfaraway.jpg';

const Layout = props => (
  <div className="layout">
    <Head>
      <title> GOOD SWAPI </title>
    </Head>

    <Header />

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
