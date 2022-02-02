// inspired from https://github.com/hatchbed/vue-ros3djs
import * as ROS3D from 'ros3d'
import {onCleanup, createMemo} from 'solid-js'

import type * as ROSLIB from 'roslib'

export function InteractiveMarker(props: {
    topic: string
    ros: ROSLIB.Ros
    tfClient: ROSLIB.TFClient
    viewer: ROS3D.Viewer
}) {
    // This updates the imClient if props change.
    const imClient = createMemo<ROS3D.InteractiveMarkerClient | undefined>(previousImClient => {
        if (previousImClient) previousImClient.unsubscribe()

        return new ROS3D.InteractiveMarkerClient({
            ros: props.ros,
            tfClient: props.tfClient,
            topic: props.topic,
            camera: props.viewer.camera,
            rootObject: props.viewer.selectableObjects,
        })
    })

    onCleanup(() => {
        imClient().unsubscribe()
    })

    return null
}
