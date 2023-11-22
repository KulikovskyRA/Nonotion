import Navbar from './Navbar';

import '@testing-library/jest-dom';
import {
  render,
  screen,
  cleanup,
  waitFor,
  //   renderHook,
  //  fireEvent
} from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from '../../redux/store.tsx';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

describe('Проверка Navbar', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(cleanup);

  test('Не крашится', async () => {
    const div = document.createElement('div');
    const root = createRoot(div);

    await waitFor(() =>
      root.render(
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </Provider>
      )
    );
  });

  test('Проверка наличия кнопок входа и регистрации', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const authNone = screen.queryByTestId('authNone');
    const authYes = screen.queryByTestId('authYes');

    expect(authNone).toBeInTheDocument();
    expect(authYes).not.toBeInTheDocument();
  });

  //   test('Проверка наличия кнопок входа и регистрации', () => {
  //     render(
  //       <Provider store={store}>
  //         <BrowserRouter>
  //           <Navbar />
  //         </BrowserRouter>
  //       </Provider>
  //     );

  //     function Wrapper(props: { children: ReactNode }) {
  // const queryClient=

  //       return <Provider store={store}>{props.children}</Provider>;
  //     }

  //     renderHook(
  //       () => {
  //         const [login] = useLoginMutation();
  //         login({ name: '12345', password: '12345' });
  //       },
  //       { wrapper: Wrapper }
  //     );

  //     const authNone = screen.queryByTestId('authNone');
  //     const authYes = screen.queryByTestId('authYes');
  //     // console.log(authNone, authYes);
  //     expect(authNone).toBeInTheDocument();
  //     expect(authYes).not.toBeInTheDocument();
  //   });
});
