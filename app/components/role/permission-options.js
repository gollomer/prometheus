/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * This component is used to render dropdown containing the list of available options
 * that the permission have.
 *
 * @class RolePermissionOptionsComponent
 * @namespace Prometheus.Components
 * @extends Ember.Component
 * @author Rana Nouman <ranamnouman@gmail.com>
 */
export default class RolePermissionOptionsComponent extends Component {

    /**
     * This function is used to update the access level of permission.
     * 
     * @param {*} permission 
     * @param {*} flag 
     * @param {*} evt 
     * @method updateAccessLevel
     */
    @action updateAccessLevel(permission, flag, evt) {
        permission[flag] = evt.target.value;
    }
}
