import React from 'react';

import axios from 'axios';
import { peopleUrl } from './config';

import '@components/Detail.scss';

interface CharacterIdProp {
  characterSwapiId: string | string[];
}
interface CharacterState {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  films: string[];
  filmNames: string[];
  charData: boolean;
  charFilms: boolean;
}

class Detail extends React.Component<CharacterIdProp, CharacterState> {
  constructor(props: CharacterIdProp, state: CharacterState) {
    super(props, state);

    this.state = {
      name: '',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
      films: [],
      filmNames: [],
      charData: false,
      charFilms: false,
    };
  }
  componentDidMount() {
    const { characterSwapiId } = this.props;
    this.fetchData(characterSwapiId);
  }
  componentDidUpdate(prevProps) {
    const { characterSwapiId } = this.props;
    if (prevProps.characterSwapiId !== characterSwapiId) {
      //should show (non-developed yet) loader while !charData and/or !charFilms
      this.setState({ charData: false, charFilms: false });
      this.fetchData(characterSwapiId);
    }
  }
  fetchData(characterSwapiId) {
    axios
      .get(`${peopleUrl}${characterSwapiId}/`)
      .then(({ data }) => {
        this.setState({
          name: data.name,
          height: data.height,
          mass: data.mass,
          hair_color: data.hair_color,
          skin_color: data.skin_color,
          eye_color: data.eye_color,
          birth_year: data.birth_year,
          gender: data.gender,
          films: data.films,
        });
        // once data for char is available, display it
        this.setState({ charData: true });
        // and start getting the films
        return Promise.all(
          this.state.films.map(async film => {
            const res = await axios.get(film);
            return res.data.title;
          })
        );
      })
      .then(names => {
        // once we have the films, display them
        this.setState({ charFilms: true });
        this.setState({ filmNames: names });
      })
      .catch(e => console.log(e.message));
  }

  renderCharacterInfo() {
    const {
      name,
      height,
      hair_color,
      skin_color,
      eye_color,
      birth_year,
      gender,
    } = this.state;
    return (
      <div className="detailContainer">
        <div className="detailInfo">
          <p className="detailInfoName">{name}</p>
        </div>
        <div className="detailInfo">
          <p>height:</p>
          <p>{height}</p>
        </div>
        <div className="detailInfo">
          <p>hair color:</p>
          <p>{hair_color}</p>
        </div>
        <div className="detailInfo">
          <p>skin color:</p>
          <p>{skin_color}</p>
        </div>
        <div className="detailInfo">
          <p>eye color:</p>
          <p>{eye_color}</p>
        </div>
        <div className="detailInfo">
          <p>birth year:</p>
          <p>{birth_year}</p>
        </div>
        <div className="detailInfo">
          <p>gender</p>
          <p>{gender}</p>
        </div>
      </div>
    );
  }

  renderCharFilms() {
    const { filmNames } = this.state;
    return (
      <div className="filmContainer">
        {filmNames.map((film, index) => {
          return <p key={index}>{film}</p>;
        })}
      </div>
    );
  }

  render() {
    const { charData, charFilms } = this.state;
    return (
      <div className="detailWrapper">
        {charData && this.renderCharacterInfo()}
        {charData && <p className="filmTitle">Appears in: </p>}
        {charFilms && this.renderCharFilms()}
      </div>
    );
  }
}

export default Detail;
