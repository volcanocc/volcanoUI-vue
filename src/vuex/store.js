import Vue from 'vue'
import Vuex from 'vuex'

import applicationState from './states'
import applicationActions from './actions'
import applicationGetters from './getters'
import applicationMutations from './mutations'

import module from './modules/module'

Vue.use(Vuex)

export default new Vuex.Store({
    state: applicationState,
    actions: applicationActions,
    getters: applicationGetters,
    mutations: applicationMutations,
    modules: {
        module
    }
})
