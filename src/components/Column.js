import React, { Component } from 'react';
import DrumBeat from './DrumBeat';
import { Drums } from '../Drums';

import './Column.css';

class Column extends Component {
  constructor() {
    super();
  }

  setSample(drum, audio) {
    audio.play();
  }

  render() {
    const { length, playhead, beatNumber, sequence, toggleBeat, setPlayhead } = this.props;
    return (
      <div className={playhead === beatNumber ? "column active" : "column"}>
        <div className="beat-number" onClick={() => setPlayhead(beatNumber)}>{beatNumber + 1}</div>
        {
          Object.entries(Drums).map(([key, value]) => {
            return <DrumBeat 
              key={key}
              beatNumber={beatNumber}
              active={sequence[key][beatNumber] === 1}
              instrument={key}
              sound={value}
              playhead={playhead}
              toggleBeat={(bt, inst) => toggleBeat(bt, inst)}
            />
          })
        }
      </div>
    );
  }
}

export default Column;
