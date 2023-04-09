<template>
  <div class="playlists__wrapper ">
        <div class="playlists__playlist">
            <div class="playlists__playlist-wrapper p-x">
                <div class="playlists__playlist-image">
                    <img v-if="playlistImage" :src="playlistImage" alt="">

                    <div v-else class="img-placeholder">
                        <ui-icon icon="playlist" />
                    </div>
                </div>
                <div class="playlists__playlist-data">
                    <div class="playlists__playlist-data-inner">
                        <div class="playlists__playlist-data-title">{{ title }}</div>
                        <div class="playlists__playlist-data-group"></div>
                    </div>
                    <div class="playlists__playlist-data-songs">{{ songsCount }} пісень</div>
                </div>
                <div class="playlists__playlist-delete">
                    <button
                        class="icon-btn cursor-pointer"
                        @click="deletePlayList(false)"
                    >
                        <ui-icon icon="trash"/>
                    </button>
                </div>
            </div>

        </div>
        <div class="playlist__list-wrapper">
            <div class="playlist__list">
                <div
                    class="playlist__list-item pr"
                    v-for="(item, index) in songs"
                    :key="item"
                    @click="onSongClick(item)"
                >
                    <div class="playlist__list-item-number">{{ index + 1 }}</div>

                    <div
                        class="playlist__list-item-image"
                        @click.stop="toggleSongState(item)"
                    >
                        <img :src="item.image" alt="">

                        <div
                            v-if="currentSong && item.id === currentSong.id"
                            class="song-card__active-overlay"
                        >
                            <div
                                class="song-card__active-overlay-inner"
                            >
                                <ui-icon
                                    :icon="isPlaying ? 'pause' : 'play'"
                                ></ui-icon>
                            </div>
                        </div>
                    </div>

                    <div class="playlist__list-item-data">
                        <div class="playlist__list-item-data-inner">
                            <div class="playlist__list-item-name">{{ item.title }}</div>
                            <div class="playlist__list-item-group">
                                {{ item.author }}
                                <div class="playlist__list-item-time-mobile">
                                    <button
                                        class="icon-btn cursor-pointer"
                                        @click.stop="deleteSongFromPlayList(false, item)"
                                    >
                                        <ui-icon icon="trash-sm"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="playlist__list-item-time">
                        <button
                            class="icon-btn cursor-pointer"
                            @click.stop="deleteSongFromPlayList(false, item)"
                        >
                            <ui-icon icon="trash-sm"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <ConfirmDeleteModal
            :visible="deletePlayListModalShow"
            :text="'Ви дійсно хочете видалити цей плейлист?'"
            @update:visible="deletePlayListModalShow = $event"
            @confirm="deletePlayList(true)"
        />

        <ConfirmDeleteModal
            :visible="deleteSongModalShow"
            :text="'Ви дійсно хочете видалити цю пісню з плейлисту?'"
            @update:visible="deleteSongModalShow = $event"
            @confirm="deleteSongFromPlayList($event)"
        />
    </div>
</template>
<script>
import { SongCardSm } from '@/modules/Songs/'
import UIIcon from '@/shared/components/ui/UIIcon.vue'
import ConfirmDeleteModal from '@/shared/components/UI/ConfirmDeleteModal.vue';

import useUser from '../composables/useUser'
import { usePlayerStore } from '@/modules/Player/'
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
	name: 'PlaylistDetailedCard',
    props: {
        playlistId: {},
    },
	components:{
        'ui-icon': UIIcon,
        SongCardSm,
        ConfirmDeleteModal,
	},
	setup(props) {
		const {
            loadingFlags,
            userLoadedPlayList,
            getUserPlaylist,
            deleteUserPlayList,
            deleteAudioFromUserPlayList
        } = useUser()

        const {
			playSong,
			setStream,
			currentSong,
			isPlaying,
			startSong,
			pauseSong,
		} = usePlayerStore()

        const playlistImage = computed(() => userLoadedPlayList.value?.audios[0]?.image)
        const songsCount = computed(() => userLoadedPlayList.value?.audios.length)
        const title = computed(() => userLoadedPlayList.value?.name)
        const songs = computed(() => userLoadedPlayList.value?.audios)

        watch(props.playlistId, () => {
            getUserPlaylist(props.playlistId)
        }, { immediate: true })

        const onSongClick = (song) => {
            playSong(song);
            setStream(songs.value);
        }

        const toggleSongState = (song) => {
            if (song.id === currentSong.value?.id) {
                if (isPlaying.value) {
                    pauseSong()
                } else {
                    startSong()
                }
            } else {
                onSongClick(song)
            }
        }

        const songToDelete = ref(null)
        const deleteSongModalShow = ref(false)

        const deleteSongFromPlayList = async (isConfirmed, song) => {
            if (song && !isConfirmed) {
                songToDelete.value = song
                deleteSongModalShow.value = true
            } else {
                await deleteAudioFromUserPlayList(props.playlistId, songToDelete.value.id)
                await getUserPlaylist(props.playlistId)
                setStream(songs.value);

                if (userLoadedPlayList.value?.audios.length === 0) {
                    router.push({ name: 'Library' })
                }
            }
        }

        const router = useRouter()
        const deletePlayListModalShow = ref(false)

        const deletePlayList = async (isConfirmed) => {
            if (!isConfirmed) {
                deletePlayListModalShow.value = true
                return
            }

            await deleteUserPlayList(props.playlistId)
            router.push({ name: 'Library' })
        }

		return {
            userLoadedPlayList,
            playlistImage,
            songsCount,
            title,
            songs,
            currentSong,
            isPlaying,
			startSong,
			pauseSong,
            deleteSongModalShow,
            deletePlayListModalShow,

            onSongClick,
            toggleSongState,
            deleteSongFromPlayList,
            deletePlayList,
		}
	},


}
</script>
<style>
.img-placeholder {
    width: 160px;
    height: 160px;
    background-color: rgb(var(--v-theme-secondary));
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}
</style>
