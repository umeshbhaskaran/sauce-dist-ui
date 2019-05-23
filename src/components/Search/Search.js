import React, { Component }from 'react';
import { 
  Button,
  InputGroup,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

const styles = {
  button: {
    borderRadius: 10, 
    color: 'white',
    display:'flex', 
    alignItems: 'center',
  },
  formGroup: {
    width: 800,
  },
  searchBar : {
    marginLeft: 20, 
  }
}


class SearchButton extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (event) => {
    this.props.searchAll();
  }

  render() {
    return(
      <Button 
      style={styles.button}
      variant="outline-secondary"
      onClick={this.handleClick}>
      {this.props.label}
      </Button>
    );
  }
}


class SearchByInput extends Component{

   handleChange = (event) => {
    this.props.handleInputChange(event.target.value);
   }

   handleSubmit = (event) => {
    this.props.handleInputSubmit(event); 
  } 

  handleClick = () => {
    this.props.searchAll();
  }

	render() {
		return(
			<FormGroup style={styles.formGroup}>
        <InputGroup className="mb-3">
          <SearchButton label={this.props.buttonLabel} searchAll={this.handleClick}/>
          <FormControl style={styles.searchBar}
            placeholder="Search for assets.."
            onChange={this.handleChange}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.handleSubmit(event);
              }
            }}
            value={this.props.searchTerm}
          /> 
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={this.handleSubmit}><i className="fa fa-search"></i></Button>
          </InputGroup.Append>
        </InputGroup>
      </FormGroup>
		);
	}
}

export default SearchByInput;