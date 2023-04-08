<template>
	<div v-html="icon"></div>
</template>
<script>
import iconHelper from '@/shared/helpers/iconHelper';
import { computed } from 'vue';

export default {
	name: 'UIIcon',
	props: {
		icon: {
			type: String,
			required: true
		},
		color: {
			type: String,
			default: 'primary'
		},
	},
	setup(props) {
		const icon = computed(() => iconHelper[props.icon]);

		return {
			icon
		}
	},
}
</script>
