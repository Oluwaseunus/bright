import React from 'react';
import { RootState } from './store';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import reducer from './store/reducers/rootReducer';
import { render as rtlRender } from '@testing-library/react';

interface RenderWithProvidersProps {
  initialState?: RootState;
  store?: Store<RootState>;
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  }: RenderWithProvidersProps = {}
) {
  function Wrapper({ children }: React.PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
