<template>
	<Auth />
</template>
<script>
import { Auth, useAuthModule } from '@/modules/Auth/'

export default {
	name: 'AuthView',
	components: {
		Auth,
	},
	setup() {},
}
</script>