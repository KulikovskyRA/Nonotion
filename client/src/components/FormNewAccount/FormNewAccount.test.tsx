import userEvent from '@testing-library/user-event';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.tsx';
import { BrowserRouter } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { createRoot } from 'react-dom/client';
import FormNewAccount from './FormNewAccount.tsx';

describe('Проверка компонента FormNewAccount', () => {
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
          <FormNewAccount accountModalHandler={accountModalHandler} />
        </BrowserRouter>
      </Provider>
    );
  });

  test('Проверка наличия формы', () => {
    const accountModalHandler = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormNewAccount
            accountModalHandler={accountModalHandler}
          ></FormNewAccount>
        </BrowserRouter>
      </Provider>
    );
    const Form = screen.getByTestId('Form');
    expect(Form).toBeInTheDocument();
  });

  test('Проверка наличия инпутов логина, пароля, проверки пароля', () => {
    const accountModalHandler = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormNewAccount
            accountModalHandler={accountModalHandler}
          ></FormNewAccount>
        </BrowserRouter>
      </Provider>
    );

    const inputLogin = screen.getByPlaceholderText('Логин');
    expect(inputLogin).toBeInTheDocument();
    const inputPassword = screen.getByPlaceholderText('Пароль');
    expect(inputPassword).toBeInTheDocument();
    const inputCheck = screen.getByPlaceholderText('Повторите пароль');
    expect(inputCheck).toBeInTheDocument();
  });

  test('Проверка наличия кнопок', () => {
    const accountModalHandler = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormNewAccount
            accountModalHandler={accountModalHandler}
          ></FormNewAccount>
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
          <FormNewAccount
            accountModalHandler={accountModalHandler}
          ></FormNewAccount>
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
          <FormNewAccount
            accountModalHandler={accountModalHandler}
          ></FormNewAccount>
        </BrowserRouter>
      </Provider>
    );

    const inputLogin = screen.getByPlaceholderText('Логин');
    const inputPassword = screen.getByPlaceholderText('Пароль');
    const inputCheck = screen.getByPlaceholderText('Повторите пароль');
    const submitButton = screen.getByText('Создать');

    await fireEvent.change(inputLogin, {
      target: { value: 'testloginpassworddonotrespond' },
    });
    await fireEvent.change(inputPassword, {
      target: { value: 'testloginpassworddonotrespond' },
    });
    await fireEvent.change(inputCheck, {
      target: { value: 'testloginpassworddonotrespond' },
    });

    await fireEvent.submit(submitButton);
    //! Асинхронный код
    const alert = await screen.findByTestId('alert');
    expect(alert).toBeInTheDocument();
  });

  test('Введите свой псевдоним! Введите пароль! Повторите пароль! ', async () => {
    const accountModalHandler = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormNewAccount
            accountModalHandler={accountModalHandler}
          ></FormNewAccount>
        </BrowserRouter>
      </Provider>
    );

    const inputPassword = screen.getByPlaceholderText('Пароль');
    const inputCheck = screen.getByPlaceholderText('Повторите пароль');

    await fireEvent.change(inputPassword, {
      target: { value: 'testloginpassworddonotrespond' },
    });
    await fireEvent.change(inputCheck, {
      target: { value: 'testloginpassworddonotrespond235325235' },
    });

    const alertCheck = await screen.findByText('Пароли не совпадают!');

    expect(alertCheck).toBeInTheDocument();
  });

  test('Пароли не совпадают! ', async () => {
    const accountModalHandler = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormNewAccount
            accountModalHandler={accountModalHandler}
          ></FormNewAccount>
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByText('Создать');
    await fireEvent.submit(submitButton);
    const alertLogin = await screen.findByText('Введите свой псевдоним!');
    const alertPassword = await screen.findByText('Введите пароль!');
    const alertCheck = await screen.findByText('Повторите пароль!');
    expect(alertLogin).toBeInTheDocument();
    expect(alertPassword).toBeInTheDocument();
    expect(alertCheck).toBeInTheDocument();
  });

  test('Вызывается ли функция accountModalHandler при нажатии на кнопку ~Есть аккаунт?~', async () => {
    const accountModalHandler = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <FormNewAccount
            accountModalHandler={accountModalHandler}
          ></FormNewAccount>
        </BrowserRouter>
      </Provider>
    );

    const user = userEvent.setup();
    const linkButton = screen.getByText('Есть аккаунт?');
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
            <FormNewAccount
              accountModalHandler={accountModalHandler}
            ></FormNewAccount>
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
