import React from 'react';
import Link from 'next/link';

import axios from 'axios';
import Layout from '@components/Layout';
import '@components/list.scss';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { peopleUrl } from '../components/config';

interface Character {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

interface ListProps {
  count: number;
  next: string | null;
  prev: string | null;
  results: Character[];
}

interface ListState {
  count: number;
  next: string;
  prev: string;
  results: Character[];
}

class List extends React.Component<ListProps, ListState> {
  // don't fully understand how getInitialProps work with a initial state
  static async getInitialProps(context) {
    const res = await axios.get(peopleUrl);
    const data = await res.data;

    return {
      count: data.count,
      next: data.next,
      prev: data.previous,
      results: data.results,
    };
  }
  constructor(props: ListState) {
    super(props);

    this.state = {
      count: props.count,
      next: props.next,
      prev: props.prev,
      results: props.results,
    };
  }
  componentDidMount() {
    this.setState({
      count: this.props.count,
      next: this.props.next,
      prev: this.props.prev,
      results: this.props.results,
    });
  }

  renderResults = () => {
    const { results } = this.state;

    if (results.length > 0) {
      return results.map((item: Character, index) => {
        return (
          <Link href="/detail/[name]" as={`/detail/${index + 1}`} key={index}>
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

  getPage(url) {
    axios.get(url).then(({ data }) => {
      this.setState({
        count: data.count,
        next: data.next,
        prev: data.previous,
        results: data.results,
      });
    });
    //not working
    window.scroll(0, 0);
  }

  render() {
    const { next, prev, count, results } = this.state;
    return (
      <Layout>
        <div className="listBody">
          <div className="btnGroup">
            <div
              className={prev ? 'btnActive' : 'btnUnactive'}
              onClick={() => this.getPage(prev)}
            >
              <FaChevronLeft size={35} />
            </div>
            <div
              className={next ? 'btnActive' : 'btnUnactive'}
              onClick={() => this.getPage(next)}
            >
              <FaChevronRight size={35} />
            </div>
          </div>

          <div className="scrollableWrapper">{this.renderResults()}</div>
        </div>
      </Layout>
    );
  }
}

export default List;
