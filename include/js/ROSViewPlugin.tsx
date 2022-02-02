import * as ROSLIB from 'roslib'
import {RosView} from './RosView'
import {InteractiveMarker} from './InteractiveMarker'
import {render} from 'solid-js/web'
import {createSignal, onCleanup, Show} from 'solid-js'

export default function ROSViewPlugin(openmct) {
    openmct.types.addType('rosView', {
        name: 'ROS View',
        description: 'A 3D scene view driven by ros3djs',
        creatable: true,
    })
    openmct.objectViews.addProvider({
        name: 'rosView-provider',
        key: 'rosView',
        cssClass: 'icon-packet',
        canView(d) {
            return d.type === 'rosView'
        },
        // eslint-disable-next-line no-unused-vars
        view(domainObject) {
            let unmount: () => void

            return {
                show(container: HTMLDivElement) {
                    unmount = render(() => {
                        const ros = new ROSLIB.Ros({
                            url: 'ws://localhost:9090',
                        })

                        const [connected, setConnected] = createSignal(false)

                        ros.on('connection', () => {
                            console.log('connected')
                            setConnected(true)
                        })

                        onCleanup(() => {
                            // TODO cleanup
                            console.log(ros)
                        })

                        return (
                            <Show when={connected()} fallback={<h1>Loading...</h1>}>
                                <RosView ros={ros}>
                                    {props => (
                                        <InteractiveMarker
                                            topic="/interactive_marker_teleop"
                                            ros={ros}
                                            viewer={props.viewer}
                                            tfClient={props.tfClient}
                                        />
                                    )}
                                </RosView>
                            </Show>
                        )
                    }, container)
                },
                destroy() {
                    unmount()
                },
            }
        },
    })
}
