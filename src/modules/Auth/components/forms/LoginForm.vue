<template>
	<v-container>
		<v-row justify="center">
			<v-col xs="12" sm="12" md="12">
				<v-card>
					<v-card-title class="headline">Login</v-card-title>

					<v-form ref="form">
						<v-card-text>
							<v-text-field
								:error="!formManager.email.$valid && formManager.email.$touched"
								:error-messages="[
									...(formManager.email.$errors.required && formManager.email.$touched ? ['This field is required'] : []),
									...(formManager.email.$errors.email && formManager.email.$touched ? ['Email is not valid'] : []),
								]"
								v-model="formManager.email.model"
								label="Email"
								type="email"
								@blur="formManager.email.onFieldBlur"
							/>

							<v-text-field
								:error="!formManager.password.$valid && formManager.password.$touched"
								:error-messages="[
									...(formManager.password.$errors.required && formManager.password.$touched ? ['This field is required'] : []),
								]"
								v-model="formManager.password.model"
								label="Password"
								type="password"
								@blur="formManager.password.onFieldBlur"
							/>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn color="accent" @click="onSubmit">Login</v-btn>
						</v-card-actions>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import useAuth from '../../composables/useAuth';
import FormManager from '@/shared/services/formManager/formManagerService';
import { required, email } from '@/shared/services/formManager/formValidators';

export default {
	name: 'LoginForm',
	setup(props, { expose }) {
		const { login } = useAuth();

		const formOptions = {
			fields: {
				email: {
					value: '',
					validators: {
						required: v => required(v),
						email: v => email(v),
					},
				},
				password: {
					value: '',
					validators: {
						required: v => required(v),
					},
				},
			},
		};

		const formManager = FormManager(formOptions);

		const onSubmit = () => {
			if (!formManager.validateForm()) return

			login(formManager.getFormValues());
		};

		const resetForm = () => {
			formManager.reset();
		};

		expose({
			resetForm,
		});

		return {
			formManager,
			onSubmit
		}
	},
};
</script>

<style>

</style>