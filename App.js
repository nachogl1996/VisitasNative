import React from 'react';
import Practica7 from './components/Practica7';
import Detail from './components/Detail';
import { StackNavigator } from 'react-navigation';
const App = StackNavigator({
    Home: { screen: Practica7 },
    Detalle: { screen: Detail },
});
export default App;
/*export default class App extends React.Component {
    render() {
        return (
            <Practica7/>
        );
    }
}*/
