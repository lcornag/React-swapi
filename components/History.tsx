import React from 'react';
import Router from 'next/router';

import '@components/History.scss';
import { FaHistory } from 'react-icons/fa';

interface HistoryState {
  history: string[];
  open: boolean;
}

class History extends React.Component<{}, HistoryState> {
  constructor(props: HistoryState) {
    super(props);

    this.state = {
      history: [],
      open: false,
    };
  }
  componentDidMount() {
    Router.events.on('routeChangeStart', url => {
      if (url.includes('detail')) {
        this.setState({ history: [...this.state.history, url] });
      }
    });
  }

  openRegistry() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { open, history } = this.state;
    // Header re-renders on loading dynamic routes,
    // so the previous values are lost.
    // only the actual one is kept

    return (
      <div className="historyContainer">
        <FaHistory size={25} onClick={() => this.openRegistry()} />
        {open && <div className="historyRegistry">{history}</div>}
      </div>
    );
  }
}

export default History;
