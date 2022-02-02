import {HelloWorld} from './HelloWorld'
import {render} from 'solid-js/web'

function HelloPlugin(openmct) {
    openmct.types.addType('hello-world', {
        name: 'Hello World',
        description: 'An introduction object',
        creatable: true,
    })
    openmct.objectViews.addProvider({
        name: 'demo-provider',
        key: 'hello-world',
        cssClass: 'icon-packet',
        canView: function (d) {
            return d.type === 'hello-world'
        },
        // eslint-disable-next-line no-unused-vars
        view: function (domainObject) {
            let unmount: () => void

            return {
                show(container) {
                    unmount = render(HelloWorld, container)
                },
                destroy() {
                    unmount()
                },
            }
        },
    })
}

export default HelloPlugin
