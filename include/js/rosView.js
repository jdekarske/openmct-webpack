import Vue from 'vue';
import * as ROSLIB from 'roslib';
import rosView from './rosView.vue';
import rosInteractiveMarker from './interactiveMarker.vue'

export default function ROSViewPlugin() {
    return function install(openmct) {
        openmct.types.addType('rosView', {
            name: 'ROS View',
            description: 'A 3D scene view driven by ros3djs',
            creatable: true
        });
        openmct.objectViews.addProvider({
            name: "rosView-provider",
            key: "rosView",
            cssClass: "icon-packet",
            canView: function (d) {
                return d.type === 'rosView';
            },
            // eslint-disable-next-line no-unused-vars
            view: function (domainObject) {
                // make a component with a view and interactive marker child
                var vm;

                return {
                    show: function (container) {
                        vm = new Vue({
                            components: {
                                rosView,
                                rosInteractiveMarker
                            },
                            data: () => ({
                                ros: null,
                                connected: false
                            }),
                            template: '<rosView :ros="ros" v-if="connected" ><rosInteractiveMarker topic="/interactive_marker_teleop" /></rosView>',
                            mounted() {
                                this.ros = new ROSLIB.Ros({
                                    url: 'ws://localhost:9090'
                                });
                                this.ros.on('connection', () => {
                                    console.log("connected");
                                    this.connected = true;
                                });
                            }
                        });
                        container.appendChild(vm.$mount().$el);
                    },
                    // eslint-disable-next-line no-unused-vars
                    destroy: function (container) {
                        vm.$destroy();
                    }
                };
            }
        });

    };
}
