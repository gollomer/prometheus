/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import Component from '@ember/component';
import { inject as service } from '@ember/service';

/**
 * This component is used to help the event handling of route request in the
 * tree-list
 *
 * @class TreeList
 * @namespace Prometheus.Components
 * @extends Ember.Component
 * @author Hammad Hassan <gollomer@gmail.com>
 */
export default Component.extend({

    /**
     * The router Service
     *
     * @property router
     * @type Prometheus.Services.Router
     * @for TreeList
     * @private
     */
    router: service(),

    /**
     * These are the evet handlers for the component.
     *
     * @property actions
     * @type Object
     * @for TreeList
     * @public
     */
    actions: {

        /**
         * Load a particular wiki page
         *
         * @method loadWiki
         * @param {String} wikiName The name of the wiki to which we need to navigate to
         * @public
         * @todo Trigger the notificaiton
         */
        loadWiki: function(wikiName) {
            // This route is not exposed by EmbberJS, we included this by utilizing
            // intializer. Normally this would not be required but the tree view
            // causes us to call the same component recursively and thus it becomes
            // very difficult to pass action context across
            this.router.transitionTo('app.project.wiki.page', wikiName);
        }

    }

});