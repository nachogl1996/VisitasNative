import  React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import VisitDetail from "./VisitDetail";
import TargetDetail from "./Targetdetail";
import CustomerDetail from "./CustomerDetail";
import SalesmanDetail from "./SalesmanDetail";
export default class Detail extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Detalle de ID:'+navigation.state.params.visita.id,
    });
    render() {
        let visita = this.props.navigation.state.params.visita;
        console.log(visita.Customer);
        if(visita === null || visita === undefined){
            return(<Text>No hay detalles</Text>);
        }
        let indice = this.props.navigation.state.params.indice;
        let targets = visita["Targets"];
        let customer = visita["Customer"];
        let salesman = visita["Salesman"];
        return(
            <ScrollView key={"Detail"+indice}>
                <VisitDetail visit={visita} mykey={indice}/>
                <SalesmanDetail salesman={salesman} mykey={indice}/>
                <TargetDetail targets={targets} mykey={indice}/>
                <CustomerDetail customer={customer} mykey={indice}/>
            </ScrollView>
        );

    }
}