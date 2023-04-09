<template>
    <div class="search__wrapper p-x">
        <div class="search w-100">
            <v-text-field
                label="First name"
                hide-details="auto"
                bg-color="secondary"
            ></v-text-field>
            <div class="search__search-button">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.0949 2.32824C22.9345 2.32827 27.6984 7.08971 27.6981 12.9296C27.6981 18.7692 22.9342 23.5282 17.0942 23.5279C14.6179 23.5279 12.3408 22.6657 10.5334 21.2345L4.81229 26.9537C4.32394 27.4411 3.5332 27.4421 3.04587 26.9537C2.55921 26.4661 2.55919 25.6749 3.04585 25.1873L8.76943 19.4656C7.34974 17.6621 6.4955 15.3945 6.49549 12.9293C6.49549 7.08968 11.255 2.32799 17.0949 2.32824ZM17.0948 4.82664C12.6054 4.82662 8.99454 8.43994 8.9943 12.9291C8.9943 17.4184 12.6052 21.0293 17.0946 21.0293C21.584 21.0293 25.1998 17.4184 25.2001 12.9294C25.2001 8.44007 21.5839 4.82696 17.0948 4.82664Z" fill="white" fill-opacity="0.7"/>
                </svg>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
	name: 'SongCard',
    props:[],
	setup() {
	
		return {
		};
	}
}
</script>
<style scoped>
    .search{
        /* padding: 0 150px; */
        position: relative;
    }
    .search__search-button{
        position:absolute;
        right: 5%;
        top:50%;
        transform: translateY(-50%);
        height: 30px;
        width: 30px;
        cursor:pointer
    }
 
    
</style>