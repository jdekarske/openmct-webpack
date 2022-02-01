# OpenMCT Webpack
To test interactive marker in openmct:

In Astrobee container:
1. `roslaunch astrobee sim.launch dds:=false robot:=sim_pub rviz:=true`
2. `rosrun interactive_marker_teleop interactive_marker_teleop`
3. move interactive marker to origin (sorry)

In IUI Rosbridge container:
1. Install [interactive_marker_proxy](https://github.com/jdekarske/isaac_user_interface/blob/94c9da183053dfdcb55d870fd800b236d7faaaea/rosbridge/Dockerfile#L34) in rosbridge container.
2. In addition to standard entrypoint, run `rosrun interactive_marker_proxy proxy topic_ns:=/interactive_marker_teleop target_frame:=world`

In openmct-webpack (rosplugin branch):
1. `npm i && npm run start`
2. choose rosview from "create" menu in upper left of browser

Witness marker!
