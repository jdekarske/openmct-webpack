// inspired from https://github.com/hatchbed/vue-ros3djs
import * as ROS3D from 'ros3d'
import * as ROSLIB from 'roslib'
import {onCleanup, onMount} from 'solid-js'
import {createMutable} from 'solid-js/store'

import type {JSX} from 'solid-js'

export function RosView(props: {
    ros: ROSLIB.Ros
    fixedFrame?: 'world' | 'some-other-frame' // | ...list known frame names here...
    children: (props: {viewer: ROS3D.Viewer; tfClient: ROSLIB.TFClient}) => JSX.Element
}) {
    const data = createMutable({
        viewer: null as ROS3D.Viewer | null,
        tfClient: null as ROSLIB.TFClient | null, // TFCLient type def is missing.
        loaded: false,
    })

    const divID = 'rosViewer'

    onMount(() => {
        // Create the main viewer.
        data.viewer = new ROS3D.Viewer({
            divID,
            antialias: true,
            // TODO update size using a resize listener (ResizeObserver)
            width: 700,
            height: 700,
            cameraPose: {
                x: 6.5,
                y: 5,
                z: 0,
            },
        })

        // Setup a client to listen to TFs.
        data.tfClient = new ROSLIB.TFClient({
            ros: props.ros,
            angularThres: 0.01,
            transThres: 0.01,
            rate: 10.0,
            fixedFrame: props.fixedFrame ?? 'world',
        })

        console.log('mounted')
        console.log(data)

        // offsets mounting the child components so that we can create the viewer first
        data.loaded = true
    })

    // add any other ros clients that are needed

    onCleanup(() => {
        // TODO dispose of stuff correctly
    })

    return (
        <div id={divID}>
            {data.loaded && props.children({viewer: data.viewer, tfClient: data.tfClient})}

            <style>{
                /*css*/ `
					.html {
						resize: both;
						overflow: auto;
						height: 100px;
						display: block;
						width: 100px;
						border: 1px solid black;
					}
				`
            }</style>
        </div>
    )
}
