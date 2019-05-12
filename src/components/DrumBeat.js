import React, { Component } from 'react';
import './DrumBeat.css';

class Column extends Component {
  constructor() {
    super();
  }

  componentDidUpdate(prevProps) {
    const { playhead, sound, active, beatNumber } = this.props;
    if (prevProps.playhead !== playhead && playhead === beatNumber && active) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  toggleBeat(beatNumber, instrument, sound) {
    sound.currentTime = 0;
    sound.play();

    this.props.toggleBeat(beatNumber, instrument)
  }

  render() {
    const { playhead, active, sound, beatNumber, instrument } = this.props;

    let drumBeatClass = "drum-beat";

    if (playhead === beatNumber && active) {
      drumBeatClass += " highlight";
    }
    return <div className={drumBeatClass} onClick={() => this.toggleBeat(beatNumber, instrument, sound)}>
              {active ? "•" : ""}
      </div>
  }
}

export default Column;
