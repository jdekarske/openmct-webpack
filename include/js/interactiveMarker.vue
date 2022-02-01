<template>
	<div></div>
</template>

<script>
// inspired from https://github.com/hatchbed/vue-ros3djs
import * as ROS3D from 'ros3d';

export default {
	name: 'ros-interactive-marker',
	props: {
		topic: {
			type: String,
			require: true,
		},
	},
	mounted() {
		console.log(this.$parent);
		this.imClient = new ROS3D.InteractiveMarkerClient({
			ros: this.$parent.ros,
			tfClient: this.$parent.tfClient,
			topic: this.topic,
			camera: this.$parent.viewer.camera,
			rootObject: this.$parent.viewer.selectableObjects,
		});
	},
	beforeDestroy() {
		this.imClient.unsubscribe();
	},
};
</script>
