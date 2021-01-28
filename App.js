if (__DEV__)
    import('./src/debug/ReactotronConfig').then(() => console.log('Reactotron Configured'))

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNav from './src/navigation'
import { store, persistor } from './src/redux/store';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppNav />
                </PersistGate>
            </Provider>
        );
    }
}
