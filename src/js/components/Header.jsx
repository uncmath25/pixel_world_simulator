import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';

import '../../css/header.css';

const LOGO = require('../../assets/globe.png');
const TITLE = 'Pixel World Simulator';

export class Header extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isPaused !== prevState.isPaused) {
      return { isPaused: nextProps.isPaused};
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {isPaused: props.isPaused};
  }

  render() {
    return (
      <Navbar className='custom-navbar' variant='dark' expand='lg' collapseOnSelect>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={LOGO}
            width='30'
            height='30'
            className='d-inline-block align-top'
          />
          &nbsp; &nbsp;
          {TITLE}
        </Navbar.Brand>
        <Nav className='ml-auto'>
          <Button className='custom-navbar-button' variant={this.state.isPaused ? 'success' : 'danger'}
                  onClick={() => {if (this.state.isPaused) {this.props.update();}}}>
            Update
          </Button>
          <Button className='custom-navbar-button' variant={this.state.isPaused ? 'success' : 'danger'}
                  onClick={() => { this.props.changePaused(!this.state.isPaused); this.setState({isPaused: !this.state.isPaused}); } }>
            {this.state.isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button className='custom-navbar-button' variant='danger' onClick={() => this.props.restart()}>
            Restart
          </Button>
        </Nav>
      </Navbar>
    );
  }
}
