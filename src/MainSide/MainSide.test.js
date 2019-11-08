import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainSide from './MainSide';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <MainSide />
  </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
