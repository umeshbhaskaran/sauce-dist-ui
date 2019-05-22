import React, { Component }from 'react';
import { 
  Container, 
  Row, 
  Col, 
} from 'react-bootstrap';
import Logo from '../../images/Logo';
import SearchByInput from '../Search/Search' 
import Filter from '../Filter'
import Result from '../Result'
import { departments, locations, resolutions, assets } from "../../data/data";

import './Sauce.css';


class Sauce extends Component {
  constructor(props){
    super(props);
    
    this.state= {
      searchTerm: '',
      searchResult: [],
      departments: [],
      deptOpts: null,
      deptLocs: null,
      deptReslns: null,
      locations: [],
      resolutions: [],
      result: [],
      data: []
    }
  }

  resetValues = () => {
    this.setState({
      searchTerm: '',
      departments: [],
      locations: [],
      resolutions: [],
      deptOpts: null,
      deptLocs: null,
      deptReslns: null,
      searchResult: [],
    })
  }

  handleInputChange = (value) => {
    console.log(value)
    this.setState({searchTerm: value});
  }

  handleInputSubmit = (event) => {
    const assetMatch = (asset) => {
      return asset.name.includes(this.state.searchTerm)  || asset.tags.includes(this.state.searchTerm)
    }
    const updatedResult = assets.filter(assetMatch)
    this.setState({
      searchResult: updatedResult,
      result: updatedResult
    }, this.displayResults)
    event.preventDefault()
  }

  searchAll = (event) => {
    this.resetValues();
    this.setState({
      searchResult: assets,
      result: assets
    })
  }

  setDepartments = (depts) => {

    const selectedDeparts = []

    depts.forEach (dept => {
      selectedDeparts.push(dept.value)
    })

    this.setState({departments: [...selectedDeparts]}, this.displayResults)
    this.setState({deptOpts: depts})
  }

  setLocations = (locs) => {
    const selectedlocs = []

    locs.forEach (loc => {
      selectedlocs.push(loc.value)
    })
    this.setState({locations: [...selectedlocs]}, this.displayResults)
    this.setState({deptLocs: locs})
  }

  setResolutions = (reslns) => {
    const selectedReslns = []

    reslns.forEach (resl => {
      selectedReslns.push(resl.value)
    })
    this.setState({resolutions: [...selectedReslns]}, this.displayResults)
    this.setState({deptReslns: reslns})
  }

  displayResults = () => {
    let filteredResult = []

    const departmentMatch = (asset) => {
      return this.state.departments.indexOf(asset.type) > -1;
    }

    const locationMatch = (asset) => {
      return this.state.locations.indexOf(asset.location) > -1;
    }

    const resolutionMatch = (asset) => {
      console.log('resolutions')
      return true
    }


    filteredResult = this.state.departments.length > 0 ? this.state.searchResult.filter(departmentMatch): this.state.searchResult
    console.log(filteredResult)

    filteredResult = this.state.locations.length > 0 ? filteredResult.filter(locationMatch) : filteredResult
    console.log(filteredResult)

    filteredResult = this.state.resolutions.length > 0 ? filteredResult.filter(resolutionMatch) : filteredResult
    console.log(filteredResult)

    this.setState({result: filteredResult})
  }

  componentDidMount(){
    console.log('Mounting bro..')
    const url = 'https://api.imgur.com/3/gallery/search/top/0?q=cats'
    fetch(url, {
      method: 'GET', 
      headers: {
        'Authorization': 'Client-ID 8eaeb0e52dd415e'
      }
    })
    .then(response => {return response.json()})
    .then(data => {this.setState({data})});
    console.log('data' + this.state.data)
    }
    

  render() {
    return (
      <Container fluid="false" style={{oveflow: 'hidden'}}>
        <Row>
          <Col xs={1} sm={1} md={2} className="sauce-logo-layout" >
            <Logo />
          </Col>
          <Col xs={5} sm={11} md={10} className="search-layout">
            <SearchByInput 
              buttonLabel={"See All"} 
              handleInputChange={this.handleInputChange} 
              handleInputSubmit={this.handleInputSubmit}
              searchAll={this.searchAll}
              searchTerm={this.state.searchTerm}
              resultCount={this.state.result.length}/>
          </Col>

        </Row>

        <Row style={{height: '90vh', overflow: 'hidden'}}>
          <Col xs={2} sm={2} md={3} style={{overflow: 'hidden'}}> 
            <p style={{fontSize: 18, color: '#f98e40'}}>Filters</p>
            <Filter label={'departments'} options={departments} displayOpts={this.state.deptOpts} handleOptionsChange={this.setDepartments}/>
            <Filter label={'locations'} options={locations} displayOpts={this.state.deptLocs} handleOptionsChange={this.setLocations}/>
            <Filter label={'resolutions'} options={resolutions} displayOpts={this.state.deptReslns} handleOptionsChange={this.setResolutions}/>
          </Col>
          <Col xs={4} sm={9} md={9}>
            <Result data={this.state.result}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sauce;