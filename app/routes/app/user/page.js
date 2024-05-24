/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import App from "prometheus/routes/app";
import { hash } from 'rsvp';

/**
 * The user page
 *
 * @class Page
 * @namespace Prometheus.Routes
 * @module App.User
 * @extends App
 * @author Hammad Hassan <gollomer@gmail.com>
 */
export default App.extend({
    model(params) {
        Logger.debug('+Prometheus.Routes.App.User::afterModel()');
        let _self = this;
        let _userOptions = {
            query: `(User.id : ${params.user_id})`,
            rels: 'badgeLevels,badges,timeSpent,projects,openClosedProject,openClosedIssue,collaboration,latestProjects,latestIssues,mostWorkedMembers,recentActivities',
            limit: -1
        }

        Logger.debug('-Prometheus.Routes.App.User::afterModel()');
        return hash({
            user: _self.store.query('user', _userOptions)
        }).catch((error) => {
            _self.errorManager.handleError(error, {
                moduleName: 'user'
            });
        });
    },
    /**
     * The setupController hook.
     *
     * @method setupController
     * @param {Prometheus.Controllers.User} controller The controller object for this route
     * @private
     */
    setupController: function (controller, model) {
        Logger.debug('+Prometheus.Routes.App.User::setupController()');
        controller.set('model', model.user.objectAt(0));
        Logger.debug('-Prometheus.Routes.App.User::setupController()');
    }
});