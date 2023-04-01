<template>
	<!-- <v-card>
		<v-btn v-if="mini" absolute top right fab color="primary" @click="drawer = !drawer">
			<v-icon>
				mdi-menu
			</v-icon>
		</v-btn>

		<v-navigation-drawer
			v-model="drawer"
			app
			:mini-variant.sync="mini"
			:clipped="clipped"
			:permanent="permanent"
			:mini-variant-width="50"
		>
			<v-list dense>
				<template v-for="(item, i) in items">
					<v-list-item :key="i" v-if="item.heading">
						<v-list-item-title>
							{{ item.heading }}
						</v-list-item-title>
					</v-list-item>
					<v-list-group :key="i + 'a'" v-else-if="item.children" v-model="item.model" :prepend-icon="item.icon"
						no-action>
						<template v-slot:activator>
							<v-list-item-title>
								{{ item.title }}
							</v-list-item-title>
						</template>
						<v-list-item v-for="(child, j) in item.children" :key="j" link :to="child.path">
							<v-list-item-title>
								{{ child.title }}
							</v-list-item-title>
						</v-list-item>
					</v-list-group>
					<v-list-item :key="i + 't'" v-else link :to="item.path" :prepend-icon="item.icon">
						<v-list-item-title>
							{{ item.title }}
						</v-list-item-title>
					</v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>
	</v-card> -->
	<v-navigation-drawer
		rail
		permanent
		drawer
		class="h-screen d-flex flex-column main-sidebar"
	>
		<v-list-item
			class="mt-4"
			nav
			prepend-avatar="/icons/logo.svg"
		></v-list-item>
		<v-list
			item-value="value"
			density="compact"
			class="d-flex flex-column justify-center align-center"
		>
			Some
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'Sidebar',
	props: {
		items: {
			type: Array,
			required: true,
		},
	},
	// setup(props) {
	// 	const drawer = ref(false);
	// 	const mini = ref(true);
	// 	const clipped = ref(true);
	// 	const permanent = ref(false);

	// 	return {
	// 		drawer,
	// 		mini,
	// 		clipped,
	// 		permanent,
	// 	};
	// },
};
</script>

<style lang="scss">
.v-navigation-drawer--mini-variant {
	border-right: 1px solid rgba(0, 0, 0, 0.12);
}

.main-sidebar {
	.main-sidebar-item {
		min-height: 36px;
	}
	&.full-screen {
		display: none;
	}
}

.navigation-tooltip.v-tooltip {
	.v-overlay__content {
		position: relative;
		background: #3f464e !important;

		&:after {
			content: '';
			position: absolute;
			top: 50%;
			left: 0;
			height: 8px;
			width: 8px;
			background: inherit;
			transform: translate(-50%, -50%) rotate(45deg);
		}
	}
}
</style>
