/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import Component from '@glimmer/component';
import MD from "../../utils/metadata/metadata";
import ENV from "prometheus/config/environment";
import { action } from '@ember/object';
import Logger from "js-logger";
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NavBarComponent extends Component {
    @service router;
    @tracked projectId;
    @service trackedProject;
    /**
     * This function fetches the navigation metaData and makes it available for display
     *
     * @method init
     * @public
     */
    constructor() {
        Logger.debug('NavBarComponent::init()');
        super(...arguments);
        this.metaData = MD.create().getViewMeta('Navigation', 'items');
        Logger.debug(this.metaData);
        this.appPrefix = ENV.api.prefix;
        this.pathname = this.router.location.location.pathname;
        this.projectId = this.trackedProject.projectId;
    }

    get projectList() {
        return this.args.projectList ?? '';
    }

    get currentUser() {
        return this.args.currentUser ?? '';
    }
    
    /**
     * The actions for the navigation bar, primarily used fo route transition
     *
     * @property actions
     * @type Object
     * @for NavBar
     * @public
     */

    /**
     * This function is used in order to handle navigation to our desired route
     *
     * @method navigate
     * @param {String} route
     * @param {Object} routeParams
     * @param {String} anchorRoute
     * @param {String} projectId
     * @public
     */
    @action navigate(route, routeParams, anchorRoute, projectId) {
        Logger.debug('A transition requested to route ' + route);
        if (projectId !== undefined) {
            if (routeParams === null) {
                routeParams = {};
            }
            routeParams['project_id'] = projectId;
        }
        this.pathname = `/  ${this.appPrefix} / + ${anchorRoute}`;
        if (routeParams !== undefined && routeParams !== null && routeParams !== '') {
            this.router.transitionTo(route, routeParams);
        }
        else {
            this.router.transitionTo(route);
        }
    }

    /**
     * This function is called when a project is selected
     *
     * @method projectChanged
     * @param {String} projectId The selected project
     * @public
     */
    @action projectChanged(project) {
        this.projectId = project.value;
        if (project.value !== undefined && project.value !== null && project.value !== '') {
            this.router.transitionTo('app.project', { project_id: project.value });
        }
    }
}
