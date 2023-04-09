<template>
	<Loader
		:loading="loadingFlags.loadingUserPlayLists"
	>
		<div
			v-if="userPlayLists.length"
			class="dropdown-block__body pl"
		>
			<div class="main-grid">
				<div
					class="main-grid-item cursor-pointer"
					v-for="(item, index) in userPlayLists"
					:key="index"
					@click="redirectToPlayList(item.id)"
				>
					<PlaylistCard
						:cardData="item"
					></PlaylistCard>
				</div>
			</div>
		</div>
		<div
			v-else
		>
			<div class="text-center">
				<p class="text-center my-3 w-100">Немає плейлистів</p>

				<div>
					<v-btn
						color="accent"
						@click="createPlayListModalShow = true"
					>
						Створити новий
					</v-btn>

					<CreatePlaylistModal
						:visible="createPlayListModalShow"
						@update:visible="createPlayListModalShow = $event"
						@created:playlist="getUserPlayLists"
					></CreatePlaylistModal>
				</div>
			</div>
		</div>
	</Loader>
</template>
<script>
import PlaylistCard from './UI/PlaylistCard.vue';
import CreatePlaylistModal from './modals/CreatePlaylistModal.vue';
import Loader from '@/shared/components/UI/Loader.vue';

import useUser from '../composables/useUser';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
	name: 'UserPlaylists',
	components: {
		PlaylistCard,
		Loader,
		CreatePlaylistModal
	},
	setup() {
		const router = useRouter();

		const {
			loadingFlags,
			loadingUserPlayLists,
			userPlayLists,
			getUserPlayLists
		} = useUser();

		getUserPlayLists();

		const createPlayListModalShow = ref(false);

		const redirectToPlayList = (id) => {
			router.push({
				name: 'Playlists',
				params: {
					id
				}
			});
		};

		return {
			loadingFlags,
			loadingUserPlayLists,
			userPlayLists,
			createPlayListModalShow,
			redirectToPlayList,
			getUserPlayLists,
		}
	}
}
</script>