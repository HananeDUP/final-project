const express = require('express');
const router = express.Router();
// const Ship = require('.././models/Ship.js');
const db = require('.././variables/database')

router.post('/workflow/data', (req, res, next) => {
    const datearrivee = req.body.arrivee//.toISOString().split('T')[0]
    const navire = req.body.navire;
    // const portchrgmt = req.body.portchrgmt;
    // const portdechrgmt = req.body.portdechrgmt;
    // const silo = req.body.silo;
    const importateur = req.body.importateur;
    const produit = req.body.produit;
    const destinataire = req.body.destinataire;
    console.log('parametressssss', navire, importateur, destinataire, produit, datearrivee)
    const myquery = { date_arrivee:'date_arrivee',navire_nom: 'navire.nom', importateur_nom: 'importateur.nom', 
    produit_nom: 'produit.nom',destinataire_nom: 'destinataire.nom',numero_camion:'numero_camion',bon_chargement:'bon_chargement', 
    camion_status:'camion_status',camion_timestamp:'camion_timestamp', quantite_estimee:'quantite_estimee',
    tare:'tare', poids_brut:'poids_brut',quantite_bl:'quantite_bl',
    quantite_bl_restante:'quantite_bl_restante',quantite_bl_rest_estimee:'quantite_bl_rest_estimee'}

    db('chargement_camion').innerJoin('navire', 'chargement_camion.navire_id', '=', 'navire.id')
        .innerJoin('importateur', 'chargement_camion.importateur_id', '=', 'importateur.id')
        .innerJoin('destinataire', 'chargement_camion.destinataire_id', '=', 'destinataire.id')
        .innerJoin('silo', 'chargement_camion.silo_id', '=', 'silo.id')
        .innerJoin('produit', 'chargement_camion.produit_id', '=', 'produit.id')
        .innerJoin('port_chargement', 'chargement_camion.port_chargement_id', '=', 'port_chargement.id')
        .innerJoin('port_dechargement', 'chargement_camion.port_dechargement_id', '=', 'port_dechargement.id')
        // .distinct()
        // .select(myquery)
        .select(myquery)
        .where({
            'date_arrivee': datearrivee,
            'navire.nom': navire,
            // 'port_dechargement.ville': portdechrgmt,
            // 'port_chargement.ville': portchrgmt,
            // 'silo.nom': silo,
            'importateur.nom': importateur,
            'produit.nom': produit,
            'destinataire.nom': destinataire
        })
        .then(data => {
            res.json({ data })
        })
        .catch(err => res.json({ status: "not ok nottttttt" }))
})

// router.post('/workflow/register', (req, res, next) => {
//     const datearrivee = req.body.arrivee//.toISOString().split('T')[0]
//     const navire = req.body.navire;
//     //Supprimer ces colonnes de la table chargement_camion:
//     // const portchrgmt = req.body.portchrgmt;
//     // const portdechrgmt = req.body.portdechrgmt;
//     // const silo = req.body.silo;
//     const importateur = req.body.importateur;
//     const produit = req.body.produit;
//     const destinataire = req.body.destinataire;
//     const bon_chrgmt = req.body.bon;
//     const numero_camion = req.body.numero_camion;
//     const camion_status = req.body.camion_status;
//     const quantite_estimee = req.body.quantite_estimee;
//     const tare = req.body.tare
//     const poids_brut = req.body.poids_brut
//     const quantite_bl = req.body.quantite_bl;
//     const quantite_bl_restante = req.body.quantite_bl_restante;
//     const quantite_bl_rest_estimee = req.body.quantite_bl_rest_estimee;
//     const date_now = new Date().toISOString();

//     console.log('navireeeeeeeeeeeeeeeeeeeeeeeeeeeeee=', navire)
//     console.log('bonnnnnnnnnnnnnnn=', bon_chrgmt)
//     // const myquery = {
//     //     navire_id: 'navire.id', importateur_id: 'importateur.id', produit_id: 'produit.id',
//     //     destinataire_id: 'destinataire.id', silo_id: 'silo.id',
//     //     port_chargement_id: 'port_chargement.id', port_dechargement_id: 'port_dechargement.id'
//     // }
//     //check if the quantite_bl in req.body correponds to the quantite_bl in navire_data
//     var datatocheck = {}
//     datatocheck.date_arrivee = datearrivee
//     datatocheck.navire = navire
//     datatocheck.importateur = importateur
//     datatocheck.produit = produit
//     datatocheck.destinataire = destinataire
//     datatocheck.numero_camion = numero_camion
//     datatocheck.camion_status = camion_status
//     datatocheck.tare = tare

//     // var datatoinsert = datatocheck
//     // datatoinsert.bon_chargement = bon_chrgmt
//     // datatoinsert.quantite_estimee = parseInt(quantite_estimee)
//     // datatoinsert.poids_brut = poids_brut
//     // datatoinsert.quantite_bl = parseInt(quantite_bl)
//     // datatoinsert.quantite_bl_restante = parseInt(quantite_bl_restante)
//     // datatoinsert.quantite_bl_rest_estimee = parseInt(quantite_bl_rest_estimee) - parseInt(quantite_estimee)
//     // datatoinsert.camion_timestamp = date_now
//     //je peux modifier également la table DUM avec la nouvelle quantité estimée et modifier le status de la dum
//     const myquery = {
//         navire_id: 'navire.id', importateur_id: 'importateur.id',
//         destinataire_id: 'destinataire.id', produit_id: 'produit.id'
//     }

//     // console.log('newdict=', newdict)
//     db('chargement_camion').innerJoin('navire', 'chargement_camion.navire_id', '=', 'navire.id')
//         .innerJoin('importateur', 'chargement_camion.importateur_id', '=', 'importateur.id')
//         .innerJoin('destinataire', 'chargement_camion.destinataire_id', '=', 'destinataire.id')
//         .select().where(datatocheck)
//         .then(dataset => {
//             console.log('dataset', dataset)
//             if (dataset.length === 0) {
//                 db('navire').crossJoin('importateur').crossJoin('destinataire')
//                     .crossJoin('produit')
//                     .where({
//                         'navire.nom': navire,
//                         'importateur.nom': importateur,
//                         'destinataire.nom': destinataire,
//                         'produit.nom': produit
//                     }).select(myquery)
//                     .then(data => {
//                         console.log('data from cross join table', data)
//                         var datatoinsert = data[0]
//                         datatoinsert.bon_chargement = bon_chrgmt
//                         datatoinsert.quantite_estimee = parseInt(quantite_estimee)
//                         datatoinsert.poids_brut = poids_brut
//                         datatoinsert.quantite_bl = parseInt(quantite_bl)
//                         datatoinsert.quantite_bl_restante = parseInt(quantite_bl_restante)
//                         datatoinsert.quantite_bl_rest_estimee = parseInt(quantite_bl_rest_estimee) - parseInt(quantite_estimee)
//                         datatoinsert.camion_timestamp = date_now
//                         datatoinsert.date_arrivee = datearrivee
//                         datatoinsert.navire = navire
//                         datatoinsert.importateur = importateur
//                         datatoinsert.produit = produit
//                         datatoinsert.destinataire = destinataire
//                         datatoinsert.numero_camion = numero_camion
//                         datatoinsert.camion_status = camion_status
//                         datatoinsert.tare = tare
//                     })
//                 db('chargement_camion').innerJoin('navire', 'chargement_camion.navire_id', '=', 'navire.id')
//                     .innerJoin('importateur', 'chargement_camion.importateur_id', '=', 'importateur.id')
//                     .innerJoin('destinataire', 'chargement_camion.destinataire_id', '=', 'destinataire.id')
//                     .insert([datatoinsert])
//                     .then(() => {
//                         if (newdict.camion_status !== 'Sorti') {
//                             var new_qty_estimated = newdict.quantite_bl_rest_estimee

//                         } else {
//                             var new_qty_restante = newdict.quantite_bl_restante - (newdict.poids_brut - newdict.tare)


//                         }

//                         console.log('okokok')
//                         res.json({ status: 'ok' })
//                     })
//                     .catch(err => {
//                         console.log('bouhh', err)
//                         res.json({ status: 'error' })
//                     })
//             }
//             else {
//                 res.json({ status: 'data already inserted' })
//                 console.log("erroorrr", 'dataselect=', dataset)
//             }
//         })
//         .catch(err => {
//             console.log("first errooooooor", err)
//             res.json({ status: 'error' })
//         })


// })


router.post('/workflow/register', (req, res, next) => {
    const datearrivee = req.body.arrivee//.toISOString().split('T')[0]
    const navire = req.body.navire;
    // const portchrgmt = req.body.portchrgmt;
    // const portdechrgmt = req.body.portdechrgmt;
    // const silo = req.body.silo;
    const importateur = req.body.importateur;
    const produit = req.body.produit;
    const destinataire = req.body.destinataire;
    const bon_chrgmt = req.body.bon;
    const numero_camion = req.body.numero_camion;
    const camion_status = req.body.camion_status;
    const quantite_estimee = req.body.quantite_estimee;
    const tare = req.body.tare
    const poids_brut = req.body.poids_brut
    const quantite_bl = req.body.quantite_bl;
    const quantite_bl_restante = req.body.quantite_bl_restante;
    const quantite_bl_rest_estimee = req.body.quantite_bl_rest_estimee;
    const date_now = new Date().toISOString();

    console.log('navireeeeeeeeeeeeeeeeeeeeeeeeeeeeee=', navire)
    console.log('bonnnnnnnnnnnnnnn=', bon_chrgmt)
    const myquery = {
        navire_id: 'navire.id', importateur_id: 'importateur.id', produit_id: 'produit.id',
        destinataire_id: 'destinataire.id', silo_id: 'silo.id',
        port_chargement_id: 'port_chargement.id', port_dechargement_id: 'port_dechargement.id'
    }
    //check if the quantite_bl in req.body correponds to the quantite_bl in navire_data

    // console.log('date arrivée est =', datearrivee)
    // const myquery = {date:'date_arrivee',navire_nom:'navire.nom',importateur_nom:'importateur.nom',produit_nom:'produit.nom', port_dechargement_nom:'port_dechargement.ville'}
    db('navire_data').innerJoin('navire', 'navire_data.navire_id', '=', 'navire.id')
        .innerJoin('importateur', 'navire_data.importateur_id', '=', 'importateur.id')
        .innerJoin('destinataire', 'navire_data.destinataire_id', '=', 'destinataire.id')
        .innerJoin('silo', 'navire_data.silo_id', '=', 'silo.id')
        .innerJoin('produit', 'navire_data.produit_id', '=', 'produit.id')
        .innerJoin('port_chargement', 'navire_data.port_chargement_id', '=', 'port_chargement.id')
        .innerJoin('port_dechargement', 'navire_data.port_dechargement_id', '=', 'port_dechargement.id')
        .distinct()
        .select(myquery)
        .where({
            'date_arrivee': datearrivee,
            'navire.nom': navire,
            // 'port_dechargement.ville': portdechrgmt,
            // 'port_chargement.ville': portchrgmt,
            // 'silo.nom': silo,
            'importateur.nom': importateur,
            'produit.nom': produit,
            'destinataire.nom': destinataire,
        })
        .then(data => {
            //Premier check si la date/navire/importateur/destin/produit existe dans navire_data
            if (data.length != 0) {
                
               console.log('data 0',data[0])
               var initialdataid = Object.assign({},data[0])
                
                // initialdataid.quantite_bl = parseInt(quantite_bl)
                // initialdataid.date_arrivee = datearrivee
                console.log('000-first initial data',initialdataid)

                var datatocheck =  Object.assign({},data[0])
                datatocheck.date_arrivee = datearrivee
                datatocheck.numero_camion = numero_camion
                datatocheck.camion_status = camion_status
                console.log('0-datatocheck',datatocheck)
                // datatocheck.tare = tare

                var datatoinsert =  Object.assign({},datatocheck)
                console.log('00-datatoinsert',datatoinsert)
                

                var initialdataid = data[0]
                
                // initialdataid.quantite_bl = parseInt(quantite_bl)
                // initialdataid.date_arrivee = datearrivee
                console.log('000-first initial data',initialdataid)

                db('chargement_camion').select().where(datatocheck)
                    .then(dataset => {
                        // console.log('1-dataset to checl if exists in chargement_camion', dataset)
                        if (dataset.length === 0) {
                            console.log('2-dataset length = 0', dataset)
                            datatoinsert.camion_timestamp = date_now
                            datatoinsert.bon_chargement = bon_chrgmt
                            datatoinsert.quantite_estimee = parseInt(quantite_estimee)
                            datatoinsert.poids_brut = poids_brut
                            datatoinsert.tare = tare
                            datatoinsert.quantite_bl = parseInt(quantite_bl)
                            datatoinsert.quantite_bl_restante = parseInt(quantite_bl_restante)
                            datatoinsert.quantite_bl_rest_estimee = parseInt(quantite_bl_rest_estimee) - parseInt(quantite_estimee)
                           
                            console.log('3-datatoinsert',datatoinsert)
                            db('chargement_camion').insert([datatoinsert])
                                .then(dataset => {
                                    console.log('4-once data inserted i get',dataset)
                                    if (datatoinsert.camion_status === 'Pointé') {
                                        var new_qty_estimated = datatoinsert.quantite_bl_rest_estimee
                                        console.log('4-bis initialdataid to check',data[0])
                                        console.log('4-bis datatoinsert to check',datatoinsert)
                                        console.log('4-bis datatocheck to check',datatocheck)
                                        console.log('4-bis status',datatoinsert.camion_status )
                                       
                                        console.log('4-bis quantity to modify',new_qty_estimated)
                                        db('navire_data').where(data[0])
                                            .update('quantite_restante_estimee', new_qty_estimated)
                                            .then(()=>console.log('5-callback once quantite updated in navire data Pointé'))
                                    } else if (datatoinsert.camion_status === 'Sorti') {
                                        var new_qty_restante = datatoinsert.quantite_bl_restante - (datatoinsert.poids_brut - datatoinsert.tare)
                                        var new_qty_rest_estimee = datatoinsert.quantite_bl_rest_estimee + datatoinsert.quantite_estimee - (datatoinsert.poids_brut - datatoinsert.tare)
                                        db('navire_data').where(initialdataid)
                                            .update({ 'quantite_restante': new_qty_restante, 'quantite_restante_estimee': new_qty_rest_estimee })
                                            .then(()=>console.log('6-callback once quantites updated in navire data Sorti'))
                                    }else{
                                        console.log('7-je n ai pas pensé à ça')
                                    }
                                    console.log('okokok')
                                    res.json({ status: 'ok' })
                                })
                                .catch(err => {
                                    console.log('bouhh', err)
                                    res.json({ status: 'error' })
                                })
                        }
                        else {
                            res.json({ status: 'data already inserted' })
                            // console.log("erroorrr data already in the dD", 'dataselect=', dataset)
                        }
                    })
                    .catch(err => {
                        console.log("first errooooooor", err)
                        res.json({ status: 'error' })
                    })

            } else {
                res.json({ status: 'data can not be inserted in DB' })
            }

        })
        .catch(err => {
            console.log(err)
            res.json({ status: 'error' })
        })

})

module.exports = router