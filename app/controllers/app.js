/* Licensing : http://legal.projects4.me/LICENSE.txt, please don't remove :) */
import Ember from "ember";

/**
  This the app controller. App is as the main route for the application's
  authenticated part

  @class AppController
  @extends Ember.Controller
  @author Hammad Hassan gollmer@gmail.com
*/

export default Ember.Controller.extend({

  /**
    The session service which is offered by ember-simple-auth that will be used
    in order to verfy whether the used is authenticated

    @property session
    @type Object
    @for AppController
    @public
  */
  session: Ember.inject.service('session'),

  /**
    The service that we use to maintain the currentUser

    @property currentUser
    @type Object
    @for AppController
    @public
  */
  currentUser: Ember.inject.service('current-user'),

  /**
    The events that this controller is listing to

    @property actions
    @type Object
    @for AppController
    @public
  */
  actions: {

    /**
      This function invalidates the session which effectively logs the user out
      of the application

      @method invalidateSession
      @public
    */
    invalidateSession() {
      this.get('session').invalidate();
    }
  }

});
