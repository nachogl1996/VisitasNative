import  React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default class SalesmanDetail extends React.Component {
    render() {
        let salesman = this.props.salesman;
        let name = salesman["fullname"];
        let foto = salesman["Photo"];
        let url = ""
        if(foto === null){
            url = "./../assets/noface.png"
        } else {
            url = foto["url"];
        }
        console.log(url);
        return(
            <View>
                <Text style={ styles.header }>Vendedor:</Text>
                <View key={"Salesman"+this.props.mykey} style={ styles.horizontal }>
                    <Image source={{uri: url}} style={{width: 80, height: 80}}/>
                    <Text style={ styles.texto }> { name }</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        margin: 20,
        backgroundColor: '#d5f0f8'
    },
    texto: {
        fontSize: 24,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
    }
});