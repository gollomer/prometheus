import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
    "dateCreated": "2017-12-22 08:08:11",
    "dateModified": "2017-12-22 08:08:11",
    "deleted": "0",
    name(i) {
        return `Dashboard_${i}`;
    },
    userId(i) {
        return `${++i}`;
    },
    "widgets": "issuesToday, weeklyMilestones"
});
