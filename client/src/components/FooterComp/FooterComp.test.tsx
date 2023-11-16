import { createRoot } from 'react-dom/client';

import FooterComp from './FooterComp';

import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

describe('Проверка компонента FooterComp', () => {
  afterEach(cleanup);

  test('Не крашится', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<FooterComp />);
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
