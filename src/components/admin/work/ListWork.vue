<template>

	<div class="page-wrapper form-content">

		<modal-work :row="rowWork" :page="page" ref="modalWork" @workRefresh="getResults(page)"></modal-work>

		<div class="admin-page-title">
			<div class="row">
				<div class="col-md-6">
					<h2 class="mb-1">Projeler</h2>
				</div>
				<div class="col-md-6">
					<button class="btn btn-success float-right" @click="$refs.modalWork.openWorkModal()">
						<i class="fas fa-plus"></i> Proje Ekle
					</button>
				</div>
			</div>
		</div>

		<div class="table-responsive">
			
			<table class="table table-bordered table-striped special-table">

			  	<thead>
				    <tr>
				      <th scope="col">Başlık</th>
				      <th scope="col">Tarih</th>
				      <th width="200">İşlemler</th>
				    </tr>
			  	</thead>

		  		<tbody>
			    	<tr v-for="(row, index) in rows.data">
			      		<td>{{ row.title }}</td>
				      	<td>{{ row.created_at }}</td>
				      	<td>
				      		<b-btn size="md" variant="primary" class="mb-1" @click="$refs.modalWork.editWork(row)">
				      			<i class="fas fa-pencil-alt"></i> Düzenle
				      		</b-btn>

				      		<b-btn size="md" variant="danger" class="mb-1" @click="$refs.modalWork.deleteWork(row.id)" :disabled="$refs.modalWork.loadingDelete">
				              <i class="fas fa-trash"></i> Sil
				            </b-btn>
				      	</td>
				    </tr>
			 	 </tbody>

			</table>

			<pagination :data="rows" :limit="2" :show-disabled="true" @pagination-change-page="getResults" class="justify-content-end pagination-sm">
				<span slot="prev-nav">&lt; Geri</span>
				<span slot="next-nav">İleri &gt;</span>
			</pagination>

		</div>

	</div>

</template>

<script>

import pagination from 'laravel-vue-pagination'
import ModalWork from './ModalWork'

export default {
	name: "list-work",
	components: {
		pagination,
		ModalWork,
	},
	data() {
		return {
	  		rows: {},
	  		page: 1,
	  		rowWork: {
	  			workId: '',
	  			title: '',	
	  			main_img: '',
		  		detail: '',
		  		iframe1: '',
		  		iframe2: '',
	  		}
		};
	},
  	mounted() {
		this.getResults();
	},
	created() {
		this.$store.commit('SET_LAYOUT', 'admin-layout')
	},
	methods: {
		getResults(page = 1) {
			this.$store.dispatch('getWorks', page)
			.then(response => {
				this.rows = response.data
				this.page = page
			})
			.catch(error => {
				console.log(error)
				swal('Bir hata oluştu!');
			})
		},
	}
};

</script>

<style>

</style>
