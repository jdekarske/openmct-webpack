// tabs vue component openmct/src/plugins/tabs/components/tabs.vue
import Vue from 'vue';
import TabsComponent from 'MCT/src/plugins/tabs/components/tabs.vue';

// I want to show the tab but also log it.
Vue.config.optionMergeStrategies.myOption = (toVal, fromVal) => {
    return {
        ...toVal,
        ...fromVal
    };
};

// define a component that uses this mixin
var TrackedTabsComponent = Vue.extend({
    mixins: [TabsComponent],
    created: function () {
        console.log("subscribe here")
    },
    methods: {
        sendtoROS: function () {
            console.log("sending")
        }
    }
})


// tabs view openmct/src/plugins/tabs/tabs.js
function TrackedTabs(openmct) {
    return {
        key: 'trackedtabs',
        name: 'TrackedTabs',
        cssClass: 'icon-list-view',
        canView: function (domainObject) {
            return domainObject.type === 'trackedtabs';
        },
        canEdit: function (domainObject) {
            return domainObject.type === 'trackedtabs';
        },
        view: function (domainObject, objectPath) {
            let component;

            return {
                show: function (element, editMode) {
                    component = new Vue({
                        el: element,
                        components: {
                            TrackedTabsComponent: TrackedTabsComponent.default
                        },
                        data() {
                            return {
                                isEditing: editMode
                            };
                        },
                        provide: {
                            openmct,
                            domainObject,
                            objectPath,
                            composition: openmct.composition.get(domainObject)
                        },
                        template: '<tabs-component :isEditing="isEditing"></tabs-component>'
                    });
                },
                onEditModeChange(editMode) {
                    component.isEditing = editMode;
                },
                destroy: function (element) {
                    component.$destroy();
                    component = undefined;
                }
            };
        },
        priority: function () {
            return 1;
        }
    };
}

// tabs plugin /home/guy/code/astrobee_internship/isaac_data_interface/frontend/openmct/src/plugins/tabs/plugin.js
function TrackedTabsPlugin() {
    return function install(openmct) {
        openmct.objectViews.addProvider(new TrackedTabs(openmct));

        openmct.types.addType('trackedtabs', {
            name: "Tabs View",
            description: 'based off the built-in tabs view, but will send a message to a rostopic when tabs are switched.',
            creatable: true,
            cssClass: 'icon-tabs-view',
            initialize(domainObject) {
                domainObject.composition = [];
                domainObject.keep_alive = true;
            },
            form: [
                {
                    "key": "keep_alive",
                    "name": "Eager Load Tabs",
                    "control": "select",
                    "options": [
                        {
                            'name': 'True',
                            'value': true
                        },
                        {
                            'name': 'False',
                            'value': false
                        }
                    ],
                    "required": true,
                    "cssClass": "l-input"
                }
            ]
        });

    };
}

export default TrackedTabsPlugin;
