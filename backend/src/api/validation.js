const existsOrError = (value , msg) => {
    if (!value) throw msg
    if(Array.isArray(value) && value.length === 0) throw msg
    if( typeof value === 'string' && !value.trim() ) throw msg
}

const notExistsOrError = (value , msg) => {
    try{
        existsOrError(value , msg)
    } catch(msg){
        return
    }
    throw msg
}

const equalsOrError = (valueA , valueB , msg) =>{
    if(valueA !== valueB) throw msg
}

const rightSizeOrError = (value , msg) =>{
    if(value.length < 8) throw msg
}
const ifmtEmailOrError = (email , msg) =>{
    const after = email.split('@')[1]
    if(after !== 'roo.ifmt.edu.br') throw msg
}

const yearOrError = (year , msg) =>{
    if(year != 1 && year != 2 && year != 3) throw msg
}

module.exports = {existsOrError , notExistsOrError , equalsOrError , rightSizeOrError , ifmtEmailOrError , yearOrError}