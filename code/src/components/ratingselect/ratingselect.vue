<template>
	<div class="ratingselect">
		<div class="jy-rating-type">
			<span class="jy-block jy-desc-all" :class="{'jy-block-active jy-active-1':selectType===2}" @click="ratingSelectType(2,$event)">{{ desc.all }}<span class="jy-rating-count">{{ ratings.length }}</span></span>
			<span class="jy-block jy-desc-positive" :class="{'jy-block-active jy-active-1':selectType===0}" @click="ratingSelectType(0,$event)">{{ desc.positive }}<span class="jy-rating-count">{{ positives.length }}</span></span>
			<span class="jy-block jy-desc-negative" :class="{'jy-block-active jy-active-2':selectType===1}" @click="ratingSelectType(1,$event)">{{ desc.negative }}<span class="jy-rating-count">{{ negatives.length }}</span></span>
		</div>
		<div class="jy-rating-switch" @click="switchOnlyContent($event)">
			<i class="iconfont icon-xuanze" :class="{'icon-xuanze-highlight':onlyContent===true}"></i>
			<span class="jy-rating-switch-text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const ALL = 2
	const POSITIVE = 0
	const NEGATIVE = 1
	
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return []
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type: Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		methods:{
			ratingSelectType(type,event){
				if(!event._constructed){
					return
				}				
				this.$emit('setSelectType',type)
			},
			switchOnlyContent(event){
				if(!event._constructed){
					return
				}				
				this.$emit('switchOnlyContent')
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				})
			},
			negatives(){
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE
				})
			},
		}
	}
</script>

<style>
	.jy-rating-type{
		padding: 18px 0;
		margin: 0 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		
	}
	.jy-block{
		display: inline-block;
		padding: 8px 12px;
		border-radius: 12px;
		font-size: 12px;
		line-height: 16px;
		margin-right: 8px;
		color: rgb(77,85,93);
	}
	.jy-block-active{
		color: rgb(255,255,255);
	}
	.jy-desc-all{
		background-color: rgba(0,160,220,0.2);		
	}
	.jy-desc-positive{
		background-color: rgba(0,160,220,0.2);		
	}
	.jy-active-1{
		background-color: rgb(0,160,200);
	}
	.jy-desc-negative{
		background-color: rgba(77,85,93,0.2);		
	}
	.jy-active-2{
		background-color: rgb(77,85,93);
	}
	.jy-rating-count{
		font-size: 10px;
		margin-left: 2px;
	}
	.jy-rating-switch{
		display: flex;
		padding: 12px 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.icon-xuanze{
		font-size: 22px;
		line-height: 24px;
		color: rgb(147,153,159);
		margin-right: 4px;
	}
	.icon-xuanze-highlight{
		color: #00c850;
	}
	.jy-rating-switch-text{
		font-size: 12px;
		line-height: 24px;
		color: rgb(147,153,159);
	}
</style>