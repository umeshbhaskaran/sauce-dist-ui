import React, { Component }from 'react';
import Select from 'react-select';


const colourStyles = {
  control: styles => ({
    ...styles,
   backgroundColor: "#222323",
   fontSize: 10,
 }),
  option:  styles => {
    return {
      ...styles,
      backgroundColor: '#222323',
      fontSize: 12,
    }
  },
  menuList: styles => ({ ...styles, backgroundColor: "#222323", height:250, overflow: 'auto'}),
};

class Filter extends Component {

  handleChange = (selected) => {
    this.props.handleOptionsChange(selected);
  }
  
  render() {

    return (
      <div style={{height: '30%', backgroundColor: "#222322", marginBottom: 10}}>
      <Select
      className="Over"
        closeMenuOnSelect={true}
        defaultValue={''}
        isMulti
        options={this.props.options}
        styles={colourStyles}
        placeholder={this.props.label + '...'}
        onChange={this.handleChange}
        value={this.props.displayOpts}
      />
      </div>
    );
  }
}

export default Filter;