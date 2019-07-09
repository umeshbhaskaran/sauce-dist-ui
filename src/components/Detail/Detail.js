import React, { Component }from 'react';
import {  
  Container, 
  Row, 
  Col,
} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';


const modalStyle = function() {
  // we use some psuedo random coords so nested modals
  // don't sit right on top of each other.

  return {
    border: '1px solid #e5e5e5',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    color: 'white',

  };
};


class Detail extends Component {
  render() {
  	const row = this.props.rowSelected
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={modalStyle()}
      >
        <Modal.Header closeButton style={{backgroundColor: '#333233'}}>
          <Modal.Title id="contained-modal-title-vcenter">
            Detail View
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: '#333233'}}>
        {row ?
	          <Container style={{backgroundColor: '#333233', overflow: 'hidden'}}>
	          	<Row style={{display: 'flex', flexWrap: 'wrap'}}>
	          	  <Col>
	          	    <Image src={row.thumbnail} style={{width: 380, height: 280}}/>
	          	  </Col>
	          	  <Col>
	          	  	<Row>
		          	  <Col>
		          	  	{Object.keys(row).map((key, index) => {
		          	  		return <p>{key + " : " + row[key]}</p>
		          	  	})}
		          	  </Col>
		          	  </Row>
		          	  <Row>
		          	  <Col>
		          	  	<p></p>
		          	  </Col>
		          	  </Row>
	          	  </Col>
	          	</Row>
	          </Container>
      	  : null
      	}
        </Modal.Body>
      </Modal>
    );
  }
}

export default Detail;