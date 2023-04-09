<template>
	<div class="text-center">
		<v-dialog
			width="320"
			:model-value="visible"
			@update:model-value="$emit('update:visible', $event)"
		>
			<v-card>
				<v-card-title class="headline">
					Додати плейлист
				</v-card-title>

				<v-card-text>
					<v-form>
						<v-text-field
							v-model="formManager.name.model"
							label="Назва плейлиста"
							:error="!formManager.name.$valid && formManager.name.$touched"
							:error-messages="[
								...(formManager.name.$errors.required && formManager.name.$touched ? ['This field is required'] : []),
							]"
							@blur="formManager.name.onFieldBlur"
						/>
					</v-form>
				</v-card-text>

				<v-card-actions>
					<v-spacer />
					<v-btn
						color="accent"
						:loading="loadingFlags.creatingUserPlayList"
						@click="onSubmit"
					>
						Додати
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import FormManager from '@/shared/services/formManager/formManagerService';
import { required } from '@/shared/services/formManager/formValidators';

import useUser from '../../composables/useUser';

export default {
	name: 'CreatePlaylistModal',
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
	},
	emits: {
		'created:playlist': null,
		'update:visible': null,
	},
	setup(props, { emit }) {
		const {
			loadingFlags,
			createUserPlayList
		} = useUser()

		const formOptions = {
			fields: {
				name: {
					value: '',
					validators: {
						required: v => required(v),
					},
				},
			},
		}

		const formManager = new FormManager(formOptions)

		const onSubmit = async () => {
			if (formManager.validateForm()) {
				await createUserPlayList(formManager.name.model)

				emit('created:playlist')
				emit('update:visible', false)
			}
		}

		return {
			loadingFlags,
			formManager,
			onSubmit
		}
	}
}
</script>