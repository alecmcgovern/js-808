import React, { Component } from 'react';
import Controls from './components/Controls';
import Grid from './components/Grid';
import { Drums } from './Drums';
import { Sequences } from './Sequences';

import './App.css';

const STARTING_LENGTH = 16;
const STARTING_TEMPO = 80;

class App extends Component {
  constructor() {
    super();

    let emptySequence = {};
    
    Object.keys(Drums).forEach((key) => {
      emptySequence[key] = new Array(STARTING_LENGTH).fill(0)
    })

    this.state = {
      tempo: STARTING_TEMPO,
      length: STARTING_LENGTH,
      playhead: 0,
      playing: false,
      sequence: Sequences[0].data
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  playPause(reset) {
    if (reset) {
      console.log("resetting")
      this.setState({ playing: false, playhead: 0 })
    } else {
      this.setState({ playing: !this.state.playing })

      if (this.state.playing) {
        this.setState({ playing: false })
      } else {
        this.setState({ playing: true })

        setTimeout(() => {
          this.playBeat()
        }, 60000/(this.state.tempo*4))
      }
    }
  }

  playBeat() {
      this.setState({
        playhead: (this.state.playhead + 1) % this.state.length
      })

      this.timeout = setTimeout(() => {
        if (this.state.playing) {
          this.playBeat();
        }
      }, 60000/(this.state.tempo*4))
  }

  setSequence(sequence) {
    if (sequence) {
      this.setState({
        sequence
      })
    } else {
      let emptySequence = {};

      Object.keys(Drums).forEach((key) => {
        emptySequence[key] = new Array(this.state.length).fill(0)
      })

      this.setState({ sequence: emptySequence });
    }
  }

  toggleBeat(beat, instrument) {
    const { sequence } = this.state;

    let newSequence = this.state.sequence;
    newSequence[instrument][beat] = (sequence[instrument][beat] + 1) % 2;

    this.setState({
      sequence: newSequence
    })
  }

  setLength(l) {
    const { sequence } = this.state;

    let newSequence = sequence;

    if (sequence.kick.length < l) {
      Object.keys(sequence).forEach((key) => {
        const fill = new Array(l - sequence[key].length).fill(0);
        newSequence[key] = sequence[key].concat(fill);
      })
    }
    this.setState({
      sequence: newSequence,
      length: l
    })
  }

  render() {
    const { length, playing, playhead, sequence } = this.state;

    return (
      <div className="App">
        <h1 className="title">JS 808</h1>
        <div className={length > 16 ? "container large" : "container"}>
          <Controls 
            playing={playing}
            playPause={(reset) => this.playPause(reset)}
            setTempo={(tempo) => this.setState({tempo})}
            setSequence={(sequence) => this.setSequence(sequence)}
            setLength={(length) => this.setLength(length)}
          />
          <Grid 
            length={length}
            playhead={playhead}
            playing={playing}
            sequence={sequence}
            setPlayhead={(playhead) => this.setState({playhead})}
            toggleBeat={(bt, inst) => this.toggleBeat(bt, inst)}
          />
        </div>
      </div>
    );
  }
}

export default App;
