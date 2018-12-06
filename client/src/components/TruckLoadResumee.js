import React, { Component } from "react";
import axios from 'axios';
import { DataTable } from 'react-data-components';


class ResumeeDataTable extends Component {
    render() {
        // { date_arrivee:'date_arrivee',navire_nom: 'navire.nom', importateur_nom: 'importateur.nom', 
        // produit_nom: 'produit.nom',destinataire_nom: 'destinataire.nom',numero_camion:'numero_camion',bon_chargement:'bon_chargement', 
        // camion_status:'camion_status',camion_timestamp:'camion_timestamp', quantite_estimee:'quantite_estimee',
        // tare:'tare', poids_brut:'poids_brut',quantite_bl:'quantite_bl',
        // quantite_bl_restante:'quantite_bl_restante',quantite_bl_rest_estimee:'quantite_bl_rest_estimee'}
    
        const columns = [
            // { title: 'Numero Dum', prop: 'numero_dum', className: getStatus },
            { title: 'Date arrivee navire', prop: 'date_arrivee'},
            { title: 'Navire', prop: 'navire_nom'},
            { title: 'Importateur', prop: 'importateur_nom'},
            { title: 'Destinataire', prop: 'destinataire_nom'},
            { title: 'Numero camion', prop: 'numero_camion'},
            { title: 'Camion status', prop: 'camion_status'},
            { title: 'Poids brut', prop: 'poids_brut'},
            { title: 'Quantite restante estimée', prop: 'quantite_bl_rest_estimee'},
            // { title: 'Quantité Dum Rest Estimée', prop: 'quantite_dum_rest_estimee'},
            // { title: 'Status', prop: 'status', width: '10%' },

            // { title: 'START LOAD', prop: 'start-control', defaultContent: (<button onClick={this.props.clickDetails}>Action</button>) }
        ];
        return (
            <DataTable
                keys='poids_brut'
                // className={this.props.status}
                columns={columns}
                initialData={this.props.data}
                initialPageLength={5}
            ></DataTable>
        )
    }
}



class TruckLoadResumee extends Component {
    constructor(props){
        super(props);
        this.state={dataCurrentTruckStatus:'',arrivee: this.props.data.date,navire: this.props.data.navire,
            importateur: this.props.data.importateur, produit: this.props.data.produit,
            destinataire: this.props.data.destinataire}
        this.getCurrentCamionStatus()
    }

    getCurrentCamionStatus() {
        const arrivee = this.props.data.date
        const navire = this.props.data.navire
        const importateur = this.props.data.importateur
        const produit = this.props.data.produit
        const destinataire = this.props.data.destinataire
        console.log('1-dans truckLoadResumee', arrivee, navire, importateur, produit, destinataire)
        axios.post('http://localhost:5000/workflow/data', { arrivee, navire, importateur, produit, destinataire })
            .then(response => {
                console.log('2-after get data from db truckLoadResumee', response.data.data)
                this.setState({ dataCurrentTruckStatus: response.data.data[0] },()=>console.log('3-dans le state',this.state.dataCurrentTruckStatus))
                
                })
            
            .catch(err => {
                console.log('client side error', err)

            })

    }
    componentDidMount() {
        this.getCurrentCamionStatus()
    }
    render() {
        return (
            <div>
                {/* <ResumeeDataTable data={this.state.dataCurrentTruckStatus}></ResumeeDataTable> */}
                {this.props.data.navire}
            </div>
        )
    }
}

export default TruckLoadResumee;