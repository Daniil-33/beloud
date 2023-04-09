<template>
	<Search></Search>

    <div class="playlists__wrapper ">
        <div class="playlists__playlist">
            <div class="playlists__playlist-wrapper p-x">
                <div class="playlists__playlist-image">
                    <img :src="playlistImage" alt="">
                </div>
                <div class="playlists__playlist-data">
                    <div class="playlists__playlist-data-inner">
                        <div class="playlists__playlist-data-title">Playlist: AC/DC</div>
                        <div class="playlists__playlist-data-group">Nirvana</div>
                    </div>
                    <div class="playlists__playlist-data-songs">10 songs</div>
                </div>
                <div class="playlists__playlist-delete">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_301)">
                    <path d="M28.0693 15.9414C27.5001 15.9414 27.0388 16.4027 27.0388 16.9718V36.4472C27.0388 37.016 27.5001 37.4776 28.0693 37.4776C28.6384 37.4776 29.0997 37.016 29.0997 36.4472V16.9718C29.0997 16.4027 28.6384 15.9414 28.0693 15.9414Z" fill="white" fill-opacity="0.7"/>
                    <path d="M15.9098 15.9414C15.3407 15.9414 14.8794 16.4027 14.8794 16.9718V36.4472C14.8794 37.016 15.3407 37.4776 15.9098 37.4776C16.479 37.4776 16.9403 37.016 16.9403 36.4472V16.9718C16.9403 16.4027 16.479 15.9414 15.9098 15.9414Z" fill="white" fill-opacity="0.7"/>
                    <path d="M7.0482 13.0992V38.4871C7.0482 39.9877 7.59844 41.3969 8.55965 42.408C9.51643 43.422 10.848 43.9976 12.2415 44H31.7378C33.1317 43.9976 34.4632 43.422 35.4196 42.408C36.3808 41.3969 36.931 39.9877 36.931 38.4871V13.0992C38.8418 12.5921 40.0799 10.7461 39.8243 8.78546C39.5683 6.8252 37.8983 5.35884 35.9211 5.35843H30.6453V4.07038C30.6514 2.98721 30.2231 1.94711 29.4563 1.18192C28.6895 0.417142 27.6478 -0.00871997 26.5646 0.000135392H17.4146C16.3314 -0.00871997 15.2897 0.417142 14.5229 1.18192C13.7561 1.94711 13.3279 2.98721 13.3339 4.07038V5.35843H8.05812C6.08096 5.35884 4.41092 6.8252 4.15492 8.78546C3.89932 10.7461 5.13746 12.5921 7.0482 13.0992ZM31.7378 41.9391H12.2415C10.4797 41.9391 9.10909 40.4257 9.10909 38.4871V13.1898H34.8701V38.4871C34.8701 40.4257 33.4996 41.9391 31.7378 41.9391ZM15.3948 4.07038C15.3879 3.53383 15.5989 3.0174 15.9796 2.63863C16.36 2.25986 16.8777 2.05176 17.4146 2.06102H26.5646C27.1016 2.05176 27.6192 2.25986 27.9996 2.63863C28.3804 3.017 28.5913 3.53383 28.5844 4.07038V5.35843H15.3948V4.07038ZM8.05812 7.41932H35.9211C36.9455 7.41932 37.7759 8.24971 37.7759 9.27411C37.7759 10.2985 36.9455 11.1289 35.9211 11.1289H8.05812C7.03371 11.1289 6.20332 10.2985 6.20332 9.27411C6.20332 8.24971 7.03371 7.41932 8.05812 7.41932Z" fill="white" fill-opacity="0.7"/>
                    <path d="M21.9894 15.9414C21.4203 15.9414 20.959 16.4027 20.959 16.9718V36.4472C20.959 37.016 21.4203 37.4776 21.9894 37.4776C22.5586 37.4776 23.0199 37.016 23.0199 36.4472V16.9718C23.0199 16.4027 22.5586 15.9414 21.9894 15.9414Z" fill="white" fill-opacity="0.7"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_301">
                    <rect width="44" height="44" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>

                </div>
            </div>

        </div>
        <div class="playlist__list-wrapper">
            <div class="playlist__list">
                <div class="playlist__list-item pr" v-for="item in 3" :key="item">
                    <div class="playlist__list-item-number">1</div>
                    <div class="playlist__list-item-image">
                        <img src="/images/song-image.jpg" alt="">
                    </div>
                    <div class="playlist__list-item-data">
                        <div class="playlist__list-item-data-inner">
                            <div class="playlist__list-item-name">Smells Like Teen Spirit</div>
                            <div class="playlist__list-item-group">
                                Nirvana
                                <div class="playlist__list-item-time-mobile">
                                    3:25
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="playlist__list-item-time">
                        3:25
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SongCard from '@/shared/components/UI/SongCard.vue'
import PlaylistCard from '@/shared/components/UI/PlaylistCard.vue'
import Search from '@/shared/components/UI/Search.vue'
import playlistImage from '@/assets/images/playlist-image.jpg'
import { ref } from 'vue'
export default {
	
	components:{
	
	},
	setup() {
		
		return {
			playlistImage:playlistImage
		}
	},


}
</script>
<style lang="scss" scoped>
	


</style>
