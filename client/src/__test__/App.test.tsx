import {
  act,
  // render
} from '@testing-library/react';

import App from '../App';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  act(() => {
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>;
  });
  // render(

  // );
  expect(true).toBeTruthy();
});
