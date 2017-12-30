import  React from 'react';
import VisitListElement from "./VisitListElement";
import { Text, View, ListView, ScrollView  } from 'react-native';

export default class VisitList extends React.Component {
    constructor(props) {
        super(props);
        this._visitClick = this._visitClick.bind(this);
        this._saveclick = this._saveclick.bind(this);
        this._removeClick = this._removeClick.bind(this);
    }
    _removeClick(indice){
        this.props.manejadoremove(indice);
    }
    _visitClick(id) {
        this.props.manejadorVisitsClick(id);
    }
    _saveclick(indice){
        this.props.manejadorsave(indice);
    }
    render() {
        let visitas = this.props.visits;
        let visitelement = visitas.map((visita, indice) => {
            return(<View key={"visitas"+indice}><VisitListElement visita={ visita } mykey={indice} manejadorClick={ this._visitClick } manejadorsave={ this._saveclick } manejadoremove={ this._removeClick }/></View>);
        });
        return(
            <ScrollView>{ visitelement }</ScrollView>
        );
    }
}