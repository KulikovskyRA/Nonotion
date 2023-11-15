import ReactDOM from 'react-dom';

import FormLogin from './FormLogin';

import {
  render,
  screen,
  cleanup,
  fireEvent,
  // act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.tsx';
import { BrowserRouter } from 'react-router-dom';

import renderer from 'react-test-renderer';

function accountModalHandler(state: boolean, type: string) {
  return { state, type };
}

describe('Проверка компонента FormLogin', () => {
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

  test('Не крашится', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler} />
        </BrowserRouter>
      </Provider>,
      div
    );
  });

  test('Проверка наличия формы', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler}></FormLogin>
        </BrowserRouter>
      </Provider>
    );
    const Form = screen.getByTestId('Form');
    expect(Form).toBeInTheDocument();
  });

  test('Проверка наличия инпутов логина, пароля', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler}></FormLogin>
        </BrowserRouter>
      </Provider>
    );

    const inputLogin = screen.getByPlaceholderText('Логин');
    expect(inputLogin).toBeInTheDocument();
    const inputPassword = screen.getByPlaceholderText('Пароль');
    expect(inputPassword).toBeInTheDocument();
  });

  test('Проверка наличия кнопок', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler}></FormLogin>
        </BrowserRouter>
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  test('Alert должен быть невидимым', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler}></FormLogin>
        </BrowserRouter>
      </Provider>
    );

    const alert = screen.queryByTestId('alert');
    expect(alert).not.toBeInTheDocument();
  });

  test('Alert становится видимым по ошибке', async () => {
    // const mockSubmit = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler}></FormLogin>
        </BrowserRouter>
      </Provider>
    );

    const inputLogin = screen.getByTestId('Login');
    const inputPassword = screen.getByTestId('Password');

    const submitButton = screen.getByText('Войти');

    await fireEvent.change(inputLogin, {
      target: { value: 'testloginpassworddonotrespond' },
    });
    await fireEvent.change(inputPassword, {
      target: { value: 'testloginpassworddonotrespond' },
    });

    await fireEvent.submit(submitButton);
    //! Асинхронный код
    const alert = await screen.findByTestId('alert');
    expect(alert).toBeInTheDocument();
  });

  test('Снапшот тестирование', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <FormLogin accountModalHandler={accountModalHandler}></FormLogin>
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
