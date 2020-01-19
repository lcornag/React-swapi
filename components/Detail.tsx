import React from 'react';

import axios from 'axios';
import { peopleUrl } from './config';

import './Detail.scss';

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
  homeworld: string;
  films: string[];
  filmNames: string[];
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
      homeworld: '',
      films: [],
      filmNames: [],
    };
  }
  async componentDidMount() {
    const { characterSwapiId } = this.props;
    await this.getCharacterInfo(characterSwapiId);
  }
  getCharacterInfo(id) {
    if (id) {
      return axios
        .get(`${peopleUrl}${id}/`)
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
            homeworld: data.homeworld,
            films: data.films,
          });
        })
        .catch(e => console.log(e.message));
    }
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
      homeworld,
    } = this.state;
    return (
      <div className="detailContainer">
        <div className="detailInfo">{name}</div>
        <div className="detailInfo">{height}</div>
        <div className="detailInfo">{hair_color}</div>
        <div className="detailInfo">{skin_color}</div>
        <div className="detailInfo">{eye_color}</div>
        <div className="detailInfo">{birth_year}</div>
        <div className="detailInfo">{gender}</div>
      </div>
    );
  }

  getCharacterFilms(films) {
    const promise = Promise.all(
      films.map(async film => {
        const res = await axios.get(film);
        return res.data.title;
      })
    ).then(names => {
      console.log(names);
      return names;
    });
    return promise;
  }

  render() {
    const { films, filmNames } = this.state;
    const a = this.getCharacterFilms(films);
    return (
      <div className="detailWrapper">
        {this.renderCharacterInfo()}
        {/* {this.renderCharFilms(films, filmNames)} */}
      </div>
    );
  }
}

export default Detail;
