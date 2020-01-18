import React from 'react';
import Link from 'next/link';

import axios from 'axios';
import { baseUrl } from './config';

import './LiveSearch.scss';
import { FaSearch } from 'react-icons/fa';

interface State {
  query: string;
  value: string;
  fetchedData: any[];
  isLoading: boolean;
  msg: string;
  noResults: string;
  hideResults: boolean;
}

class LiveSearch extends React.Component<{}, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      query: '',
      value: '',
      fetchedData: [],
      isLoading: false,
      msg: '',
      noResults: '',
      hideResults: true,
    };
  }

  handleOnInputChange = e => {
    const query = e.target.value;
    this.setState({ query, isLoading: true, msg: '' }, () => {
      this.fetchLiveResults(query);
    });
  };

  shouldHideResults = bool => {
    this.setState({ hideResults: bool });
  };

  fetchLiveResults = query => {
    const url = `${baseUrl}/people/?search=${query}`;

    axios
      .get(url)
      .then(res => {
        this.setState({
          fetchedData: res.data.results,
          isLoading: false,
          noResults: res.data.results.length > 0 ? 'No results found' : '',
        });
      })
      .catch(err => {
        this.setState({ isLoading: false, msg: err.message });
      });
  };

  renderResults = () => {
    const { fetchedData } = this.state;
    if (fetchedData.length > 0 || !fetchedData) {
      return fetchedData.map(item => {
        return (
          <Link href="/detail" key={item.name}>
            <a className="resultItem">
              <div className="itemName">{item.name}</div>
              <div className="itemGender">{item.gender}</div>
            </a>
          </Link>
        );
      });
    }
  };

  render() {
    const { query, hideResults } = this.state;
    return (
      <div className="liveSearchWrapper">
        <input
          autoComplete="false"
          type="text"
          name="query"
          placeholder="Live search!"
          id="live-search-input"
          value={query}
          onClick={() => this.shouldHideResults(false)}
          onChange={this.handleOnInputChange}
          //   onBlur={() => this.shouldHideResults(true)}
        />
        <FaSearch size={20} />
        {!hideResults && (
          <div className="resultsContainer">{this.renderResults()}</div>
        )}
      </div>
    );
  }
}

export default LiveSearch;
