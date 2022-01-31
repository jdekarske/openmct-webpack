import Vue from 'vue';
import HelloWorld from './HelloWorld.vue';

function SimpleVuePlugin() {
    return function install(openmct) {
        openmct.types.addType('hello-world', {
            name: 'Hello World',
            description: 'An introduction object',
            creatable: true
        });
        openmct.objectViews.addProvider({
            name: "demo-provider",
            key: "hello-world",
            cssClass: "icon-packet",
            canView: function (d) {
                return d.type === 'hello-world';
            },
            // eslint-disable-next-line no-unused-vars
            view: function (domainObject) {
                var vm;

                return {
                    show: function (container) {
                        vm = new Vue(HelloWorld);
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

export default SimpleVuePlugin;