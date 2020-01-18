import React from 'react';
import Link from 'next/link';

import axios from 'axios';
import Layout from '@components/Layout';

import '../components/list.scss';
import { peopleUrl } from '../components/config';

interface Character {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

interface DetailProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

interface DetailState {
  count: number;
  next: string;
  previous: string;
  results: Character[];
}

class Detail extends React.Component<DetailProps, DetailState> {
  // don't fully understand how getInitialProps work with an initial state
  static async getInitialProps(context) {
    const res = await axios.get(peopleUrl);
    const data = await res.data;

    return {
      count: data.count,
      next: data.next,
      previous: data.previous,
      results: data.results,
    };
  }
  constructor(props: DetailState) {
    super(props);

    this.state = {
      count: 0,
      next: '',
      previous: '',
      results: [],
    };
  }

  renderResults = () => {
    const { results } = this.props;
    if (results.length > 0) {
      return results.map((item: Character, index) => {
        return (
          <Link href="/detail/[name]" as={`/detail/${item.name}`} key={index}>
            <a className="listItem">
              <div className="itemData">
                <p className="listItemName">{item.name}</p>
                <div className="listItemData">
                  <p className="listItemTitle">height:</p>
                  <p className="listItemStat">{item.height}cm</p>
                </div>
                <div className="listItemData">
                  <p className="listItemTitle">mass:</p>
                  <p className="listItemStat">{item.mass}kg</p>
                </div>
                <div className="listItemData">
                  <p className="listItemTitle">gender:</p>
                  <p className="listItemStat">{item.gender}</p>
                </div>
              </div>
            </a>
          </Link>
        );
      });
    }
  };

  render() {
    return (
      <Layout>
        <div className="listBody">
          {/* <div className="navButtons">asd</div> */}
          <div className="scrollableWrapper">{this.renderResults()}</div>
        </div>
      </Layout>
    );
  }
}

export default Detail;
