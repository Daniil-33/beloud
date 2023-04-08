<template>
	<v-app>
		<v-main>
			<component :is="layoutName">
				<router-view />

				<template v-slot:player>
					<Player />
				</template>
			</component>
		</v-main>
	</v-app>
</template>
<script>
import { Auth, useAuthModule } from '@/modules/Auth/'
import { Player } from '@/modules/Player/'

import DefaultLayout from './shared/layouts/DefaultLayout.vue';
import EmptyLayout from './shared/layouts/EmptyLayout.vue';

import { computed } from 'vue';

export default {
	name: 'App',
	components: {
		Auth,
		DefaultLayout,
		EmptyLayout,
		Player,
	},
	setup() {
		const { isAuth } = useAuthModule();

		const layoutName = computed(() => {
			return isAuth.value ? DefaultLayout : EmptyLayout;
		});

		return {
			isAuth,
			layoutName
		};
	}
}
</script>
<style lang="scss">
@import '@/assets/scss/global.scss';
html {
	overflow-y: hidden !important;
}
</style>
