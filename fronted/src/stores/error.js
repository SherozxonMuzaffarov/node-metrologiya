//stores/error.js

import { defineStore } from 'pinia'

export const useErrorStorage = defineStore('error', {
    state: () =>({
        error: null
    }),

    actions: {
        setError(error) {
            this.error = error
            setTimeout(() => {
                this.clearError()
            }, 5000);
        },

        clearError(){
            this.error = null
        }
    }
})
