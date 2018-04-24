<template>
	<div class="header">
		<div class="jy-header-wrapper">
				<div class="jy-header-avatar">
					<img :src="seller.avatar" />
				</div>
				<div class="jy-wrapper-content">
					<div class="jy-content-title">
						<span class="jy-brand"></span>
						<span class="jy-name-1">{{seller.name}}</span>
					</div>
					<div class="jy-content-description">
						{{seller.description}}/{{seller.deliveryTime}}分钟送达
					</div>
					<div class="jy-content-support" v-if="seller.supports">
						<span class="jy-icon" :class="'jy-icon-'+classMap[seller.supports[0].type]"></span>
						<span class="jy-text">{{seller.supports[0].description}}</span>
					</div>
				</div>
			<div class="jy-support-count" v-if="seller.supports" @click="detailShow()">
				<span class="jy-count">{{seller.supports.length}}个</span>
				<i class="iconfont icon-arrow "></i>
			</div>
		</div>
		
		<div class="jy-header-bulletin" @click="detailShow()">
			<span class="jy-bulletin-png"></span><span class="jy-bulletin-text">{{ seller.bulletin }}</span>
			<i class="iconfont icon-arrow icon-arrow-right"></i>
		</div>
		<div class="jy-header-cover"></div>
		<div class="jy-header-bg">
			<img :src="seller.avatar" />
		</div>
		<!--弹出层页面-->
		<div class="jy-detail animated lightSpeedIn" v-show="detailshow">
			<div class="jy-detail-wrapper clearfix">
				<div class="jy-detail-content">
					<div class="jy-detail-name">
						{{seller.name}}
					</div>
					<v-star :score="seller.score"></v-star>
					<div class="jy-detail-title">
						<div class="jy-line"></div>
						<div class="jy-title-text">优惠信息</div>
						<div class="jy-line"></div>
					</div>
					<ul class="jy-detail-supports" v-if="seller.supports">
						<li class="jy-support-item" v-for="(item,index) in seller.supports">
							<span class="jy-item-png" :class="'jy-item-png-'+classMap[seller.supports[index].type]"></span>
							<span class="jy-text">{{ seller.supports[index].description }}</span>
						</li>
					</ul>
					<div class="jy-detail-title">
						<div class="jy-line"></div>
						<div class="jy-title-text">商家公告</div>
						<div class="jy-line"></div>
					</div>
					<div class="jy-seller-bulletin">
						<p class="jy-b-text">{{ seller.bulletin }}</p>
					</div>
				</div>
			</div>
			<div class="jy-detail-close" @click="close()">
				<i class="iconfont icon-icon-wrong "></i>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '../star/star.vue'

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				detailshow: false,
			}
		},
		methods: {
			detailShow() {
				this.detailshow = true
			},
			close() {
				this.detailshow = false
			},
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		},
		components: {
			'v-star': star
		}
	}
</script>

<style>
	.header {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 134px;
		color: #FFFFFF;
		overflow: hidden;
	}
	.jy-header-wrapper {
		position: relative;
		padding: 24px 12px 18px 24px;
		font-size: 0;
		z-index: 100;
	}
		
	.jy-header-avatar {
		display: inline-block;
		vertical-align: top;
	}
	
	.jy-header-avatar img {
		width: 64px;
		height: 64px;
		border-radius: 2px;
	}
	
	.jy-wrapper-content {
		display: inline-block;
	}
	
	.jy-content-title {
		display: flex;
		margin: 2px 0 8px 16px;
	}
	
	.jy-brand {
		display: inline-block;
		width: 30px;
		height: 18px;
		margin-right: 6px;
		background-size: 30px 18px;
		background-image: url('png/brand@2x.png');
	}
	
	.jy-name-1 {
		display: inline-block;
		font-size: 16px;
		font-weight: bold;
		line-height: 18px;
	}
	
	.jy-content-description {
		margin: 0 0 10px 16px;
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
	}
	
	.jy-content-support {
		display: flex;
		margin: 0 0 2px 16px;
	}
	
	.jy-icon {
		display: inline-block;
		width: 12px;
		height: 12px;
		background-size: 12px 12px;
		margin-right: 4px;
	}
	
	.jy-icon-decrease {
		background-image: url('png/decrease_1@2x.png');
	}
	
	.jy-icon-discount {
		background-image: url('png/discount_1@2x.png');
	}
	
	.jy-icon-special {
		background-image: url('png/special_1@2x.png');
	}
	
	.jy-icon-invoice {
		background-image: url('png/invoice_1@2x.png');
	}
	
	.jy-icon-guarantee {
		background-image: url('png/guarantee_1@2x.png');
	}
	
	.jy-text {
		display: inline-block;
		font-size: 10px;
		font-weight: 200;
		line-height: 12px;
	}
	
	.jy-support-count {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 12px;
		bottom: 10px;
		height: 20px;
		width: 50px;
		padding: 5px 8px;
		border-radius: 24px;
		background-color: rgba(0, 0, 0, 0.2)
	}
	
	.jy-count {
		display: inline-block;
		font-size: 10px;
		font-weight: 200;
		line-height: 12px;
	}
	
	.icon-arrow {
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
	}
	
	.jy-header-bulletin {
		position: relative;
		height: 28px;
		line-height: 28px;
		background-color: rgba(7, 17, 27, 0.2);
		padding: 0 22px 0 12px;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		z-index: 100;
	}
	
	.jy-bulletin-png {
		display: inline-block;
		width: 22px;
		height: 12px;
		background-size: 22px 12px;
		background-image: url('png/bulletin@2x.png');
		margin-right: 4px;
		vertical-align: top;
		margin-top: 8px;
	}
	
	.jy-bulletin-text {
		font-size: 10px;
		font-weight: 200;
		line-height: 28px;
		vertical-align: top;
	}
	
	.icon-arrow-right {
		position: absolute;
		top: 8px;
		right: 0;
	}
	.jy-header-bg img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		filter: blur(10px);
		z-index: 50;
	}
	
	.jy-header-cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(7, 17, 27, 0.5);
		z-index: 80;
	}
	.jy-detail {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(7, 17, 27, 0.8);
		backdrop-filter: blur(10px);
		overflow: auto;
		z-index: 500;
	}
	
	.jy-detail-wrapper {
		width: 100%;
		min-height: 100%;		
	}
	.jy-detail-content{
		padding: 64px 32px;
	}
	.jy-detail-name {
		display: flex;
		justify-content: center;
		font-size: 16px;
		font-weight: 700;
		line-height: 16px;
	}
	
	.jy-detail-title {
		display: flex;
		margin: 28px 0 24px 0;
	}
	
	.jy-line {
		flex: 1;
		width: 112px;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		margin-top: 6px;
	}
	
	.jy-title-text {
		display: inline-block;
		font-size: 14px;
		font-weight: 700;
		line-height: 14px;
		padding: 0 12px;
	}
	
	.jy-detail-supports {
		padding: 0 12px;
	}
	
	.jy-support-item {
		display: flex;
		align-items: center;
		margin-bottom: 12px;
	}
	
	.jy-item-png {
		display: inline-block;
		width: 16px;
		height: 16px;
		background-size: 16px 16px;
		margin-right: 6px;
	}
	
	.jy-item-png-decrease {
		background-image: url('png/decrease_1@2x.png');
	}
	
	.jy-item-png-discount {
		background-image: url('png/discount_1@2x.png');
	}
	
	.jy-item-png-special {
		background-image: url('png/special_1@2x.png');
	}
	
	.jy-item-png-invoice {
		background-image: url('png/invoice_1@2x.png');
	}
	
	.jy-item-png-guarantee {
		background-image: url('png/guarantee_1@2x.png');
	}
	
	.jy-text {
		display: inline-block;
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
	}
	
	.jy-seller-bulletin {
		padding: 0 12px;
	}
	
	.jy-b-text {
		font-size: 12px;
		font-weight: 200;
		line-height: 24px;
	}
	
	.jy-detail-close {
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;
		clear: both;
	}
	
	.icon-icon-wrong {
		font-size: 32px;
		color: rgba(255, 255, 255, 0.5);
	}
</style>