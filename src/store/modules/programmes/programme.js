import { is } from 'ramda'

export default class Programme {
    constructor (programme = {}) 
    {
        this.id = is(String, programme.id) ? programme.id : programme.id,
        this.nom = is(String, programme.nom) ? programme.nom :  programme.nom,
        this.code = is(String, programme.code) ? parseInt(programme.code) : programme.code,
        this.description = is(String, programme.description) ? programme.description : programme.description,
        this.objectifGlobaux = is(String, programme.objectifGlobaux) ? programme.objectifGlobaux : programme.objectifGlobaux,
        this.budgetNational = is(String, programme.budgetNational) ? parseInt(programme.budgetNational) : programme.budgetNational,
        this.debut = is(Object, programme.debut) ? (new Date(programme.debut._date)).toISOString() : programme.debut,
        this.fin = is(Object, programme.fin) ? (new Date(programme.fin._date)).toISOString() : programme.fin,
        this.created_at = is(Object, programme.created_at) ? (new Date(programme.created_at._date)).toISOString() : programme.created_at
    }
}