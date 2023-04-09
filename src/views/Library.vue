<template>
	<div class="title mb-8 mt-9">
		Ваша персональна <span class="accent-text">Бібліотека</span>.
	</div>
	<div class="dropdown-block mt-8">
		<div class="dropdown-block__header">
			<div class="dropdown-block__header-title">Плейлисти</div>
		</div>

		<UserPlaylists />
	</div>

</template>
<script>
import { UserPlaylists } from '@/modules/User/'
export default {
	components:{
		UserPlaylists
	},
}
</script>
