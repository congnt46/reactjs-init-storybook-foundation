import React from 'react';
// import { render, shallow } from '@testing-library/react';
import { shallow } from 'enzyme';

import App from './App';

test('renders learn react link', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state('authData')).toBe({});
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
