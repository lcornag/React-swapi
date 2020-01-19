import React from 'react';
import Link from 'next/link';

import axios from 'axios';
import { peopleUrl } from './config';

import './LiveSearch.scss';
import { FaSearch } from 'react-icons/fa';

interface LiveSearchState {
  query: string;
  value: string;
  fetchedData: any[];
  isLoading: boolean;
  msg: string;
  noResults: string;
  hideResults: boolean;
}

class LiveSearch extends React.Component<{}, LiveSearchState> {
  constructor(props: LiveSearchState) {
    super(props);

    this.state = {
      query: '',
      value: '',
      fetchedData: [],
      isLoading: false,
      msg: '',
      noResults: '',
      hideResults: false,
    };
  }

  handleOnInputChange = e => {
    const query = e.target.value;
    this.setState({ query, isLoading: true, msg: '' }, () => {
      // TODO: cancel pending requests while typing (axios cancel token);
      this.fetchLiveResults(query);
    });
  };

  hideResults = val => {
    this.setState({ hideResults: val });
  };

  fetchLiveResults = query => {
    const url = `${peopleUrl}?search=${query}`;

    axios
      .get(url)
      .then(res => {
        this.setState({
          fetchedData: res.data.results,
          noResults: res.data.results.length > 0 ? 'No results found' : '',
        });
      })
      .catch(e => {
        console.log(e.message);
      });
  };

  renderResults = () => {
    const { fetchedData } = this.state;
    if (fetchedData.length > 0) {
      return fetchedData.map((item, index) => {
        return (
          <Link
            href="/detail/[id]"
            as={`/detail/${item.url.match(/\d+/)}`}
            // item lacks id property
            key={index}
          >
            <a className="resultItem" onClick={() => this.hideResults(true)}>
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
          onChange={this.handleOnInputChange}
          onClick={() => this.hideResults(false)}
        />
        <FaSearch size={20} />
        {!hideResults && (
          // TODO: Hide absolute dropdown on click away,
          // behaviour collides with Link href
          <div className="resultsContainer">{this.renderResults()}</div>
        )}
      </div>
    );
  }
}

export default LiveSearch;
