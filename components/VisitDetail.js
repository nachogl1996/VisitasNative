import  React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class VisitDetail extends React.Component {
    render() {
        let visita = this.props.visit;
        let id = visita["id"];
        let fecha = visita["plannedFor"].substr(0,10);
        let notas = visita["notes"];
        let titulo = "Fecha: "+fecha
        return(
            <View key={id} style={ styles.vista }>
                <Text style={ styles.texto }> Notas: { notas }</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    texto: {
        fontStyle: 'italic',
        fontSize: 18,
    },
    vista: {
        backgroundColor: '#efffe8',
        margin: 10,
    }
});