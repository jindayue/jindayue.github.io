<template>
	<div class="food animated lightSpeedIn" v-show="showFood" ref="food">
		<div class="jy-food-content-detail">
			<div class="jy-food-img-header">
				<img :src="food.image" />
				<div class="jy-food-icon" @click="foodClose()">
					<i class="iconfont icon-previewleft"></i>
				</div>
			</div>
			<div class="jy-food-content2">
				<h2 class="jy-name-3">{{ food.name }}</h2>
				<div class="jy-extra">
					<span class="jy-count">月售{{food.sellCount}}份</span>
					<span>好评率{{food.rating}}%</span>
				</div>
				<div class="jy-func">
					<div class="jy-price">
						<span class="jy-mark">￥</span><span class="jy-now-price">{{food.price}}</span>
						<span class="jy-old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="jy-cartcontrol-wrapper1">
						<v-cartcontrol :food="food"></v-cartcontrol>
					</div>
				</div>
			</div>
			<v-split v-show="food.info"></v-split>
			<div class="jy-food-info" v-show="food.info">
				<span class="jy-food-info-title">商品介绍</span>
				<p class="jy-food-info-text">{{ food.info }}</p>
			</div>
			<v-split></v-split>
			<div class="jy-food-rating">
				<span class="jy-food-rating-title">商品评价</span>
				<v-ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @switchOnlyContent="switchOnlyContent" @setSelectType="setSelectType"></v-ratingselect>
				<div class="jy-rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li class="jy-rating-item" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
							<div class="jy-user">
								<span class="jy-user-name">{{ rating.username }}</span>
								<img class="jy-user-avatar" :src="rating.avatar"/>
							</div>
							<div class="jy-time">
								{{ rating.rateTime | formatDate}}
							</div>
							<div class="jy-rating-content">
								<i class="iconfont icon-thumbup" v-show="rating.rateType===0"></i>
								<i class="iconfont icon-thumbdown" v-show="rating.rateType===1"></i>
								<span class="jy-rating-text">{{ rating.text }}</span>
							</div>
						</li>
					</ul>
					<div class="jy-no-rating" v-show="!food.ratings || !food.ratings.length">
						暂无评价
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'
	import split from '../split/split.vue'
	import ratingselect from '../ratingselect/ratingselect.vue'
	import {formatDate} from '../../func/date.js'

	const ALL = 2
	const POSITIVE = 0
	const NEGATIVE = 1
	
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFood: false,
				selectType:ALL,
				onlyContent:true,
				desc: {
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		methods: {
			show() {
				this.showFood = true
				this.selectType = ALL
				this.onlyContent = true
				this.$nextTick(() => {
					if(!this.scroll){
						this.sroll = new BScroll(this.$refs.food,{click:true})
					}
					else{
						this.scroll.refresh()
					}
				})
			},
			foodClose() {
				this.showFood = false
			},
			needShow(type,text){
				if(this.onlyContent && !text){
					return false
				}
				if(this.selectType === ALL){
					return true
				}else{
					return type === this.selectType
				}
			},
			setSelectType(selectType){
				this.selectType = selectType
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			switchOnlyContent(){
				this.onlyContent = !this.onlyContent
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			}
		},
		filters:{
			formatDate(time){
				let date = new Date(time)
				return formatDate(date,"yyyy-MM-dd hh:mm")
			}
		},
		components: {
			'v-cartcontrol': cartcontrol,
			'v-split':split,
			'v-ratingselect':ratingselect
		},
	}
</script>

<style>
	.food {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 48px;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 200;
	}
	
	.jy-food-img-header {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	
	.jy-food-img-header img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.jy-food-icon {
		position: absolute;
		top: 6px;
		left: 6px;
	}
	
	.icon-previewleft {
		font-size: 28px;
		color: rgb(200,200,200);
	}
	
	.jy-food-content2 {
		padding: 18px;		
	}
	
	.jy-name-3 {
		height: 14px;
		line-height: 14px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(7, 17, 27);
		margin: 0 0 8px 0;
	}
	
	.jy-extra {
		font-size: 10px;
		line-height: 10px;
		color: rgb(147, 153, 159);
	}
	
	.jy-count {
		margin-right: 12px;
	}
	
	.jy-func {
		display: inline-flex;
		height: 36px;
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	
	.jy-price {
		flex: 1;
	}
	
	.jy-cartcontrol-wrapper1 {
		flex: 1;
		display: inline-flex;
		flex-direction: row-reverse;
	}
	
	.jy-mark {
		font-size: 10px;
		color: rgb(240, 20, 20);
		font-weight: normal;
		line-height: 24px;
	}
	
	.jy-now-price {
		font-size: 14px;
		color: rgb(240, 20, 20);
		font-weight: 700;
		line-height: 24px;
	}
	
	.jy-old-price {
		font-size: 10px;
		color: rgb(147, 153, 159);
		font-weight: 700;
		line-height: 24px;
		text-decoration: line-through;
	}

	.jy-food-info{
		padding: 18px;
	}
	.jy-food-info-text{
		font-size: 12px;
		font-weight: 200;
		color: rgb(77,85,93);
		line-height: 24px;
		margin-top: 6px;
	}
	.jy-food-rating{
		padding-top:18px ;
	}
	.jy-food-rating-title{
		color: rgb(7,17,27);
		margin-left: 18px;
	}
	.jy-rating-wrapper{
		padding: 0 18px;
	}
	.jy-rating-item{
		padding: 16px 0;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.jy-user{
		display: flex;
		position: absolute;
		right: 18px;
	}
	.jy-user-name{
		font-size: 10px;
		line-height: 12px;
		color: rgb(147,153,159);
	}
	.jy-user-avatar{
		width: 12px;
		height: 12px;
		border-radius: 12px;
		margin-left: 6px;
	}
	.jy-time{
		font-size: 10px;
		line-height: 12px;
		color: rgb(147,153,159);
	}
	.jy-rating-content{
		margin-top: 6px;
	}
	.icon-thumbup{
		font-size: 12px;
		line-height: 24px;
		color: rgb(0,160,220);
		margin-right: 4px;
	}
	.icon-thumbdown{
		font-size: 12px;
		line-height: 24px;
		color: rgb(147,153,159);
	}
	.jy-rating-text{
		font-size: 12px;
		line-height: 16px;
		color: rgb(7,17,27);
	}
	.jy-no-rating{
		padding: 16px 0;
		font-size: 12px;
		color: rgb(147,153,159);
	}
</style>