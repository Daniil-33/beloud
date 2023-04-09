<template>
	<PlaylistDetailedCard :playlistId="playlistId" />
</template>

<script>
import { PlaylistDetailedCard } from '@/modules/User/'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
    components: {
        PlaylistDetailedCard
    },
    setup() {
        const route = useRoute()
        const playlistId = computed(() => route.params.id)
        return {
            playlistId
        }
    }
}
</script>
