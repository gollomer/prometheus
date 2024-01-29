/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import getCurrentUrl from 'prometheus/utils/location/current-url'
import { hash } from 'rsvp';

/**
 * The loading assets route.
 * 
 * @class AppLoadingAssetsRoute
 * @namespace Prometheus.Routes
 * @extends Ember.Route
 * @author Rana Nouman <ranamnouman@gmail.com>
 */
export default class AppLoadingAssetsRoute extends Route {
    /**
     * The current user of the application
     *
     * @property currentUser
     * @type Ember.Service
     * @for AppLoadingAssetsRoute
     * @public
     */
    @service currentUser;

    /**
     * The Ember router service provides access to route
     *
     * @property router
     * @type Ember.Service
     * @for AppLoadingAssetsRoute
     * @public
     */
    @service router;

    /**
     * The session service which is offered by ember-simple-auth that will be used
     * in order to verify whether the used is authenticated
     *
     * @property session
     * @type Ember.Service
     * @for AppLoadingAssetsRoute
     * @public
     */
    @service session;

    /**
     * The settings service maintains all of the system level configurations.
     * 
     * @property settings
     * @type Ember.Service
     * @for AppLoadingAssetsRoute
     * @public
     */
    @service settings;

    /**
     * This method is called by ember when we enter this route and returns
     * resolved promises to the setupController function. In this method we're
     * fetching loggedin user model by using currentUser service. We'll fetch
     * more things inside this model hook infuture if our application needs some
     * pre-loaded data to use.
     * 
     * @method model
     * @returns Promise
     * @protected
     */
    model() {
        return hash({
            "user": this.currentUser.loadUser(),
            "settings": this.settings.loadSettings()
        });
    }

    /**
     * This function is used to set property to controller. We are setting dataLoaded
     * property to true and after that transitioning user to app route.
     *
     * @method setupController
     * @param {Prometheus.Controllers.LoadingAssets} controller
     * @protected
     */
    setupController(controller) {
        controller.set('dataLoaded', true);
        let url = getCurrentUrl(this.router);

        if (this.session.oldRequestedUrl) {
            url = this.session.oldRequestedUrl;
            delete this.session['oldRequestedUrl'];
        }

        (url === '/') && (url = 'app');
        this.router.transitionTo(url);
    }
}
