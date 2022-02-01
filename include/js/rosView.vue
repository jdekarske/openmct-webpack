<template>
	<div>
		<slot v-if="loaded"></slot>
	</div>
</template>

<script>
// inspired from https://github.com/hatchbed/vue-ros3djs
import * as ROS3D from 'ros3d';
import * as ROSLIB from 'roslib';

export default {
	name: 'ros-view',
	props: {
		ros: {
			type: Object,
			require: true,
		},
		fixedFrame: {
			type: String,
			default: 'world',
			require: true,
		},
	},
	data: () => ({
		viewer: null,
		tfClient: null,
		loaded: false,
		connected: false,
	}),
	mounted() {
		this.$el.id = 'viewer';

		// Create the main viewer.
		this.viewer = new ROS3D.Viewer({
			divID: this.$el.id,
			antialias: true,
			width: 700, //this.$el.clientWidth, //doesn't work, need a resize listener
			height: 700, //this.$el.clientHeight,
			cameraPose: {
				x: 6.5,
				y: 5,
				z: 0,
			},
		});

		// Setup a client to listen to TFs.
		this.tfClient = new ROSLIB.TFClient({
			ros: this.ros,
			angularThres: 0.01,
			transThres: 0.01,
			rate: 10.0,
			fixedFrame: this.fixedFrame,
		});
		console.log('mounted');
		console.log(this);

		// offsets mounting the child components so that we can create the viewer first
		this.loaded = true;
	},
	// add any other ros clients that are needed
	// dispose of stuff correctly
};
</script>

<style>
.html {
	resize: both;
	overflow: auto;
	height: 100px;
	display: block;
	width: 100px;
	border: 1px solid black;
}
</style>