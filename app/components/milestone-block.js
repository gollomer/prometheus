/*
 * Projects4Me Copyright (c) 2017. Licensing : http://legal.projects4.me/LICENSE.txt. Do not remove this line
 */

import _ from "lodash";
import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';

/**
 * This component is used to render different milestone blocks for the system
 * There is only one component and it points to differnt tempalate dynamically
 * based on the input parameters
 *
 * @class MilestoneBlock
 * @namespace Prometheus.Components
 * @extends Ember.Component
 * @author Hammad Hassan <gollomer@gmail.com>
 */
export default Component.extend({

    /**
     * The intl library service that is used in order to get the translations
     *
     * @property intl
     * @type Ember.Service
     * @for MilestoneBlock
     * @private
     */
    intl: inject(),

    /**
     * This is the layout name that determines the HBS file to be rendered, we are
     * using this so that we can load milestone block dynamically without having to
     * check for the type using if else statements that can be very taxing
     *
     * @property layoutName
     * @type function
     * @for MilestoneBlock
     * @private
     */
    layoutName: computed('milestone', 'model', function() {
        let milestone = this.milestone;
        let status = milestone.get('status');
        let progress = 0;
        let template;

        // Calculate the progres
        if (milestone.get('issues.length') > 0)
        {
            let closed = 0;
            closed += milestone.get('issues').filterBy('status','done').length;
            closed += milestone.get('issues').filterBy('status','complete').length;
            closed += milestone.get('issues').filterBy('status','closed').length;
            closed += milestone.get('issues').filterBy('status','deferred').length;
            progress = _.round((closed/milestone.get('issues.length')) * 100);
        }

        // Set the milestone progress
        milestone.set('progress',progress);

        // Check if milestone is overdue
        if (status === 'in_progress' || status === 'planned')
        {
            let currentDate = luxon.DateTime.now();
            let milestoneEndDate = luxon.DateTime.fromFormat(milestone.get('endDate'), 'yyyy-MM-dd');
            if (currentDate >= milestoneEndDate)
            {
                status = 'overdue';
            }
        }

        // Set the template name
        template = 'components/milestone-blocks/'+status;

        if (Prometheus.__container__.lookup('template:'+template) === undefined) {
            template = 'components/milestone-blocks/index';
        }
        return template;
    }),

    /**
     * This function is called by Ember after it has rendered the HTML elements in the view, we
     * use this function in order to handle popover messages
     *
     * @method didInsertElement
     * @public
     */
    didInsertElement(){
        $('#'+this.elementId+' [data-toggle="popover"]').popover();
    },

    /**
     * This function is called by Ember when it is about to destroy the HTML elements rendered, we
     * use this function in order to destroy the popover messages
     *
     * @method willDestroyElement
     * @public
     */
    willDestroyElement(){
        $('#'+this.elementId+' [data-toggle="popover"]').popover('destroy');
    }

});