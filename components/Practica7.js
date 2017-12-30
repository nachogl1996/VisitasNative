import React from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage, Button } from 'react-native';
import { visits } from "./../assets/mock.data";
import VisitList from "./VisitList";
//import fetch from 'fetch';
const TOKEN = "14457b646146cf31a40d";
export default class Practica7 extends React.Component {
    static navigationOptions = {
        title: 'Visitas',
    };
  constructor(props){
    super(props);
    this.state = {
        indice: 0,
        visits: visits,
        visit: visits[0],
        cargando: true,
        todas: true,
    };
    this.modificar = this.modificar.bind(this);
    this._appClick = this._appClick.bind(this);
    this._saveclick = this._saveclick.bind(this);
    this._removeClick = this._removeClick.bind(this);
    this._cargarTodas = this._cargarTodas.bind(this);
    this._cargarGuardadas = this._cargarGuardadas.bind(this);
    this._borrarGuardadas = this._borrarGuardadas.bind(this);
  }
  modificar(datos){
        this.setState({
            visits: datos,
            visit: datos[this.state.indice],
            cargando: false,
        });
    }
    componentDidMount() {
        try {
            AsyncStorage.getItem('@P7_2017_IWEB:visits', (err, result) => {
                if (result === null) {
                    AsyncStorage.setItem('@P7_2017_IWEB:visits', JSON.stringify([]));
                }
            });
        } catch (error) {
            console.log("ERROR ACCEDIENDO A LOS DATOS");
        }
        let url = "https://dcrmt.herokuapp.com/api/visits/flattened?token="+TOKEN;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.modificar(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });

    }
  _appClick(indice) {
        this.setState({
            indice: indice,
            visit: this.state.visits[indice],
        });
        const { navigate } = this.props.navigation;
        navigate('Detalle', { visita: this.state.visits[indice], indice: indice })
    }
  _saveclick(indice){
      try {
          AsyncStorage.getItem('@P7_2017_IWEB:visits', (err, result) => {
              let resultado = JSON.parse(result);
              for(i=0; i<resultado.length; i++){
                  if(resultado[i].id === this.state.visits[indice].id){
                      resultado.splice(i, 1);
                  }
              }
              resultado.push(this.state.visits[indice]);
              console.log(resultado.length);
              AsyncStorage.setItem('@P7_2017_IWEB:visits', JSON.stringify(resultado));
          });
      } catch (error) {
          // Error retrieving data
      }
  }
    _removeClick(indice){
        try {
            AsyncStorage.getItem('@P7_2017_IWEB:visits', (err, result) => {
                let resultado = JSON.parse(result);
                for(i=0; i<resultado.length; i++){
                    if(resultado[i].id === this.state.visits[indice].id){
                        resultado.splice(i, 1);
                    }
                }
                console.log(resultado.length);
                if(!this.state.todas){
                    this.modificar(resultado);
                }
                AsyncStorage.setItem('@P7_2017_IWEB:visits', JSON.stringify(resultado));
            });
        } catch (error) {
            // Error retrieving data
        }
    }
    _cargarTodas(){
        this.setState({
            todas: true,
            cargando: true,
        });
        let url = "https://dcrmt.herokuapp.com/api/visits/flattened?token="+TOKEN;
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.modificar(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    _cargarGuardadas(){
        this.setState({
            todas: false,
        });
        try {
            AsyncStorage.getItem('@P7_2017_IWEB:visits', (err, result) => {
                this.modificar(JSON.parse(result));
            });
        } catch (error) {
            console.log("ERROR ACCEDIENDO A LOS DATOS");
        }
    }
    _borrarGuardadas(){
        AsyncStorage.setItem('@P7_2017_IWEB:visits', JSON.stringify([]));
        if(!this.state.todas){
            this.modificar([]);
        }
    }
  render(){
      const { navigate } = this.props.navigation;
      if(this.state.cargando){
          return (
              <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#0000ff" />
              </View>
          );
      }
    return (
      <View style={styles.fondo}>
          <View>
              <Button title="Borrar Guardadas" onPress={ this._borrarGuardadas } style={styles.botones}/>
              <View style={styles.horizontal}>
                  <Button title="Todas" onPress={ this._cargarTodas } style={ styles.botones  }/>
                  <Button title="Guardadas" onPress={ this._cargarGuardadas } style={ styles.botones }/>
              </View>
          </View>
          <VisitList visits={ this.state.visits } manejadorVisitsClick={ this._appClick } manejadorsave={ this._saveclick } manejadoremove={ this._removeClick }/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    fondo: {
        backgroundColor: '#ffffff'
    },
    flexstyle: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 30,
        backgroundColor: '#c4fed4',
        marginBottom: 0
    },
    botones: {
        width: 50,
    }
});