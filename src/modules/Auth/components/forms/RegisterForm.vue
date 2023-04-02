<template>
	<v-container>
		<v-row justify="center">
			<v-col xs="12" sm="12" md="12">
				<v-card>
					<v-card-title class="headline">Register</v-card-title>
					<v-form ref="form">
						<v-card-text>
							<v-text-field
								:error="!formManager.name.$valid && formManager.name.$touched"
								:error-messages="[
									...(formManager.name.$errors.required && formManager.name.$touched ? ['This field is required'] : []),
									...(formManager.name.$errors.minLength && formManager.name.$touched ? ['Name must include at least 3 characters'] : []),
								]"
								v-model="formManager.name.model"
								label="Name"
								@blur="formManager.name.onFieldBlur"
							/>

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
									...(formManager.password.$errors.minLength && formManager.password.$touched ? ['Password must include at least 8 characters'] : []),
								]"
								v-model="formManager.password.model"
								label="Password"
								type="password"
								@blur="formManager.password.onFieldBlur"
							/>

							<v-text-field
								:error="!formManager.passwordConfirm.$valid && formManager.passwordConfirm.$touched"
								:error-messages="[
									...(formManager.passwordConfirm.$errors.required && formManager.passwordConfirm.$touched ? ['Password must me confirmed'] : []),
									...(formManager.passwordConfirm.$errors.passwordEqual && formManager.passwordConfirm.$touched ? ['Passwords are not equal'] : []),
								]"
								v-model="formManager.passwordConfirm.model"
								label="Confirm Password"
								type="password"
								@blur="formManager.passwordConfirm.onFieldBlur"
							/>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<v-btn color="accent" @click="onSubmit">Register</v-btn>
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
import { required, email, minLength } from '@/shared/services/formManager/formValidators';

export default {
	name: 'RegisterForm',
	setup(props, { expose }) {
		const { register } = useAuth();

		const formOptions = {
			fields: {
				name: {
					defaultValue: () => 'dan',
					validators: {
						required: v => required(v),
						minLength: v => minLength(v, 3),
					},
				},
				email: {
					defaultValue: () => 'test@gm.co',
					validators: {
						required: v => required(v),
						email: v => email(v),
					},
				},
				password: {
					defaultValue: () => '11111111',
					validators: {
						required: v => required(v),
						minLength: v => minLength(v, 8),
					},
				},
				passwordConfirm: {
					defaultValue: () => '11111111',
					validators: {
						required: v => required(v),
					},
				},
			},
			dependencies: {
                password: {
                    passwordConfirm: {
                        type: 'modelChange',
                        callback: (parentField, field) => {
                            const validatorName = 'passwordEqual'
                            const validatorCallback = () => parentField.model === field.model

                            if (field.validators[validatorName]) {
                                field.removeValidator([validatorName])
                            }

                            field.addValidator([[validatorName, validatorCallback]])
                        }
                    }
                }
            }
		};

		const formManager = FormManager(formOptions);

		const onSubmit = () => {
			if (!formManager.validateForm()) return

			register(formManager.getFormValues());
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
	}
};
</script>

<style>

</style>
