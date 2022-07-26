import { is, isEmpty } from 'ramda'

export default class Pap {
    constructor (pap = {}) 
    {
        this.id = is(String, pap.id) ? pap.id : pap.id,
        this.nom = is(String, pap.nom) ? pap.nom :  pap.nom,
        this.prenoms = is(String, pap.prenoms) ? pap.prenoms :  pap.prenoms,
        this.contact = is(String, pap.contact) ? pap.contact :  pap.contact,
        this.annee = is(String, pap.annee) ? parseInt(pap.annee) : pap.annee,
        this.bailleur = is(Object, pap.bailleur) ? (pap.bailleur) : null,
        this.baiileurId = is(String, pap.baiileurId) ? pap.baiileurId : pap.baiileurId,
        this.created_at = is(Object, pap.created_at) ? (new Date(pap.created_at._date)).toISOString() : pap.created_at
    }
}