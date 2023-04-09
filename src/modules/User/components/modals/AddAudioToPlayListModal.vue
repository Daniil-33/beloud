<template>
	<div class="text-center">
		<v-dialog
			width="320"
			:model-value="visible"
			@update:model-value="$emit('update:visible', $event)"
		>
			<v-card>
				<v-card-title class="headline">
					Додати до плейлисту
				</v-card-title>

				<v-card-text>
					<div class="d-flex flex-column w-100">
						<div
							v-if="playlists.length"
							v-for="playlist in playlists"
							:key="playlist.id"
							class="mb-2"
						>
							<OverlayLoader
								:loading="loadingFlags.addingAudioToUserPlayList && selectedPlaylist === playlist.id"
							>
								<PlaylistCardSm
									class=""
									:cardData="playlist"
									@click="addToPlaylist(playlist.id)"
								/>
							</OverlayLoader>
						</div>

						<template v-else>
							<div class="text-center">
								Немає плейлистів
							</div>
						</template>
					</div>
				</v-card-text>

				<v-card-actions>
					<v-btn
						color="accent"
						@click="createPlayListModalShow = true"
					>
						Створити новий
					</v-btn>

					<v-spacer />

					<v-btn
						color="accent"
						@click="$emit('update:visible', false)"
					>
						Закрити
					</v-btn>
				</v-card-actions>
			</v-card>

			<CreatePlaylistModal
				:visible="createPlayListModalShow"
				@update:visible="createPlayListModalShow = $event"
				@created:playlist="getUserPlayLists"
			/>
		</v-dialog>
	</div>
</template>
<script>
import PlaylistCardSm from '../UI/PlaylistCardSm.vue';
import CreatePlaylistModal from './CreatePlaylistModal.vue';
import OverlayLoader from '@/shared/components/UI/OverlayLoader.vue';

import { computed, ref } from 'vue'
import useUser from '../../composables/useUser';

export default {
	name: 'AddAudioToPlayListModal',
	components: {
		PlaylistCardSm,
		OverlayLoader,
		CreatePlaylistModal,
	},
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		audioId: {
			type: Number,
			default: null,
		},
	},
	emits: {
		'created:playlist': null,
		'update:visible': null,
	},
	setup(props, { emit }) {
		const {
			loadingFlags,
			userPlayLists,
			getUserPlayLists,
			addAudioToUserPlayList
		} = useUser()

		getUserPlayLists()

		const playlists = computed(() => userPlayLists.value.map(playlist => ({
			id: playlist.id,
			name: playlist.name,
			image: playlist.songs?.[0]?.image,
			songsCount: playlist.songs?.length
		})))

		const selectedPlaylist = ref(null)

		const addToPlaylist = async (playlistId) => {
			selectedPlaylist.value = playlistId

			await addAudioToUserPlayList(playlistId,props.audioId)
			emit('update:visible', false)
		}

		const createPlayListModalShow = ref(false)
		const deleteSongModalShow = ref(false)
		const deletePlaylistModalShow = ref(false)

		return {
			loadingFlags,
			playlists,
			createPlayListModalShow,

			deleteSongModalShow,
			deletePlaylistModalShow,

			addToPlaylist,
			getUserPlayLists,
		}
	}
}
</script>