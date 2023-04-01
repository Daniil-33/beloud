<template>
	<div class="w-100 h-screen overflow-hidden">
		<Sidebar :items=items></Sidebar>

		<div class="ml-5 mt-5">
			<slot></slot>
		</div>
	</div>
</template>
<script>
import Sidebar from '../components/widgets/Sidebar.vue';

export default {
	name: 'DefaultLayout',
	components: {
		Sidebar
	},
	setup() {
		const items = [
			{ heading: 'General' },
			{ title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/dashboard' },
			{
				title: 'Projects',
				icon: 'mdi-folder-multiple-outline',
				children: [
					{ title: 'Project 1', path: '/projects/1' },
					{ title: 'Project 2', path: '/projects/2' },
				],
			},
			{ heading: 'Administration' },
			{ title: 'Users', icon: 'mdi-account-multiple', path: '/users' },
			{ title: 'Settings', icon: 'mdi-cog', path: '/settings' },
		]
		return {
			items
		}
	}
}
</script>