<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="jy-cart-icon" v-show="food.count>0" @click.stop.prevent="decreaseCount()">
				<i class="iconfont icon-jian"></i>
			</div>
		</transition>
		<div class="jy-cart-count" v-show="food.count>0">
			{{ food.count }}
		</div>
		<div class="jy-cart-icon" @click.stop.prevent="addCart($event)">
			<i class="iconfont icon-jia"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		props: {
			food: {
				type: Object
			},
		},
		methods: {
			addCart(event) {
				if(!event._constructed) {
					return
				}
				if(!this.food.count) {
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count++
				}
				 this.$emit('cart.add', event.target); 
			},
			decreaseCount() {
				if(!event._constructed) {
					return
				}
				this.food.count--
			},
		}
	}
</script>

<style>
	.cartcontrol {
		font-size: 0;
	}
	
	.jy-cart-icon {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
		border-radius: 1000px;
		background-color: rgb(0, 160, 220);
	}
	
	.icon-jian {
		font-size: 12px;
		line-height: 12px;
		color: #FFFFFF;
	}
	
	.move-enter-active,
	.move-leave-active {
		transition: all 0.4s linear;
		transform: rotate(180deg);
	}
	
	.move-enter,
	.move-leave-to {
		opacity: 0;
		transform: translateX(24px);
	}
	
	.jy-cart-count {
		display: inline-block;
		width: 12px;
		padding: 6px;
		font-size: 10px;
		line-height: 24px;
		color: rgb(147, 153, 159);
		text-align: center;
	}
	
	.icon-jia {
		font-size: 12px;
		line-height: 12px;
		color: #FFFFFF;
	}
</style>