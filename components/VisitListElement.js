import  React from 'react';
import { Text, View, Button, StyleSheet  } from 'react-native';
export default class VisitListElement extends React.Component {
    constructor(props) {
        super(props);
        this._elementClick = this._elementClick.bind(this);
        this._saveclick = this._saveclick.bind(this);
        this._removeClick = this._removeClick.bind(this);
    }
    _elementClick() {
        this.props.manejadorClick(this.props.mykey);
    }
    _saveclick(){
        this.props.manejadorsave(this.props.mykey);
    }
    _removeClick(){
        this.props.manejadoremove(this.props.mykey);
    }
    render() {
        let visita = this.props.visita;
        let id = visita["id"];
        let customer = visita["Customer"];
        let customern = customer["name"];
        let salesman = visita["Salesman"];
        let salesmann = salesman["fullname"];
        let fecha = visita["plannedFor"].substr(0,10);
        return(
            <View key={id} style={styles.flexstyle}>
                <View style={ styles.mayor }>
                    <Text style={styles.cliente}> Cliente: {customern}</Text>
                    <Text style={styles.vendedor}> Vendedor: {salesmann}</Text>
                    <Text style={styles.fecha}> Fecha: {fecha}</Text>
                </View>
                <View style={ styles.medio }>
                    <Button title="Guardar" onPress={ this._saveclick }/>
                    <Button title="Borrar" onPress={ this._removeClick }/>
                </View>
                <View style={ styles.menor }>
                    <Button title="Ver" onPress={ this._elementClick }/>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    mayor: {
        width: 170,
    },
    menor: {
        width: 50,
    },
    medio: {
        width: 90,
    },
    flexstyle: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#f5f5f5'
    },
    cliente: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    vendedor: {
        fontSize: 15,
    },
    fecha: {
        fontStyle: 'italic',
    }

});