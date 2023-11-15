import ReactDOM from 'react-dom';

import FooterComp from './FooterComp';

import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

describe('Проверка компонента FooterComp', () => {
  afterEach(cleanup);

  test('Не крашится', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FooterComp />, div);
  });

  test('Отрисовывает текст в футере', () => {
    const { getByTestId } = render(<FooterComp></FooterComp>);
    expect(getByTestId('Footer')).toHaveTextContent(
      'Nonotion ©2023 Created by Kulikovsky'
    );

    const footerText = screen.getByText(/Nonotion/i);
    expect(footerText).toBeInTheDocument();
  });

  test('Снапшот тестирование', () => {
    const tree = renderer.create(<FooterComp></FooterComp>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
