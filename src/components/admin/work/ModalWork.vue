<template>

	<div class="modal-area">

		<b-modal title="Proje" title-tag="h2" ref="modalWorkRef" hide-footer size="lg" >
			
			<b-form @submit.prevent="validateBeforeSubmit">

				<input type="hidden" v-model="workId">

				<b-form-group
					label="Başlık"
					label-for="title"
					label-size="sm"
			  	>
			    	<b-form-input 
			    		v-model="title"
			    		name="Başlık"
			    		:class="{ 'input-error': errors.has('Başlık') }" 
			    		v-validate="'required'">
		    		</b-form-input>
		    		<span class="form-error">{{ errors.first('Başlık') }}</span>
			  	</b-form-group>

			  	<b-form-group
					label="Ana Görseli Yükle"
					label-for="main_img"
					label-size="sm"
			  	>
			    	<div class="row">
			    		<div class="col-md-12 mb-1">
							<input type="file" name="mainImage" v-on:change="onImageChange" ref="mainImageFile" class="form-control">
						</div>
						<div class="col-md-12" v-if="main_img && mainImage == ''">
							<img :src="apiAssets + main_img" class="img-responsive" width="150">
						</div>
						<div class="col-md-12" v-if="mainImage">
							<img :src="mainImage" class="img-responsive" width="150">
						</div>
					</div>
			  	</b-form-group>

			  	<b-form-group
					label="Iframe1"
					label-for="iframe1"
					label-size="sm"
			  	>
			    	<b-form-input v-model="iframe1" type="text"></b-form-input>
			  	</b-form-group>

			  	<b-form-group
					label="Iframe2"
					label-for="iframe2"
					label-size="sm"
			  	>
			    	<b-form-input v-model="iframe2" type="text"></b-form-input>
			  	</b-form-group>

			  	<b-form-group
					label="Detay"
					label-for="detail"
					label-size="sm"
			  	>
			  		<vue-editor v-model="detail" :editorToolbar="customToolbar"></vue-editor> 
			  	</b-form-group>

			  	<div class="card card-default mb-2" v-if="workId != ''">
                    <div class="card-header font-14">Fotoğraf Yükle</div>
                    <div class="card-body">
                       <div class="row">
                          <div class="col-md-2" v-if="image">
                              <img :src="image" class="img-responsive" height="70" width="90">
                           </div>
                          <div class="col-md-7">
                              <input type="file" name="image" v-on:change="onImageChange" ref="imageFile" class="form-control">
                          </div>
                          <div class="col-md-3">
                          	<b-btn size="md" class="btn-block" variant="success" @click="uploadImage" :disabled="loadingUpload">
                            	Yükle
                            	<i class="fa fa-spinner fa-spin fa-fw" v-if="loadingUpload"></i>
                         	</b-btn>
                          </div>
                       </div>
                    </div>
                </div>

                <div class="card card-default mb-2" v-if="workId == ''">
                    <div class="card-header font-14">Projeyi kaydettikten sonra "projeyi düzenle" kısmından fotoğraf yükleyebilirsiniz</div>
                </div>

                <b-form-group
					label="Fotoğraflar"
					label-for="workImages"
					label-size="sm"
					v-if="workImages != ''"
			  	>
			  		<div class="row-image-box mb-4">

			  			<image-work v-for="row in workImages" :key="row.id" :workImages="row"></image-work>

				  	</div>

			  	</b-form-group>

			  	<div slot="modal-footer" class="w-100 float-left">
			  		<div class="float-right">
				     	<b-btn size="md" type="submit" class="mr-1" variant="primary" :disabled="loadingSave">
				       		Kaydet 
				       		<i class="fa fa-spinner fa-spin fa-fw" v-if="loadingSave"></i>
				     	</b-btn>
				     	<b-btn size="md" variant="danger" @click="cancelWork()">
				       		İptal
				     	</b-btn>
			     	</div>
			   	</div>

			</b-form>

		</b-modal>

	</div>

</template>

<script>

import ImageWork from './ImageWork'

export default {
	name: 'modal-work',
	components: {
		ImageWork,
	},
	props: {
		row: {
			type: Object,
			required: true,
		},
		page: {
			type: Number,
			required: true,
		}

	},
	data() {
		return {
			'workId': this.row.workId,
			'title': this.row.title,
			'main_img': this.row.main_img,
			'detail': this.row.detail,
			'iframe1': this.row.iframe1,
			'iframe2': this.row.iframe2,
			apiAssets,
			image: '',
			mainImage: '',
			loadingSave: false,
			loadingUpload: false,
			loadingDelete: false,
			customToolbar: [['bold', 'italic', 'underline'],[{ 'list': 'ordered'}, { 'list': 'bullet' }]],
		}
	},
	created() {
		this.$store.commit('SET_LAYOUT', 'admin-layout')
	},
	computed: {
		workImages() {
			return this.$store.getters.workImages
		}
	},
	methods: {
		rowReset()
		{
			this.workId = ''
			this.title = ''
			this.main_img = ''
			this.detail = ''
			this.iframe1 = ''
			this.iframe2 = ''
		},
		openWorkModal()
		{	
			this.rowReset()

			this.$store.dispatch('resetWorkImages')

			this.mainImage = ''
			this.$refs.mainImageFile.value = ''

			this.$refs.modalWorkRef.show()
		},
		validateBeforeSubmit()
		{
      		this.$validator.validateAll().then((result) => {
	        	if (result) {
	          		this.saveWork()
        		}
	      	})
		},
		editWork(row)
		{
			this.workId = row.id
			this.title = row.title
			this.main_img = row.main_img
			this.detail = row.detail
			this.iframe1 = row.iframe1
			this.iframe2 = row.iframe2

			this.mainImage = ''
			this.$refs.mainImageFile.value = ''

			if (this.$refs.imageFile)
			{
				this.image = ''
            	this.$refs.imageFile.value = ''
			}

			this.$store.dispatch('retrieveWorkImages', this.workId)

			this.$refs.modalWorkRef.show()
		},
		saveWork()
		{
			this.loadingSave = true

			if (this.workId == '') 
			{
				this.$store.dispatch('addWork', {
			        title: this.title,
			        main_img: this.mainImage,
			        detail: this.detail,
			        iframe1: this.iframe1,
			        iframe2: this.iframe2,
		      	})
		      	.then(response => {
		      		this.loadingSave = false

			        this.$refs.modalWorkRef.hide()

			        this.$swal(response.data.success, {
	                    icon: 'success',
	                })

					this.$emit('workRefresh', this.page)
		      	})
		      	.catch(error => {
		      		this.loadingSave = false
			        this.$swal('Bir hata oluştu!');
			        console.log(error)
		      	})
			}
			else
			{
				this.$store.dispatch('updateWork', {
					id: this.workId,
			        title: this.title,
			        main_img: this.mainImage,
			        existing_main_img: this.main_img,
			        detail: this.detail,
			        iframe1: this.iframe1,
			        iframe2: this.iframe2,
		      	})
		      	.then(response => {
		      		this.loadingSave = false

			        this.$refs.modalWorkRef.hide()

			        this.$swal(response.data.success, {
	                    icon: 'success',
	                })

					this.$emit('workRefresh', this.page)
		      	})
		      	.catch(error => {
		      		this.loadingSave = false
					this.$swal('Bir hata oluştu!');
					console.log(error)
		      	})
			}
		},
		deleteWork(rowId)
		{
			this.loadingDelete = true

			this.$swal({
                title: 'Emin misiniz?',
                text: 'Projeyi silmek istediğinize emin misiniz?',
                icon: 'warning',
                buttons: ['Vazgeç', 'SİL'],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete)
                {
                	this.$store.dispatch('deleteWork', rowId)
			      	.then(response => {
				        this.$swal(response.data, {
			                icon: 'success',
			            })

						this.$emit('workRefresh', this.page)
			      	})
			      	.catch(error => {
						this.$swal('Bir hata oluştu!')
						console.log(error)
			      	})

			      	this.loadingDelete = false
                }
                else
                {
                	this.loadingDelete = false
                }
            });
		},
		cancelWork()
		{
			this.$refs.modalWorkRef.hide()
			this.rowReset()
		},
		onImageChange(e) 
		{
			let filesName = e.target.name
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0], filesName);
        },
        createImage(file, filesName) 
        {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
            	if (filesName == 'mainImage')
            	{
            		vm.mainImage = e.target.result
            	}
            	else if (filesName == 'image')
            	{
            		vm.image = e.target.result
            	}
            };
            reader.readAsDataURL(file);
        },
        uploadImage()
        {
        	this.loadingUpload = true

        	this.$store.dispatch('uploadWorkImage', {
		        image: this.image,
		        work_id: this.workId
	      	})
	      	.then(response => {
	      		this.loadingUpload = false

		        this.$swal(response.data.success, {
                    icon: 'success',
                })

                this.image = ''
                this.$refs.imageFile.value = ''
	      	})
	      	.catch(error => {
		        this.loadingUpload = false
		        this.$swal('Bir hata oluştu!');
		        console.log(error)
	      	})
        },
	}
}
	
</script>

<style>
	
</style>