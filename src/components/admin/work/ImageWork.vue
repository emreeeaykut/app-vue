<template>
	
    <div class="image-box">
		<img :src="apiAssets + image" class="row-image-area">
		<b-btn size="md" variant="danger" class="row-image-btn" @click="deleteImage(imageId)" :disabled="loadingDelete">
			SİL
			<i class="fa fa-spinner fa-spin fa-fw" v-if="loadingDelete"></i>
		</b-btn>
	</div>

</template>

<script>

export default {
	name: 'image-work',
	props: {
		workImages: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			'imageId': this.workImages.id,
			'image': this.workImages.image,
			'workId': this.workImages.work_id,
			apiAssets,
			loadingDelete: false,
		}
	},
	methods: {
		deleteImage(imageId)
		{
			this.loadingDelete = true

			this.$swal({
				title: 'Emin misiniz?',
				text: 'Fotoğrafı silmek istediğinize emin misiniz?',
				icon: 'warning',
				buttons: ['Vazgeç', 'SİL'],
				dangerMode: true,
			})
			.then((willDelete) => {
				if (willDelete)
				{
					this.$store.dispatch('deleteImageWork', imageId)
					.then(response => {
						this.$swal(response.data, {
							icon: 'success',
						})
					})
					.catch(error => {
						console.log(error)
						this.$swal('Bir hata oluştu!')
					})

					this.loadingDelete = false
				}
				else
				{
					this.loadingDelete = false
				}
			})
		},
	}
}
	
</script>

<style>
	
</style>