<template>
	<div class="h-100 w-100 d-flex align-center justify-center">
		<div class="auth bg-white rounded overflow-hidden">
			<v-tabs
				fixed-tabs
				rounded
				bg-color="secondary"
				v-model="tab"
			>
				<v-tab
					v-for="tab in tabs"
					:key="tab.value"
					:value="tab.value"
				>
					{{ tab.title }}
				</v-tab>
			</v-tabs>

			<v-window v-model="tab">
				<v-window-item :value="tabs[0].value">
					<LoginForm />
				</v-window-item>

				<v-window-item :value="tabs[1].value">
					<RegisterForm />
				</v-window-item>
			</v-window>
		</div>
	</div>
</template>
<script>
import LoginForm from './forms/LoginForm.vue';
import RegisterForm from './forms/RegisterForm.vue';

import { ref, onBeforeMount } from 'vue'

import useAuth from '../composables/useAuth';

export default {
	name: 'Auth',
	components: {
		LoginForm,
		RegisterForm,
	},
	setup() {
		const tabs = [
			{
				title: 'Login',
				value: 'login',
			},
			{
				title: 'Register',
				value: 'register',
			}
		];
		const tab = ref(tabs[0].value);

		const { tryAutoLogin } = useAuth();

		onBeforeMount(() => {
			tryAutoLogin();
		});

		return {
			tabs,
			tab,
		}
	},
}
</script>

<style>
.auth {
	max-width: 500px;
	width: 100%;
}
</style>