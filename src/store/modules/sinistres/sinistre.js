import { is } from 'ramda'

export default class Sinistre {
    constructor (sinistre = {}) 
    {
        this.id = is(Number, sinistre.id) ? parseInt(sinistre.id) : sinistre.id,
        this.nom = sinistre.nom,
        this.prenoms = sinistre.prenoms,
        this.contact = sinistre.contact,
        this.annee = sinistre.annee,
        this.created_at = is(Object, sinistre.created_at) ? (new Date(sinistre.created_at._date)).toISOString() : sinistre.created_at
    }
}