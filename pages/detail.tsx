import React from 'react';
import Layout from '@components/Layout';

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return <Layout></Layout>;
  }
}
export default Detail;
