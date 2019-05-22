import React, { Component }from 'react';
import { 
  Button,
  Card,
} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Detail from './detail';
import './Result.css';
import 'font-awesome/css/font-awesome.min.css';


class ListTable extends Component {

  constructor(props){
    super(props);
    this.state = { 
      modalShow: false,
      rowSelected: null
    }  
  }

    rowClassNameFormat = (row, rowIdx) => {
       return 'selectRowProp';
    };

    imageFormatter = (cell, row) => {
      console.log(cell)
      return (<Image src={cell} thumbnail style={{width: 40}}/>)
    };

    onRowDoubleClick = (row) => {
      this.setState({ modalShow: true, rowSelected: row })
    }

    modalClose = () => this.setState({ modalShow: false });

  render() {
    const selectRowProp = {
      color: 'white',
    };

    const options = {
      onRowDoubleClick: this.onRowDoubleClick
    };

    return(
      <div>
      <BootstrapTable 
      data={this.props.data}
      bordered={ false }
      containerStyle={{ background: "#222322", height: '900px', overflow: 'hidden', display: 'flex'} }
      trClassName={this.rowClassNameFormat} 
      headerStyle={{background: '#333233'}}
      options={ options }
      hover={ true }
      version='4'>
        <TableHeaderColumn dataField='thumbnail' dataFormat={this.imageFormatter} className="column-select">Thumbnail</TableHeaderColumn>
        <TableHeaderColumn isKey={ true } dataSort={true} dataField='name' className="column-select">Asset Name</TableHeaderColumn>
        <TableHeaderColumn  dataSort={true} dataField='type' className="column-select">Asset Type</TableHeaderColumn>
        <TableHeaderColumn  dataSort={true} dataField='date' className="column-select">Date</TableHeaderColumn>
        <TableHeaderColumn  dataSort={true} dataField='location' className="column-select">Location</TableHeaderColumn>
        <TableHeaderColumn dataField='tags' className="column-select">Tags</TableHeaderColumn>
      </BootstrapTable>
      <Detail 
        show={this.state.modalShow}
        onHide={this.modalClose}
        rowSelected={this.state.rowSelected}
      />
      </div>
    );
  }
}


class ListGrid extends Component {

   constructor(props){
    super(props);
    this.state = { 
      modalShow: false,
      rowSelected: null
    }
  }

  onRowDoubleClick = (asset) => {
      this.setState({ modalShow: true, rowSelected: asset })
    }

  modalClose = () => this.setState({ modalShow: false });

  render() {
    
    return(
     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'left',
     flexWrap: 'wrap', overflow: 'auto', height: '900px',
     borderTop: '1px solid white'}}>  
     {this.props.data.map(asset=> 
        <Card style={{ display: 'flex', height: 180, width: 150, boxSizing: 'border-box', 
        backgroundColor: '#313233', border: '1px groove white', objectFit: 'cover', marginTop: 10}}
        onDoubleClick={this.onRowDoubleClick.bind(this, asset)}>
        <Card.Img variant="top" src="./default-thumbnail.png" style={{height: 120, width: 150}}/>
        <Card.Body> 
          <Card.Text style={{marginTop: -20, textAlign: 'center'}}>
            {asset.name}<br/>
            {asset.type}<br/>
          </Card.Text>
        </Card.Body>
      </Card>
      )}
    <Detail 
      show={this.state.modalShow}
      onHide={this.modalClose}
      rowSelected={this.state.rowSelected}
    />
    </div>
    );
  }
}

class Result extends Component {
  
  constructor(props) {
    super(props);
    this.handleListView.bind(this)
    this.handleGridView.bind(this)
  }

  state = {
    isList: true,
    isGrid: false,
  }

  handleListView = (event) => {
    this.setState({isList: !this.state.isList})
    this.setState({isGrid: !this.state.isGrid})
  }
  handleGridView = (event) => {
    this.setState({isGrid: !this.state.isGrid})
    this.setState({isList: !this.state.isList})
  }

  render() {
    return (
    <div>
      <div style={{fontSize: 18, font: 'Ariel', color: '#f98e40', marginBottom: 20}}>
      Results
      <Button variant="secondary pull-right" onClick={this.handleGridView} disabled={this.state.isGrid}> <i className="fa fa-th-large"></i> </Button>
      <Button variant="secondary pull-right" onClick={this.handleListView} disabled={this.state.isList}> <i className="fa fa-th-list"></i> </Button>

      </div>
      {this.props.data.length > 0 && this.state.isList ? <ListTable data={this.props.data}/> : <ListGrid data={this.props.data}/>}
    </div>
    );
  }
}

export default Result;