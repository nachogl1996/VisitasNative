import  React from 'react';
import TargetElement from "./TargetElement";
import { View, StyleSheet, Text, ScrollView } from 'react-native';
export default class Targetdetail extends React.Component {
    render() {
        let targets = this.props.targets;
        let targetelement;
        if(targets.length === 0 || targets === undefined || targets === null){
                targetelement= (<Text style={ styles.texto }>No hay objetivos</Text>);
        } else {
            targetelement = targets.map((target, indice) => {
                return(<View key={"TargetList"+indice}><TargetElement target={target} mykey={indice}/></View>)
            });
        }
        return(
            <View>
                <Text style={ styles.header }>Objetivos:</Text>
                { targetelement }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    texto: {
        fontSize: 24,
        color: 'red',
        marginLeft: 20,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
    }
});