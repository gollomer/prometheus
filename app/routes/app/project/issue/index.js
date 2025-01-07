/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import App from "prometheus/routes/app";
import { inject } from '@ember/service';
import { hashSettled } from 'rsvp';
import extractHashSettled from "prometheus/utils/rsvp/extract-hash-settled";

/**
 * The issues route
 *
 * @class Index
 * @namespace Prometheus.Routes
 * @module App.Project.Issue
 * @extends App
 * @author Hammad Hassan <gollomer@gmail.com>
 */
export default App.extend({

    /**
     * The trackedProject service provides id of the selected project.
     *
     * @property trackedProject
     * @type Ember.Service
     * @for Project
     * @private
     */
    trackedProject: inject(),    

    /**
     * We need to reload the model as the values related ot the page's data are
     * changed so we are relying on the queryParams provided by Ember to reload
     * the model as the following parameter are changed.
     *
     * @property queryParams
     * @type Object
     * @for Index
     * @private
     */
    queryParams:{
        sort:{
            refreshModel:true,
        },
        order:{
            refreshModel:true,
        },
        page:{
            refreshModel:true,
        },
        query:{
            refreshModel:true,
        }
    },

    /**
     * The field on which we want to sort by default
     *
     * @property sort
     * @type String
     * @for Index
     * @private
     */
    sort: 'Issue.issueNumber',

    /**
     * The order in which to sort by
     *
     * @property order
     * @type String
     * @for Index
     * @private
     */
    order: 'desc',

    /**
     * The default page that we need to load
     *
     * @property page
     * @type Integer
     * @for Index
     * @private
     */
    page: 1,

    /**
     * The default query that we need to load
     *
     * @property query
     * @type String
     * @for Index
     * @private
     */
    query: '',

    /**
     * These are the saved searches related to the issues
     *
     * @property savedsearches
     * @type Prometheus.Models.Savedsearch
     * @for Index
     * @private
     */
    savedsearches: null,

    /**
     * These are the saved searches related to the issues
     * that are publicly available but not created by currentUser
     *
     * @property publicsearches
     * @type Prometheus.Models.Savedsearch
     * @for Index
     * @private
     */
    publicsearches: null,

    /**
     * The current user
     *
     * @property currentUser
     * @type Prometheus.Models.User
     * @for Index
     * @private
     */
    currentUser: inject(),

    /**
     * The model for this route
     *
     * @method model
     * @param params
     * @return Prometheus.Models.Issue
     * @private
     */
    model:function(params){
        Logger.debug('AppIssueRoute::model()');
        Logger.debug(params);
        let _self = this;

        let query = null;

        // Load the data if are passed via the parameter
        if(params.sort){
            this.set('sort',params.sort);
        }
        if(params.order){
            this.set('order',params.order);
        }
        if(params.query === ''){
            this.set('query',null);
        } else if(params.query){
            query = params.query;
            this.set('query',params.query);
        }
        if(params.page){
            this.set('page',params.page);
        }

        // Get the projectId from the parent
        let projectId = this.trackedProject.getProjectId();
        Logger.debug('ProjectId : '+projectId);

        // Make sure that projectId is set for every query
        if(query === null){
            query = '(Issue.projectId : '+projectId+')';
        }
        else{
            query = '(('+query+') AND (Issue.projectId : '+projectId+'))';
        }
        Logger.debug(query);
        // Prepare the options
        let options = {
            query: query,
            rels: 'ownedBy,assignedTo,issuemilestone,project,createdBy,modifiedBy,reportedBy,issuetype',
            sort: this.sort,
            order: this.order,
            page: this.page,
        };

        // Retrieve the data
        let data = this.store.query('issue',options).catch((error) =>{
            _self.errorManager.handleError(error, {
                moduleName: "issue"
            });
        });

        return data;
    },

    /**
     * This function is called by Ember after the model function
     * has been called, we are using this function to return
     * Promises so that the route can wait until this data has been
     * retrieved.
     *
     * @method afterModel
     * @protected
     */
    afterModel(){
        let _self = this;
        let projectId = _self.trackedProject.getProjectId();
        
        let savedSearchesOption = {
            query: '((Savedsearch.relatedTo : issue) AND (Savedsearch.projectId : '+projectId+') AND (Savedsearch.createdUser : '+_self.get('currentUser.user.id')+'))',
            limit: -1
        };

        let publicSearchesOption = {
            query: '((Savedsearch.relatedTo : issue) AND (Savedsearch.projectId : '+projectId+') AND (Savedsearch.public : 1) AND (Savedsearch.createdUser !: '+_self.get('currentUser.user.id')+'))',
            limit: -1
        };

        return hashSettled({
            savedsearches: _self.store.query('savedsearch',savedSearchesOption),
            publicsearches: _self.store.query('savedsearch',publicSearchesOption)
        }).then(function(results){
            let data = extractHashSettled(results);
            _self.set('savedsearches',data.savedsearches.toArray());
            _self.set('publicsearches',data.publicsearches.toArray());
        }).catch((error) =>{
            _self.errorManager.handleError(error, {
                moduleName: "issue"
            });
        });

    },

    /**
     * This function is called by the route when it has created the controller and
     * the controller is ready to be setup with any data that we may need. We are
     * using this function in order to bind the model of the route to the model
     * of the controller.
     *
     * The setup controller is only called once and if the model is changed Ember
     * reflects the change in the controller as well.
     *
     * @method setupController
     * @param {Prometheus.Controllers.Issue} controller The controller object for the issues
     * @param {Prometheus.Models.Issue} model The model that is created by this route
     * @private
     */
    setupController:function(controller,model){
        let savedSearch = this.store.createRecord('savedsearch');
        controller.set('newSavedsearch',savedSearch);
        controller.set('savedsearches',this.savedsearches);
        controller.set('publicsearches',this.publicsearches);
        controller.set('model',model);
        controller.set('query',this.query);
        controller.set('sort',this.sort);
        controller.set('order',this.order);
        controller.set('page',this.page);
    },

});