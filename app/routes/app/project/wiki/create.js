/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import Ember from "ember";
import App from "../../../app";

/**
 * This is the create route for the wiki pages section
 *
 * It is loaded when a user tried to navigate to the route
 *
 * :projectId/wiki/create e.g. acme.projects4.me/app/123/wiki/create
 *
 * @class Create
 * @namespace Prometheus.Routes
 * @module App.Project.Wiki
 * @extends App
 * @author Hammad Hassan <gollomer@gmail.com>
 */
export default App.extend({

    /**
     * The data for the current route
     *
     * @property data
     * @type Object
     * @for Create
     * @private
     */
    data: null,

    /**
     * The current project
     *
     * @property project
     * @type Object
     * @for Create
     * @private
     */
    project: {},

    /**
     * The current user service
     *
     * @property currentUser
     * @type Ember.Service
     * @for Prometheus.Routes.Wiki.Create
     * @public
     */
    currentUser: Ember.inject.service(),

    /**
     * The setup controller function that will be called every time the user visits the module route,
     * this function is responsible for loading the required data for the route
     *
     * @method setupController
     * @param {Prometheus.Controllers.Wiki} controller the controller object for this route
     * @private
     */
    setupController:function(controller){
        this.module = 'Wiki';

        Logger.debug('AppProjectWikiCreateRoute::setupController');
        Logger.debug(this);

        var params = this.getParams();
        Logger.debug('The parameters are as follows');
        Logger.debug(params);

        this.project = this.store.findRecord('project',params.projectId,{rels:'none'});
        var currentUser = this.get('currentUser').loadUser();
        Logger.debug(currentUser);
        this.data = this.store.createRecord('wiki',{
            dateCreated:'CURRENT_DATETIME',
            dateModified:'CURRENT_DATETIME',
            deleted:0,
            createdUser:'1',
            modifiedUser:'1',
            status:'published',
            locked:0,
            upvotes:1,
            projectId:params.projectId,
            createdUserName: 'Hammad Hassan',
            modifiedUserName: 'Hammad Hassan',
        });
        Logger.debug(this.data);

        controller.set('model',this.data);
        controller.set('project',this.project);
        controller.set('module',this.module);
    },

    /**
     * This function retrieves the route parameters, Most of the wiki functionality
     * is similar so we one write it once and extends it for different routes.
     * In order to make sure that we are able to retrieve the correct parameters we
     * have exposed this function.
     *
     * @method getParams
     * @return {Object} params The parameters for this route
     * @private
     */
    getParams:function(){
        var params = {};
        params['projectId'] = this.paramsFor('app.project').projectId;
        return params;
    }
});
