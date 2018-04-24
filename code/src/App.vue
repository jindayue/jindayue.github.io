<template>
	<div id="app">
		<v-header :seller='seller'> </v-header>
		<div class="J-tab">
			<div class="J-tab-item">
				<router-link to="/goods"><span class="J-tab-name">商品</span></router-link>
			</div>
			<div class="J-tab-item">
				<router-link to="/ratings"><span class="J-tab-name">评价</span></router-link>
			</div>
			<div class="J-tab-item">
				<router-link to="/seller"><span class="J-tab-name">商家</span></router-link>
			</div>
		</div>
		<router-view :seller="seller"></router-view>
	</div>
</template>

<script>
	import header from './components/header/header.vue'
	const resData = require('./assets/api/data.json')
	export default {
		data() {
			return {
				seller: {}
			}
		},
		beforeCreate() {
			this.$router.push('/goods')
		},
		created() {
			this.seller = resData.seller
		},
		components: {
			'v-header': header
		}
	}
</script>

<style>
	.J-tab {
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #FFFFFF;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		z-index: 100;
	}
	
	.J-tab-item {
		flex: 1;
		text-align: center;
	}
	
	.J-tab-name {
		display: inline-block;
		height: 40px;
		width: 100%;
		text-decoration: none;
		font-size: 14px;
		color: rgb(77, 85, 93);
		line-height: 40px;
	}
	
	.router-link-active span {
		color: rgb(240, 20, 20);
	}
</style>