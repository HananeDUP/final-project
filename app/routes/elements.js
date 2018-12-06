const express = require('express');
const router = express.Router();
const db = require('.././variables/database')

router.get('/navire_liste',(req,res,next)=>{
    db('navire').select("nom")
    .then(data=>{
        console.log("data navire", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/importateur_liste',(req,res,next)=>{
    db('importateur').select("nom")
    .then(data=>{
        console.log("data importateur", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/destinataire_liste',(req,res,next)=>{
    db('destinataire').select("nom")
    .then(data=>{
        console.log("data destinataire", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/produit_liste',(req,res,next)=>{
    db('produit').select("nom")
    .then(data=>{
        console.log("data produit", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/port_chrgmt_liste',(req,res,next)=>{
    db('port_chargement').select("ville")
    .then(data=>{
        console.log("data port_chargement", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/port_dechrgmt_liste',(req,res,next)=>{
    db('port_dechargement').select("ville")
    .then(data=>{
        console.log("data port_dechargement", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/silo_liste',(req,res,next)=>{
    db('silo').select("nom")
    .then(data=>{
        console.log("data silo", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/camion_liste',(req,res,next)=>{
    db('camion').select("nom")
    .then(data=>{
        console.log("data camion", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/last_date',(req,res,next)=>{
    db('navire_data_raw').select("date_arrivee").limit(1).orderBy('date_arrivee', 'desc')
    .then(data=>{
        console.log("last date", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.post('/data_by_date', (req, res, next) => {
    const datearrivee = req.body.arrivee
    console.log('date arrivée est =', datearrivee)
    const myquery = { date: 'date_arrivee', navire_nom: 'navire.nom', importateur_nom: 'importateur.nom', 
    destinataire_nom: 'destinataire.nom', produit_nom: 'produit.nom', silo_nom:'silo.nom',
    port_chargement_nom: 'port_chargement.ville',port_dechargement_nom: 'port_dechargement.ville',
    quantite_bl:'quantite_bl',quantite_restante:'quantite_restante',quantite_restante_estimee:'quantite_restante_estimee' }
    db('navire_data').innerJoin('navire', 'navire_data.navire_id', '=', 'navire.id')
        .innerJoin('importateur', 'navire_data.importateur_id', '=', 'importateur.id')
        .innerJoin('destinataire', 'navire_data.destinataire_id', '=', 'destinataire.id')
        .innerJoin('silo', 'navire_data.silo_id', '=', 'silo.id')
        .innerJoin('produit', 'navire_data.produit_id', '=', 'produit.id')
        .innerJoin('port_chargement', 'navire_data.port_chargement_id', '=', 'port_chargement.id')
        .innerJoin('port_dechargement', 'navire_data.port_dechargement_id', '=', 'port_dechargement.id')
        .distinct()
    // db('navire_data_raw')
        .select(myquery)
        .where({ 'date_arrivee': datearrivee })
        .then(data => {
            // console.log('data in server side is :', data)
            res.json({ data })
        })
        .catch(err => res.json({ status: err }))
})

router.post('/camion_list_by_dest',(req,res,next)=>{
    const destinataire=req.body.destinataire
    const produit=req.body.produit
    const datearrivee=req.body.date_arrivee
    const navire=req.body.navire
    const importateur=req.body.importateur
    console.log('destinataire est ',destinataire)
    console.log('produit',produit,'navire',navire,'date arrivée',datearrivee,'importateur',importateur)
    db('camion')
    .innerJoin('destinataire', 'camion.destinataire_id', '=', 'destinataire.id')
    .innerJoin('produit', 'camion.produit_id', '=', 'produit.id')
    // .leftOuterJoin('chargement_camion','chargement_camion.numero_camion','=','camion.numero_camion')
    .leftOuterJoin('chargement_camion', function() {
        this.on('chargement_camion.numero_camion','=','camion.numero_camion').onBetween('chargement_camion.date_arrivee',[datearrivee,datearrivee])
      })
    .distinct()
    .select('camion.numero_camion','camion_status') 
    .where({
        'destinataire.nom':destinataire,
        'produit.nom':produit
        // 'date_arrivee':datearrivee
    })
    .then(data=>{
        console.log("1 data camion", data)
        // let newarray_camion=data.map(elem=>elem.numero_camion)
        // db('chargement_camion')
        // .innerJoin('navire', 'chargement_camion.navire_id', '=', 'navire.id')
        // .innerJoin('importateur', 'chargement_camion.importateur_id', '=', 'importateur.id')
        // .innerJoin('destinataire', 'chargement_camion.destinataire_id', '=', 'destinataire.id')
        // .innerJoin('produit', 'chargement_camion.produit_id', '=', 'produit.id')
        // .distinct()
        // .select('numero_camion','camion_status').whereIn('numero_camion',newarray_camion)
        // .andWhere({
        //     'navire.nom':navire,
        //     'importateur.nom':importateur,
        //     'date_arrivee':datearrivee,
        //     'destinataire.nom':destinataire,
        //     'produit.nom':produit
        // })
        // .then(dataset=>{
        //     if(dataset.length===0){
        //         let newarray={}
        //         newarray.numero_camion=dataset.map(elem=>elem.numero_camion);
        //         newarray.camion_status='Pas encore commencé';
        //         console.log('1 data dans chargement camion newarray',newarray)
        //         res.json({newarray})
        //     }else if(dataset.length==data.length){
        //         dataset
        //         console.log('2 data dans chargement camion newarray',dataset)
        //         res.json({dataset})
        //     }else{
        //         let newarray=dataset.slice()
        //         newarray.map(elem=>
        //             {

        //             })
        //     }
        //     console.log('2 data dans chargement camion newarray',data)
        //     res.json({data})
        //     console.log('3 data dans chargement camion',data)
        // })
        // .catch(err=>console.log("errrrroooooorr chargement camion"))
        // res.json({data})
        res.json({data})
    })
    .catch(err=>console.log(err))
})

module.exports=router;