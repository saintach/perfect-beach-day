import { render, cleanup } from '@testing-library/react';
import App from './App';
import React from 'react';

afterEach(cleanup);

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});