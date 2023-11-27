import FormLogin from './FormLogin';

import userEvent from '@testing-library/user-event';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.tsx';
import { BrowserRouter } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { createRoot } from 'react-dom/client';

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
    const accountModalHandler = jest.fn();
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler} />
        </BrowserRouter>
      </Provider>
    );
  });

  test('Проверка наличия формы', () => {
    const accountModalHandler = jest.fn();
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
    const accountModalHandler = jest.fn();
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
    const accountModalHandler = jest.fn();
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

  test('Alert не должен существовать поначалу', () => {
    const accountModalHandler = jest.fn();
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

  test('Alert появляется по ошибке', async () => {
    const accountModalHandler = jest.fn();
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

  test('Введите свой псевдоним! Введите пароль! ', async () => {
    const accountModalHandler = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler}></FormLogin>
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByText('Войти');
    await fireEvent.submit(submitButton);
    const alertLogin = await screen.findByText('Введите свой псевдоним!');
    const alertPassword = await screen.findByText('Введите пароль!');
    expect(alertLogin).toBeInTheDocument();
    expect(alertPassword).toBeInTheDocument();
  });

  test('Вызывается ли функция accountModalHandler при нажатии на кнопку ~Нет аккаунта?~', async () => {
    const accountModalHandler = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormLogin accountModalHandler={accountModalHandler}></FormLogin>
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();
    const linkButton = screen.getByText('Нет аккаунта?');
    expect(linkButton).toBeInTheDocument();

    await user.click(linkButton);

    expect(accountModalHandler).toBeCalledTimes(1);
  });

  test('Снапшот тестирование', () => {
    const accountModalHandler = jest.fn();
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
