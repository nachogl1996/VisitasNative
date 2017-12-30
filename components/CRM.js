import React from 'react';
import { Text, View  } from 'react-native';
//import './../assets/scss/main.scss';
//import { visits } from "./../assets/mock.data";
import VisitList from "./VisitList";
import Detail from "./Detail";
import Jquey from 'jquery';
import Filtros from "./Filtros";
const TOKEN = "14457b646146cf31a40d";
export default class CRM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indice: 0,
            visits: visits,
            visit: visits[0],
            idfabrica: "",
            fechadesde: "",
            fechahasta: "",
            fav: true,
            mias: false,
            indicecliente: 0,
            indicevendedor: 0,
            indicefabrica: 0,
            mesdesde: "",
            aniodesde:"",
            meshasta: "",
            aniohasta:"",
            valorv: "",
            vendedores: [{fullname: "hola", cif: "912812"}],
            vendedorescrito: [{fullname: "hola", cif: "912812"}],
            clientes: [{name: "hola", cif: "912812"}],
            valorc: "",
            clienteescrito: [{name: "hola", cif: "912812"}],
            fabricas: [{name: "Cualquiera", id: ""}],
            fabrica: {name: "Cualquiera", id: ""},
        };
        this.appClick = this.appClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.modificar = this.modificar.bind(this);
        this.filtrar = this.filtrar.bind(this);
        this.favclick = this.favclick.bind(this);
        this.filtrocliente = this.filtrocliente.bind(this);
        this.filtrovendedor = this.filtrovendedor.bind(this);
        this.filtrofabrica = this.filtrofabrica.bind(this);
        this.filtrodesde = this.filtrodesde.bind(this);
        this.filtrodesdemes = this.filtrodesdemes.bind(this);
        this.filtrohasta = this.filtrohasta.bind(this);
        this.filtrohastames = this.filtrohastames.bind(this);
        this.filtromias = this.filtromias.bind(this);
        this.filtrofav = this.filtrofav.bind(this);
        this.compararv = this.compararv.bind(this);
        this.changev = this.changev.bind(this);
        this.compararc = this.compararc.bind(this);
        this.changec = this.changec.bind(this);
    }
    compararc(valor){
        return(valor.label.toLowerCase().indexOf(this.state.valorc.toLowerCase()) !== -1);
    }
    changec(valor){
        this.setState({
            valorc: valor.target.value,
        });
        let clientelement = this.state.clientes.filter(this.compararc);
        this.setState({
            clienteescrito: clientelement,
        });
    }
    filtrocliente(valor, cliente){
        this.setState({
            valorc: valor,
            indicecliente: cliente.indice,
            cliente: cliente.label,
        });
    }
    compararv(valor){
        return(valor.label.toLowerCase().indexOf(this.state.valorv.toLowerCase()) !== -1);
    }
    changev(valor){
        this.setState({
            valorv: valor.target.value,
        });
        let vendedorelement = this.state.vendedores.filter(this.compararv);
        this.setState({
            vendedorescrito: vendedorelement,
        });
    }
    filtrovendedor(valor, vendedor) {
        this.setState({
            valorv: valor,
            indicevendedor: vendedor.indice,
            vendedor: vendedor.label,
        });
    }
    modificar(datos){
        this.setState({
            visits: datos,
            visit: datos[this.state.indice],
        });
    }
    componentDidMount(){
        let clienteurl = encodeURI(this.state.valorc);
        let vendedorurl = encodeURI(this.state.valorv)
        let favorito = "";
        if(this.state.fav){
            favorito = "1";
        }
        let url = "https://dcrmt.herokuapp.com/api/visits/flattened?token="+TOKEN+"&dateafter="+this.state.fechadesde+"&datebefore="+this.state.fechahasta+"&customer="+clienteurl+"&salesman="+vendedorurl+"&companyid="+this.state.idfabrica+"&favourites="+favorito;
        let respuesta = Jquey.ajax({
            url: url
        })
            .fail(function () {
                console.log("ERROR");
            })
            .done(function( data ) {
                this.modificar(data)
            }.bind(this));
        let urlv = "https://dcrmt.herokuapp.com/api/salesmen?token="+TOKEN;
        let respuestav = Jquey.ajax({
            url: urlv
        })
            .fail(function () {
                console.log("ERROR al descargar vendedores");
            })
            .done(function( data ) {
                let array1 = [{fullname: ""}];
                let array = array1.concat(data);
                let vendedorelement = data.map((vendedor, indice) => {
                    return({ label: vendedor.fullname, indice: indice });
                });
                this.setState({
                    vendedores: vendedorelement,
                    vendedorescrito: vendedorelement,
                });
            }.bind(this));
        let urlc = "https://dcrmt.herokuapp.com/api/customers?token="+TOKEN;
        let respuestac = Jquey.ajax({
            url: urlc
        })
            .fail(function () {
                console.log("ERROR al descargar clientes");
            })
            .done(function( data ) {
                let clientelement = data.map((cliente, indice) => {
                    return({ label: cliente.name, indice: indice });
                });
                this.setState({
                    clientes: clientelement,
                    clienteescrito: clientelement,
                });
            }.bind(this));
        let urlf = "https://dcrmt.herokuapp.com/api/companies?token="+TOKEN;
        let respuestaf = Jquey.ajax({
            url: urlf
        })
            .fail(function () {
                console.log("ERROR al descargar clientes");
            })
            .done(function( data ) {
                let array1 = [{name: "", id: ""}];
                let array = array1.concat(data);
                let fabricalement = array.map((fabrica, indice) => {
                    return({ name: fabrica.name, indice: indice, id: fabrica.id });
                });
                this.setState({
                    fabricas: fabricalement,
                    fabrica: fabricalement[this.state.indicefabrica],
                });
            }.bind(this));

    }
    appClick(indice) {
        this.setState({
            indice: indice,
            visit: this.state.visits[indice],
        });
    }
    filtrar(){
        var fecha = new Date();
        var anio = fecha.getFullYear();
        let mesdesde = this.state.mesdesde;
        let aniodesde = this.state.aniodesde;
        let fechadesde = "";
        if(aniodesde === "" && mesdesde === ""){
            fechadesde = "";
        } else {
            if(mesdesde === ""){
                fechadesde = aniodesde+"-01-01";
            } else {
                if(aniodesde === ""){
                    fechadesde = anio+"-"+mesdesde+"-01";
                } else {
                    fechadesde = aniodesde+"-"+mesdesde+"-01";
                }
            }
        }
        let meshasta = this.state.meshasta;
        let aniohasta = this.state.aniohasta;
        let fechahasta = "";
        if(aniohasta === "" && meshasta === ""){
            fechahasta = "";
        } else {
            if(meshasta === ""){
                fechahasta = aniohasta+"-01-31";
            } else {
                if(aniohasta === ""){
                    fechahasta = anio+"-"+meshasta+"-28";
                } else {
                    fechahasta = aniohasta+"-"+meshasta+"-28";
                }
            }
        }
        let clienteurl = encodeURI(this.state.valorc);
        let vendedorurl = encodeURI(this.state.valorv);
        let favorito = "";
        if(this.state.fav){
            favorito = "1";
        }
        let urlaux = "https://dcrmt.herokuapp.com/api/visits/flattened?token=";
        if(this.state.mias){
            urlaux = "https://dcrmt.herokuapp.com/api/users/tokenOwner/visits/flattened?token=";
        }
        let url = urlaux+TOKEN+"&dateafter="+fechadesde+"&datebefore="+fechahasta+"&customer="+clienteurl+"&salesman="+vendedorurl+"&companyid="+this.state.idfabrica+"&favourites="+favorito;
        let respuesta = Jquey.ajax({
            url: url
        })
            .fail(function () {
                console.log("ERROR");
            })
            .done(function( data ) {
                this.modificar(data)
            }.bind(this));
    }
    favclick(indice){
        let visita = this.state.visits[indice];
        let visid = visita.id;
        let fav = visita.favourite;
        let url = "";
        if (fav){
            url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/"+visid+"?token="+TOKEN+"&_method=DELETE";
        } else {
            url = "https://dcrmt.herokuapp.com/api/users/tokenOwner/favourites/"+visid+"?token="+TOKEN+"&_method=PUT";
        }
        let respuesta = Jquey.ajax({url: url})
            .done(function( data ) {
                console.log(data);
                this.filtrar();
            }.bind(this));
    }
    filtrofabrica(fabrica, indice){
        this.setState({
            indicefabrica: indice,
            fabrica: fabrica,
            idfabrica: fabrica.id,
        });
    }
    filtrodesdemes(mes){
        this.setState({
            mesdesde: mes,
        });
    }filtrodesde(anio){
        this.setState({
            aniodesde: anio,
        });
    }
    filtrohasta(anio){
        this.setState({
            aniohasta: anio,
        });
    }filtrohastames(mes){
        this.setState({
            meshasta: mes,
        });
    }
    filtromias(mias){
        this.setState({
            mias: mias,
        });
    }
    filtrofav(fav){
        this.setState({
            fav: fav,
        });
    }
    render() {
        /*return (<div>
            <Filtros manejador={ this.filtrar } fabricas={ this.state.fabricas } valorv={ this.state.valorv } vendedores={ this.state.vendedores } vendedorescrito={ this.state.vendedorescrito } manejadorchangev={ this.changev } valorc={ this.state.valorc } clientes={ this.state.clientes } clienteescrito={ this.state.clienteescrito } manejadorchangec={ this.changec } manejadorvendedor={ this.filtrovendedor } manejadorcliente={ this.filtrocliente } manejadorfabrica={ this.filtrofabrica } manejadorfav={ this.filtrofav } manejadormias={ this.filtromias } manejadordesde={ this.filtrodesde } manejadordesdemes={ this.filtrodesdemes } manejadorhasta={ this.filtrohasta } manejadorhastames={ this.filtrohastames } indicecliente={ this.state.indicecliente } fav={ this.state.fav } mias={ this.state.mias } vendedor={ this.state.vendedor } cliente={ this.state.cliente } indicevendedor={ this.state.indicevendedor } idfabrica={ this.state.idfabrica } indicefabrica={ this.state.indicefabrica } mesdesde={ this.state.mesdesde } aniodesde={ this.state.aniodesde } meshasta={ this.state.meshasta } aniohasta={ this.state.aniohasta }/>
            <VisitList visits={ this.state.visits } manejadorVisitsClick={ this.appClick } manejadorfav={ this.favclick }/>
            <Detail visita={this.state.visit} mykey={this.state.indice}/>
            </div>
        );*/
        return (
            <View>
                <VisitList visits={ this.state.visits } manejadorVisitsClick={ this.appClick } manejadorfav={ this.favclick }/>
            </View>
        );

    }

}

