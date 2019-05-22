import React, { Component }from 'react';
import {  
  Card,
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

const backdropStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'green',
  opacity: 0.5
};




class Detail extends Component {
  renderBackdrop(props) {
	return <div {...props} style={backdropStyle} />;
  }
  render() {
  	const row = this.props.rowSelected
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={modalStyle()}
        renderBackdrop={this.renderBackdrop}
      >
        <Modal.Header closeButton style={{backgroundColor: '#333233'}}>
          <Modal.Title id="contained-modal-title-vcenter">
            Detail View
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor: '#333233'}}>
        {row ?
	      <Card style={{backgroundColor: '#333233'}}>
	        <Card.Body style={{border: 'none'}}> 
	          <Card.Text>
	          <Container>
	          	<Row>
	          	  <Col>
	          	    <Image src={row.thumbnail}/>
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
	          </Card.Text>
	        </Card.Body>
      	  </Card>
      	  : null
      	}
        </Modal.Body>
      </Modal>
    );
  }
}

export default Detail;