import React, { Component } from 'react';
import Column from './Column';
import { Drums } from '../Drums'

import './Grid.css';

class Grid extends Component {
  render() {
    const { length, playhead, sequence, toggleBeat, setPlayhead, playing } = this.props;
    
    return (
      <div className="grid">
        <div className="instrument-names">
          {
            Object.keys(Drums).map((key) => {
              return <div key={key}>{key}</div>
            })
          }
        </div>
        {
          [...Array(length)].map((e, i) => {
            return <Column 
                      key={i}
                      playhead={playhead}
                      beatNumber={i}
                      playing={playing}
                      sequence={sequence}
                      className={playhead === i ? "column active" : "column"}
                      toggleBeat={(bt, inst) => toggleBeat(bt, inst)}
                      setPlayhead={(playhead) => setPlayhead(playhead)}
                    >

                    </Column>
          })
        }
      </div>
    );
  }
}

export default Grid;
