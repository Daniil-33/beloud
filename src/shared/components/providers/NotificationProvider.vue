<template>
	<v-snackbar
		v-for="(notify, index) in appNotifications"
		v-model="notify.status"
		:key="`notify-${index}`"
		:timeout="notify.timeout || 2000"
		:color="notify.color"
		:location="'top right'"
	>
		<div
			:style="notify.text.length > 1200 ? 'font-size: 8px;' : ''"
		>
			{{ notify.text }}
		</div>

		<template v-slot:actions>
			<v-btn
				color="blue"
				variant="text"
				@click="notify.status = false"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>
<script>
import { useApplicationStore } from '@/stores/applicationStore';
export default {
	name: 'NotificationProvider',
	setup() {
		const { appNotifications } = useApplicationStore();

		return {
			appNotifications,
		};
	}
}
</script>