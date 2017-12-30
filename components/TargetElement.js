import  React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
export default class TargetElement extends React.Component {
    render() {
        let target = this.props.target;
        let compañia = target["Company"];
        let compañianame = compañia["name"];
        let notas = target["notes"];
        let success = target["success"];
        let type = target["TargetType"];
        let name = type["name"];
        return(
            <View key={this.props.mykey} style={ success ? styles.vistaok: styles.vistanok }>
                <Text style={ styles.header }>{ name }:</Text>
                <Text style={ styles.texto }> Compañia: { compañianame }</Text>
                <Text style={ styles.texto }> Notas: { notas }</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    vistaok: {
        padding: 10,
        margin: 20,
        backgroundColor: '#cdf8c4'
    },
    vistanok: {
        padding: 10,
        margin: 20,
        backgroundColor: '#f89593'
    },
    texto: {
        fontSize: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});