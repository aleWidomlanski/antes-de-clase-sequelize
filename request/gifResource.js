let axios = require('axios')
let defaults = require('./default')

const url = 'gifs/'

module.exports = {
    random: function() {
        return axios({
            ...defaults,
            method: 'GET',
            url: url + "random",
            params: {

            }
        })
    },
    trending: function() {
        return axios({
            ...defaults,
            method: 'GET',
            url: url + "trending",
            params: {
                api_key: "ycpvPJY4HY4tgjD5g27HWLoFv9STN213"
            }
        })

    },
    search: function(consulta) {

    },
    getById: function(id) {

    }
}
