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

const PATH_BASE = 'https://api.imgur.com/3/gallery'
const PATH_SEARCH = '/search/top/'
const PARAM_SEARCH = 'q='

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
      data: [],
      page: 0,
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
      page: 0
    })
  }

  handleInputChange = (value) => {
    this.setState({searchTerm: value});
  }

  handleInputSubmit = (event) => {
    // const assetMatch = (asset) => {
    //   return asset.name.includes(this.state.searchTerm)  || asset.tags.includes(this.state.searchTerm)
    // }
    // const updatedResult = assets.filter(assetMatch)
    // this.setState({
    //   searchResult: updatedResult,
    //   result: updatedResult
    // }, this.displayResults)

    this.setState({searchResult: [], page: 0})
    this.fetchResults(this.state.searchTerm)
    event.preventDefault()
  }

  searchAll = (event) => {
    this.resetValues();
    this.fetchResults('rats')
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
    console.log('display')
    console.log(this.state.departments.length)
    console.log(this.state.searchResult)

    const departmentMatch = (asset) => {
      console.log('bba be raibra')
      return this.state.departments.indexOf(asset.type) > -1;
    }

    const locationMatch = (asset) => {
      return this.state.locations.indexOf(asset.location) > -1;
    }

    const resolutionMatch = (asset) => {
      return true
    }


    filteredResult = this.state.departments.length > 0 ? this.state.searchResult.filter(departmentMatch): this.state.searchResult
    filteredResult = this.state.locations.length > 0 ? filteredResult.filter(locationMatch) : filteredResult
    filteredResult = this.state.resolutions.length > 0 ? filteredResult.filter(resolutionMatch) : filteredResult

    this.setState({result: filteredResult})
    console.log('display end')
  }

  searchTopResults(result) {
    const matchImage = (res) => {
      return res.is_album === false && res.nsfw === false && res.animated === false
    }
    const filteredResult = result.data.filter(matchImage)

    const typeMap = {
      0: 'comp',
      1: 'rig',
      2: 'anim',
      3: 'model',
      4: 'light',
      5: 'prep',
      6: 'build',
      7: 'fx',
    }
    const locationMap ={
      0: 'london',
      1: 'vancouver',
      2: 'montreal',
      3: 'mumbai',
      4: 'chennai',
      5: 'singapore',
    }
    const enrichedData = filteredResult.map((res, index) => {
      let imgDate = new Date(res.datetime)
      return {
        name: res.title, 
        type: typeMap[index % 8], 
        date: imgDate.toDateString(), 
        location: locationMap[index % 6], 
        tags: res.tags.map(tag => {return tag.name}), 
        thumbnail: res.link
    }})

    const updatedSearchResult = [
    ...this.state.searchResult,
    ...enrichedData
    ]
    this.setState({
      searchResult: updatedSearchResult,
      result: updatedSearchResult
    }, this.displayResults)
  }

  fetchResults(searchTerm, page=0){
    console.log(searchTerm)
    console.log(page)
    console.log('fetch')
    const url = `${PATH_BASE}${PATH_SEARCH}${page}?${PARAM_SEARCH}${searchTerm}`
    fetch(url, {
      method: 'GET', 
      headers: {
        'Authorization': 'Client-ID 8eaeb0e52dd415e'
      }
    })
    .then(response => {return response.json()})
    .then(result => {this.searchTopResults(result)})
    .catch(err => {console.log(err)});
    }

  componentDidMount(){
    this.fetchResults(this.state.searchTerm)
  }

  fetchMoreData = (newPage) => {
    this.setState({page: newPage})
    this.fetchResults(this.state.searchTerm, newPage)
  }

  render() {
    return (
      <Container fluid="false" style={{height: '100%'}}>
        <Row>
          <Col xs={2} sm={2} md={3} className="sauce-logo-layout" >
            <Logo />
          </Col>
          <Col xs={4} sm={9} md={8} className="search-layout">
            <SearchByInput 
              buttonLabel={"See All"} 
              handleInputChange={this.handleInputChange} 
              handleInputSubmit={this.handleInputSubmit}
              searchAll={this.searchAll}
              searchTerm={this.state.searchTerm}
              resultCount={this.state.result.length}/>
          </Col>
        </Row>

        <Row style={{overflow: 'hidden', display: 'flex', height: '100%'}}>
          <Col xs={2} sm={2} md={3} style={{flex: 1, overflow: 'hidden'}}> 
            <p style={{fontSize: 18, color: '#f98e40'}}>Filters</p>
            <Filter label={'departments'} options={departments} displayOpts={this.state.deptOpts} handleOptionsChange={this.setDepartments}/>
            <Filter label={'locations'} options={locations} displayOpts={this.state.deptLocs} handleOptionsChange={this.setLocations}/>
            <Filter label={'resolutions'} options={resolutions} displayOpts={this.state.deptReslns} handleOptionsChange={this.setResolutions}/>
          </Col>
          <Col xs={4} sm={9} md={9} style={{overflow: 'hidden', flex: 1}}>
            <Result data={this.state.result} fetchMoreData={this.fetchMoreData} page={this.state.page}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sauce;