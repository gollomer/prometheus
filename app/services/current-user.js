/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

/* Licensing : http://legal.projects4.me/LICENSE.txt, please don't remove :) */
import Ember from 'ember';

const { inject: { service } } = Ember;

/**
  This is a service that provides currentUser. This service can be injected
  anywhere in the application

  @class CurrentUserService
  @extends Ember.service
  @author Hammad Hassan gollomer@gmail.com
*/
export default Ember.Service.extend({

  /**
    The session service

    @property session
    @type Service
    @for CurrentUserService
    @private
  */
  session: service('session'),

  /**
    The store is injected as a service

    @property store
    @type Service
    @for CurrentUserService
    @private
  */
  store: service(),

  /**
    Tis function is called to load the currentUser

    @method loadUser
    @public
  */
  loadUser:function(){
    if (this.get('session.isAuthenticated')) {
        // Retrieve the current user's object from the API
        return this.get('store').find('user', 'me').then((user) => {
        // Set the retrieved user in the current object
        this.set('user', user);
      });
    }
  }
});
