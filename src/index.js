import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      cities: []
    }
  }

  onChange = (e) => {
    this.setState({text: e.target.value});

    fetch(`/city/search?text=${e.target.value}`).then(res => res.json()).then(({cities}) => {
      this.setState({cities});
    })
  }

  chooseHandler = () => {
    const city = this.state.cities[0];
    this.setState({text: city});

    this.props.chooseCityCallback(city);
  }

  render() {
    const {cities, text} = this.state;
    return (<div >
      < input="input" type="text" onChange={this.onChange} value={text}/>
      < div="div">
        {
          cities.length
            ? (< span onClick = {
              this.chooseHandler
            } > {
              cities[0]
            } < /span>
                ) : null
            }
        < /div>
          < /div>
            ); } } const Weather = props => props.weather ? ( < div > < div > {`country: ${props.weather.country}`}
            < /div>
              < div="div">
                {`temperature: ${props.weather.temperature}`}
                < /div>
                  < div="div">
                    {`cloud: ${props.weather.cloud}`}
                    < /div>
                      < div="div">
                        {`condition: ${props.weather.condition}`}
                        < /div>
                          < img="img" src={props.weather.conditionIcon}/>
                          < /div>
                            ) : null; class App extends React.Component {
                              constructor(props) {
                                super(props);

                                this.state = {
                                  weather: null
                                }
                              }
                              chooseCityCallback = (city) => {
                                fetch(`/weather?city=${city}`).then(res => res.json()).then(({weather}) => {
                                  this.setState({weather});
                                });
                              }

                              render() {
                                return (< div > <Search chooseCityCallback = {
                                  this.chooseCityCallback
                                } /> <Weather weather = {
                                  this.state.weather
                                } /> < /div>
        )
    }
}

                            class Man extends React.Component {
                              render() {
                                return (< div > < /div>
        );
    }
}
                            ReactDOM.render( < App / > , document.querySelector('#app'));
