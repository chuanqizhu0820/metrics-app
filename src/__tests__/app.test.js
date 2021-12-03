import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { loadHome } from '../redux/app';
import homeData from '../__mocks__/requestData';
import '@testing-library/jest-dom';
import App from '../App';
import store from '../redux/configureStore';

test('should return the data requested', () => {
  const data = homeData();
  expect(loadHome({ home: data })).toStrictEqual({
    type: 'LOAD_HOME',
    payload: {
      home: {
        China: {
          new: '0',
          deaths: '0',
        },
        Japan: {
          new: '0',
          deaths: '0',
        },
        US: {
          new: '0',
          deaths: '0',
        },
      },
    },
  });
});

test('app should connect the redux store', () => {
  const renderStatus = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(!!renderStatus).toBe(true);
});
