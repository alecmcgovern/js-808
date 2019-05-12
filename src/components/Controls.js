import React, { Component } from 'react';
import Dropdown from './common/Dropdown';
import { Sequences } from '../Sequences';

import './Controls.css';

const BPM = Array.from({length: 40}, (v, k) => k+90);
const LoopLength = [4, 8, 16, 32];

class Controls extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  setBPM(bpm) {
    this.props.setTempo(bpm);
  }

  render() {
    const { playing, setSequence, setLength } = this.props;

    const bpmDropdownData = BPM.map((b) => {
      return { name: b, action: this.setBPM.bind(this, b) }
    })

    const sequenceDropdownData = Sequences.map((s) => {
      return { name: s.name, action: setSequence.bind(this, s.data) }
    })

    sequenceDropdownData.push({ name: "New Sequence", action: setSequence.bind(this, null) })
    console.log(sequenceDropdownData);
    const lengthDropdownData = LoopLength.map((l) => {
      return { name: l, action: setLength.bind(this, l) }
    })

    return (
      <div className="controls">
        <div className="play-pause-outer" onClick={() => this.props.playPause()}>
          <div className={playing ? "play-pause pause" : "play-pause"}></div>
        </div>
        <div className="dropdown-container">
          <Dropdown items={bpmDropdownData} default={120} />
          <Dropdown items={sequenceDropdownData} default={Sequences[0].name} />
          <Dropdown items={lengthDropdownData} default={16} />
        </div>
      </div>
    );
  }
}

export default Controls;
