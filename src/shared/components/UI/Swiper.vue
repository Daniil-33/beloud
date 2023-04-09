<template>
    <div class="swiper-container p-x">
        <swiper
            :slides-per-view="4"
            :space-between="50"
            :modules="modules"
            :options="swiperOptions"
            :navigation="{prevEl:prevSwiperElement, nextEl:nextSwiperElement}"
            :scrollbar="{dragSize: 60, dragClass:'swiper-scrollbar-drag', draggable:true}"
        >
            <swiper-slide v-for="(item, index) in items" :key="index">
                <SongCard :cardData="item"></SongCard>
            </swiper-slide>
        </swiper>
        <div ref="prevSwiperElement" class="prev-swiper-element">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.04987 9.79608L17.068 17.8051C17.2037 17.8726 17.3544 17.9044 17.5059 17.8975C17.6573 17.8906 17.8045 17.8451 17.9335 17.7654C18.0624 17.6857 18.1689 17.5744 18.2428 17.442C18.3168 17.3097 18.3557 17.1607 18.356 17.0091V0.991104C18.3557 0.839521 18.3167 0.690521 18.2427 0.558197C18.1688 0.425873 18.0623 0.314602 17.9334 0.234907C17.8044 0.155214 17.6573 0.109734 17.5059 0.102768C17.3544 0.0958023 17.2037 0.127583 17.068 0.195101L1.04987 8.20408C0.902391 8.2783 0.778435 8.39203 0.691822 8.53258C0.605209 8.67313 0.559347 8.83498 0.559347 9.00008C0.559347 9.16517 0.605209 9.32702 0.691822 9.46758C0.778435 9.60813 0.902391 9.72186 1.04987 9.79608ZM16.5762 2.43112V15.569L3.43799 9.00008L16.5762 2.43112Z" fill="#F6D68D"/>
            </svg>
        </div>
        <div ref="nextSwiperElement" class="next-swiper-element">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9501 8.20392L1.93199 0.194946C1.79628 0.127375 1.64557 0.095555 1.49412 0.102497C1.34268 0.109439 1.19551 0.154914 1.06655 0.234617C0.937588 0.31432 0.8311 0.425615 0.757165 0.557966C0.683231 0.690317 0.644295 0.839347 0.644043 0.990949V17.0089C0.644343 17.1605 0.68331 17.3095 0.757257 17.4418C0.831205 17.5741 0.937687 17.6854 1.06663 17.7651C1.19558 17.8448 1.34272 17.8903 1.49415 17.8972C1.64557 17.9042 1.79627 17.8724 1.93199 17.8049L17.9501 9.79592C18.0976 9.7217 18.2216 9.60797 18.3082 9.46742C18.3948 9.32687 18.4407 9.16502 18.4407 8.99992C18.4407 8.83483 18.3948 8.67298 18.3082 8.53242C18.2216 8.39187 18.0976 8.27814 17.9501 8.20392ZM2.42384 15.5689V2.43096L15.562 8.99992L2.42384 15.5689Z" fill="#F6D68D"/>
            </svg>
        </div>
    </div>
</template>

<script>
import SongCard from '@/shared/components/UI/SongCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, Navigation  } from 'swiper'
import 'swiper/css';
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import { ref } from 'vue'
export default {
	props:['items'],
	components:{
		SongCard,
		Swiper,
      	SwiperSlide,
	},
	setup() {
		const prevSwiperElement = ref(null);
    	const nextSwiperElement = ref(null);
		return {
		
			modules: [Scrollbar, Navigation],
			prevSwiperElement,
			nextSwiperElement,
		}
	},
}
</script>