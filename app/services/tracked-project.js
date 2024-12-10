/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

/**
 * This is a service that provides id of selected project. This service can be injected
 * anywhere in the application
 *
 * @class TrackedProject
 * @namespace Prometheus.Services
 * @extends Service
 * @author Hammad Hassan <gollomer@gmail.com>
 */

export default class TrackedProjectService extends Service {
    /**
     * Id of selected project
     *
     * @property id
     * @type String
     * @for TrackedProject
     * @public
     */
    @tracked id = this.getProjectId();

    /**
     * This function returns projectId
     *
     * @method get
     * @public
     */
    getProjectId() {
        let projectId = sessionStorage.getItem('projectId');
        if (projectId) {
            return projectId;
        }
    }

    /**
     * This function set the property "projectId"
     *
     * @method set
     * @public
     */
    setProjectId(projectId) {
        this.id = projectId;
        sessionStorage.setItem('projectId', projectId);
    }
}