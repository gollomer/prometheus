/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import DS from "ember-data";
import ENV from "prometheus/config/environment";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { singularize } from 'ember-inflector';

/**
 * This is the application adapter that fetches the information from the API.
 * In order to be able to handle data effectively we are using the JSONAPI
 * standards.
 *
 * @class Application
 * @namespace Prometheus.Adapter
 * @uses DataAdapterMixin
 * @todo retrieve the host name from the configurations.
 * @author Hammad Hassan <gollomer@gmail.com>
 */
export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{

    /**
     * The namespace of the api.
     *
     * @property namespace
     * @type String
     * @for ApplicationAdapter
     * @private
     */
    namespace:'api/v'+ENV.api.version,

    /**
     * The host name of the server where the API is hosted.
     *
     * @property host
     * @type String
     * @for ApplicationAdapter
     * @private
     * @todo Load from the configurations
     */
    host: ENV.api.host,

    /**
     * This function sets the access token in all the requests being
     * sent out
     *
     * @method authorize
     * @param xhr
     * @private
     */
    authorize(xhr) {
        let { access_token } = this.get('session.data.authenticated');
        xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
    },

    /**
     * Set the modelName to singular as that is what our server listens to
     *
     * @method pathForType
     * @param {String} modelName The model name that is being fetched
     * @return {String} modelName The singularized modelName
     * @for ApplicationAdapter
     * @private
     */
    pathForType: function(modelName) {
        return singularize(modelName);
    },

    /**
     * This function is called whenever an error message is returned by the server
     *
     * @property normalizeErrorResponse
     * @param {String} status The status code returned by the API
     * @for ApplicationAdapter
     * @private
     * @todo If the user is not authorized then take him to the singin page
     * @todo Take care of the refresh token
     */
    normalizeErrorResponse: function (status) {
        if (status === 401)
        {
            //Foundation.oAuth.clear();
            //Foundation.oAuth.route.transitionTo('signin');
            return false;
        }
    },
});
