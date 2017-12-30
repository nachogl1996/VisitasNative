import  React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
export default class CustomerDetail extends React.Component{
    render() {
        let customer = this.props.customer;
        let id = customer["id"];
        let name = customer["name"];
        let cif = customer["cif"];
        let dir1 = customer["address1"];
        let dir2 = customer["address2"];
        let city = customer["city"];
        let phone = customer["phone1"];
        let email = customer["email1"];
        let codigopostal = customer["postalCode"];
        return(
            <View key={"Customer"+this.props.mykey}>
                <Text style={styles.header}>Cliente:</Text>
                <View style={ styles.principal }>
                    <Text style={styles.texto}> Nombre: { name }</Text>
                    <Text style={styles.texto}> Id: { id }   NIF: { cif }</Text>
                    <Text style={styles.subheader}> Localización:</Text>
                    <View style={ styles.secundaria }>
                        <Text style={styles.texto}> Dirección principal: { dir1 }</Text>
                        <Text style={styles.texto}> Dirección secundaria: { dir2 }</Text>
                        <Text style={styles.texto}> Ciudad: { city }</Text>
                        <Text style={styles.texto}> Código Postal: { codigopostal }</Text>
                    </View>
                    <Text style={styles.subheader}> Contacto:</Text>
                    <View style={ styles.secundaria }>
                        <Text style={styles.texto}> Telefono: { phone }</Text>
                        <Text style={styles.texto}> Correo: { email }</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    principal: {
        padding: 10,
        margin: 20,
        backgroundColor: '#f7f8d5'
    },
    secundaria: {
        margin: 10,
        backgroundColor: '#f8f6ac'
    },
    texto: {
        fontSize: 20,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 28,
        fontWeight: 'bold',
    }
});