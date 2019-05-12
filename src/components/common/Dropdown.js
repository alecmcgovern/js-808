import React from 'react';

import './Dropdown.css';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
      open: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    if (this.props.default) {
      this.props.items.forEach((item, index) => {
        if (item.name === this.props.default) {
          this.setState({ selected: index });
        }
      })
    }
  }

  componentDidUpdate() {
    if (this.state.open) {
      document.addEventListener('click', this.handleClick);
    } else {
      document.removeEventListener('click', this.handleClick);  
    }
  }

  open(e) {
    if (!this.state.open) {
      e.stopPropagation();
      this.setState({ open: true });  
    }
  }

  handleClick() {
    if (this.state.open) {
      this.setState({ open: false });
    }
  }

  selectItem(e, item, index) {
    e.stopPropagation();

    this.setState({ selected: index });
    item.action();
  }

  render() {
    const { items } = this.props;
    const { open, selected } = this.state;

    return (
      <div className="dropdown" ref={dropdown => (this.dropdown = dropdown)}>
        <div onClick={this.open}>{`${items[selected].name} ⌄`}</div>
        {
          open ?
          <div className="dropdown-items">
            {
              items.map((item, index) => {
                          if (index !== selected) {
                            return (
                              <div className="dropdown-item" key={index} onClick={(e) => this.selectItem(e, item, index)}>
                                {item.name}
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })
            }
          </div>
          :
          null
        }
      </div>
    );
  }
}
