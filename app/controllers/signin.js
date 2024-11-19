/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/**
 * This the signin controller.
 *
 * @class Signin
 * @namespace Prometheus.Controller
 * @extends Ember.Controller
 * @author Hammad Hassan gollmer@gmail.com
 */
export default class SignInController extends Controller {

    /**
     * The intl library service that is used in order to get the translations
     *
     * @property intl
     * @type Ember.Service
     * @for Prometheus.Controllers.Prometheus
     * @public
     */
    @service('intl') intl;

    /**
     * The session service which is offered by ember-simple-auth that will be used
     * in order to verfy whether the used is authenticated
     *
     * @property session
     * @type Object
     * @for Signin
     * @public
     */
    @service('session') session;

    /**
     * This property is used to store user's name.
     *
     * @property username
     * @type String
     * @for Signin
     * @public
     */
    @tracked username = "";

    /**
     * The property is used to store user's password.
     *
     * @property password
     * @type String
     * @for Signin
     * @public
     */
    @tracked password = "";

    /**
     * This property is used to store error message generated while user is signing in
     * to the application, if something went wrong.
     *
     * @property errorMessage
     * @type String
     * @for Signin
     * @public
     */
    @tracked errorMessage = "";

    /**
     * This function invalidates the session which effectively logs the user out
     * of the application and if user is authenticated then we'll route user to
     * "app" route
     *
     * @method authenticate
     * @public
     */
    @action async authenticate() {
        let _self = this;
        let username = _self.username;
        let password = _self.password;

        await _self.session.authenticate('authenticator:oauth2', username, password).then(
            () => {
                if (_self.session.isAuthenticated) {
                    localStorage.removeItem('projectId');
                    //getting requested url when user was unauthenticated
                    let oldRequestedUrl = _self.session.oldRequestedUrl;
                    //if requested url is present then route to that url otherwise route user to /app
                    let urlToRoute = (oldRequestedUrl && oldRequestedUrl != '/') ? oldRequestedUrl : 'app';

                    _self.session.handleAuthentication(urlToRoute);
                }
            },
            (response) => {
                new Messenger().post({
                    message: _self.intl.t(`views.signin.${response.error}`),
                    type: 'error',
                    showCloseButton: true
                });
            }
        );
    }

    /**
     * This property returns the boolean value to set the "Remember me" checkbox.
     * 
     * @property rememberMe
     * @type Boolean
     * @for Signin
     */
    get rememberMe() {
        let rememberMe = localStorage.getItem('remember_me');

        // If rememberMe is null, set remember_me property into localstorage
        if (rememberMe === null) {
            localStorage.setItem('remember_me', false);
        }

        return (localStorage.getItem('remember_me') === 'true') ? true : false;
    }

    /**
     * This function is used to set remember me property in local storage.
     * 
     * @method setRememberMe
     * @param {String} value 
     */
    @action setRememberMe(value) {
        localStorage.setItem('remember_me', value.target.checked);
    }
}