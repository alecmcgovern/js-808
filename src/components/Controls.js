import React, { Component } from 'react';
import Dropdown from './common/Dropdown';
import { Sequences } from '../Sequences';

import './Controls.css';

const BPM = Array.from({length: 61}, (v, k) => k+80);
const LoopLength = [4, 8, 16, 32];

class Controls extends Component {
  setBPM(bpm) {
    this.props.setTempo(bpm);
  }

  render() {
    const { playing, setSequence, setLength } = this.props;

    const bpmDropdownData = BPM.map((b) => {
      return { name: `${b} bpm`, action: this.setBPM.bind(this, b) }
    })

    const sequenceDropdownData = [];
    sequenceDropdownData.push({ name: "New Sequence", action: setSequence.bind(this, null) })
    
    Sequences.forEach((s) => {
      sequenceDropdownData.push({ name: s.name, action: setSequence.bind(this, s.data) })
    })

    const lengthDropdownData = LoopLength.map((l) => {
      return { name: `${l} beats`, action: setLength.bind(this, l) }
    })

    return (
      <div className="controls">
        <div className="play-pause-outer" onClick={() => this.props.playPause()}>
          <div className={playing ? "play-pause pause" : "play-pause"}></div>
        </div>
        <div className="dropdown-container">
          <Dropdown items={bpmDropdownData} default={"80 bpm"} />
          <Dropdown items={sequenceDropdownData} default={Sequences[0].name} />
          <Dropdown items={lengthDropdownData} default={"16 beats"} />
        </div>
      </div>
    );
  }
}

export default Controls;
