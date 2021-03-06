/* global location, fetch */
import PropertyItemModel from "./ItemModel";

export default {

    Create(data = []) {
        return Object.assign(Object.create({data}), {}, this.methods);
    },

    methods: {

        models: [],

        search(query){
            // const full = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

            return fetch('/api/search/' + query)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    this.populate(response);
                    return this.models;
                })
                .catch((err) => {
                    throw err;
                });
        },

        populate(data){
            if (data.result_count > 0) {
                //TODO This doesn't work on IE, regardless of the babel presets or the polyfills I use. Find why.
                // for (let listing of data.listing) {
                //     this.add(listing);
                // }

                data.listing.forEach((listing) => {
                    this.add(listing);
                });
            }
        },

        add(data){
            const models = this.models;
            this.models = [...models, PropertyItemModel.Model(data)];
        }
    }

};
