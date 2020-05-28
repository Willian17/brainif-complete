import Toasted from 'vue-toasted'
import Vue from 'vue'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'msgSuccess',
    data => data.msg ? data.msg:'Operação realizada com sucesso',
    {type: 'success' , icon: 'check'}
)

Vue.toasted.register(
    'msgError',
    data => data.msg ? data.msg:'Opps... erro inesperado',
    {type: 'error' , icon: 'times'}
)