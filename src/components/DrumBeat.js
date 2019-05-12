import React, { Component } from 'react';
import './DrumBeat.css';

class Column extends Component {
  componentDidUpdate(prevProps) {
    const { playhead, sound, active, beatNumber, playing } = this.props;
    if ((prevProps.playhead !== playhead || prevProps.playing !== playing)
        && playhead === beatNumber 
        && active && playing) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  toggleBeat(beatNumber, instrument, sound) {
    if (!this.props.active) {
      sound.currentTime = 0;
      sound.play();
    }

    this.props.toggleBeat(beatNumber, instrument)
  }

  render() {
    const { playhead, active, sound, beatNumber, instrument, playing } = this.props;

    let drumBeatClass = "drum-beat";

    if (playhead === beatNumber && active && playing) {
      drumBeatClass += " highlight";
    }
    return <div className={drumBeatClass} onClick={() => this.toggleBeat(beatNumber, instrument, sound)}>
              {active ? <div className="active-indicator"></div> : ""}
      </div>
  }
}

export default Column;
