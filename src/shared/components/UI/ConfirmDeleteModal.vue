<template>
	<div class="text-center">
		<v-dialog
			width="320"
			:model-value="visible"
			@update:model-value="$emit('update:visible', $event)"
		>
			<v-card>
				<v-card-title class="headline">
					Підтвердіть видалення
				</v-card-title>

				<v-card-text>
					{{ text }}
				</v-card-text>

				<v-card-actions>
					<v-spacer />
					<v-btn
						color="accent"
						@click="confirm"
					>
						Видалити
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
export default {
	name: 'ConfirmDeleteModal',
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		text: {
			type: String,
			default: '',
		},
	},
	emits: {
		'confirm': null,
	},
	setup(props, { emit }) {
		const confirm = () => {
			emit('confirm');
		};

		return {
			confirm
		}
	}
}
</script>