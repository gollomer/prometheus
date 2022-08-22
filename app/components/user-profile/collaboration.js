/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
*/

import Component from '@glimmer/component';

/**
 * This component is used to render daily collaboration of user on our system.
 *
 * @class UserProfileCollaborationComponent
 * @namespace Prometheus.Components
 * @extends Ember.Component
 * @author Rana Nouman <ranamnouman@yahoo.com>
 */
export default class UserProfileCollaborationComponent extends Component {

    /**
     * This function calculates and return the user collaboration value. 
     *
     * @method get
     * @public
     */
    get userCollaboration() {
        let numberOfComments = this.args.numberOfComments;
        const c = 13;
        let collaboratedValue = Math.floor(Math.pow(numberOfComments, 0.5) * c);
        (collaboratedValue >= 100) && (collaboratedValue = 100);
        return collaboratedValue;
    }
}
