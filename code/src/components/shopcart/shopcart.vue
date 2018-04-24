<template>
	<div>
		
	<div class="shopcart">
		<div class="jy-content" @click="toggleList()">
			<div class="jy-content-left">
				<div class="jy-logo-wrapper">
					<div class="jy-logo" :class="{'highlight-logo':totalCount>0}">
						<i class="iconfont icon-iconfontshopcart" :class="{'highlight-icon':totalCount>0}"></i>
					</div>
					<div class="jy-total-num" v-show="totalCount>0">
						{{ totalCount }}
					</div>
				</div>
				<div class="jy-sCart-price" :class="{'highlight-price':totalPrice>0}">￥{{ totalPrice }}</div>
				<div class="jy-delivery-price">另需配送费￥{{ deliveryPrice }}元</div>
			</div>
			<div class="jy-content-right" @click.stop.prevent="pay()">
				<div class="jy-min-price" :class="{enough:totalPrice >= minPrice}">
					{{payPrice}}
				</div>
			</div>
		</div>

		<div class="ball-container">
			<transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
				<div class="ball" v-for="(ball,index) in balls" :key="index" v-show="ball.show">
					<span class="inner inner-hook cart-icon"></span>
				</div>
			</transition-group>
		</div>

	
		<div class="jy-pay-methods-wrapper" v-show="payMethodsShow">
			<div class="jy-pay-content">
				<div class="jy-pay-header">
					<span class="jy-pay-title">请选择支付方式</span>
				</div>
				<div class="jy-pay-list">
					<ul>
						<li class="jy-pay-methods">
							<input type="radio" />
							<span class="jy-info">微信支付</span>
						</li>
						<li class="jy-pay-methods">
							<input type="radio" />
							<span class="jy-info">支付宝</span>
						</li>
						<li class="jy-pay-methods">
							<input type="radio" />
							<span class="jy-info">信用卡支付</span>
						</li>
						<li class="jy-pay-methods">
							<input type="radio" />
							<span class="jy-info">Apple pay</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="jy-back">
				<div class="jy-backBtn" @click="back()">
					返回上一页
				</div>
			</div>
		</div>
	</div>
		<div class="jy-shopcart-list-wrapper">
			<transition name="fold">
			<div class="jy-shopcart-list" v-show="listShow">
				<div class="jy-list-header">
					<span class="jy-list-title">购物车</span>
					<span class="jy-empty" @click="empty()">清空</span>
				</div>
				<div class="jy-list-content" ref="listContent">
					<ul>
						<li class="jy-food-1" v-for="(food,index) in selectFoods" :key="index">
							<span class="jy-name-2">{{ food.name }}</span>
							<div class="jy-price2">
								<span>￥{{ food.price*food.count }}</span>
							</div>
							<div class="jy-cartcontrol-wrapper2">
								<v-cartcontrol :food="food"></v-cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		</div>
		<transition name="fade">
			<div class="jy-mask" v-show="listShow" @click.stop.prevent="hideList()"></div>
		</transition>
	</div>
</template>

<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'

	export default {
		data() {
			return {
				balls: [{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
				],
				dropBalls: [],
				fold: true,
				payMethodsShow: false,
			}
		},
		props: {
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
			selectFoods: {
				type: Array,
				default() {
					return []
				}
			}
		},
		created() {
			this.$on('cart.add', this.drop);
		},
		computed: {
			totalPrice() {
				let total = 0
				this.selectFoods.forEach((food) => {
					total += food.price * food.count
				})
				return total
			},
			totalCount() {
				let count = 0
				this.selectFoods.forEach((food) => {
					count += food.count
				})
				return count
			},
			payPrice() {
				if(this.totalPrice === 0) {
					return `￥${this.minPrice}起送`
				} else if(this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}起送`
				} else {
					return '去结算'
				}
			},
			listShow() {
				if(!this.totalCount) {
					this.fold = true
					return false
				}
				let show = !this.fold
				if(show) {
					this.$nextTick(() => {
						if(!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							})
						} else {
							this.scroll.refresh()
						}
					})
				}
				return show
			},
		},
		methods: {
			drop(el) {
				for(let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i]
					if(!ball.show) {
						ball.show = true
						ball.el = el
						this.dropBalls.push(ball)
						return
					}
				}
			},
			beforeEnter(el) {
				let count = this.balls.length
				while(count--) {
					let ball = this.balls[count]
					if(ball.show) {
						let rect = ball.el.getBoundingClientRect()
						let x = rect.left - 32
						let y = -(window.innerHeight - rect.top - 22)
						el.style.display = ''
						el.style.webkitTransform = `translate3d(0,${y}px,0)`
						el.style.transform = `translate3d(0,${y}px,0)`
						let inner = el.getElementsByName('inner-hook')[0]
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`
						inner.style.transform = `translate3d(${x}px,0,0)`
					}
				}
			},
			enter(el, done) {
				let rf = el.offsetHeight
				this.$nextTick(() => {
					el.style.webkitTransform = `translate3d(0,0,0)`
					el.style.transform = `translate3d(0,0,0)`
					let inner = el.getElementsByName('inner-hook')[0]
					inner.style.webkitTransform = `translate3d(0,0,0)`
					inner.style.transform = `translate3d(0,0,0)`
					el.addEventListener('transitionend', done)
				})
			},
			afterEnter(el) {
				this.ball = this.dropBalls.shift()
				if(ball) {
					ball.show = false
					el.style.display = 'none'
				}
			},
			toggleList() {
				if(!this.totalCount) {
					return
				}
				this.fold = !this.fold
			},
			hideList() {
				this.fold = true
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0
				})
			},
			pay() {
				if(this.totalPrice === 0) {
					return
				}
				this.payMethodsShow = true
			},
			back() {
				this.payMethodsShow = false
			}
		},
		components: {
			'v-cartcontrol': cartcontrol
		},
	}
</script>

<style>
	.shopcart {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 48px;
		z-index: 400;
	}
	
	.jy-content {
		display: flex;
		font-size: 0;
		background-color: #141D27;
		color: rgba(255, 255, 255, 0.4);
	}
	
	.jy-content-left {
		flex: 1;
	}
	
	.jy-logo-wrapper {
		display: inline-block;
		position: relative;
		top: -10px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		border-radius: 1000px;
		margin: 0 12px;
		padding: 6px;
		background-color: #141D27;
	}
	
	.jy-logo {
		width: 100%;
		height: 100%;
		border-radius: 1000px;
		background-color: #2b343c;
		text-align: center;
	}
	
	.highlight-logo {
		background-color: rgb(0, 160, 220)
	}
	
	.icon-iconfontshopcart {
		font-size: 24px;
		line-height: 44px;
		color: #80858a;
	}
	
	.highlight-icon {
		color: #FFFFFF;
	}
	
	.jy-total-num {
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		font-size: 9px;
		font-weight: 700;
		color: #FFFFFF;
		background-color: rgb(240, 20, 20);
		text-align: center;
		border-radius: 16px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
	}
	
	.jy-sCart-price {
		display: inline-block;
		vertical-align: top;
		margin-top: 12px;
		line-height: 24px;
		padding-right: 12px;
		box-sizing: border-box;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 16px;
		font-weight: 700;
	}
	
	.highlight-price {
		color: #FFFFFF;
	}
	
	.jy-delivery-price {
		display: inline-block;
		vertical-align: top;
		margin: 12px 0 0 12px;
		line-height: 24px;
		font-size: 10px;
	}
	
	.jy-content-right {
		flex: 0 0 105px;
		width: 105px;
		background-color: rgba(0, 0, 0, 0.7)
	}
	
	.jy-min-price {
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 12px;
		font-weight: 700;
	}
	
	.enough {
		background-color: #00b43c;
		color: #FFFFFF;
	}
	.jy-shopcart-list-wrapper{
		position: fixed;
		left: 0;
		top:93%;
		width: 100%;
		z-index: 280;
	}
	.jy-shopcart-list {
		
		transform: translate3d(0, -100%, 0);
		
	}
	
	.fold-enter-active,
	.fold-leave-active {
		transition: all 0.5s;
	}
	
	.fold-enter,
	.fold-leave-active {
		transform: translate3d(0, 0, 0);
	}
	
	.jy-list-header {
		display: flex;
		height: 40px;
		line-height: 40px;
		padding: 0 18px;
		background-color: #F3F5F7;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.jy-list-title {
		flex: 1;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	
	.jy-empty {
		font-size: 12px;
		color: rgb(0, 160, 220);
	}
	
	.jy-list-content {
		padding: 0 18px;
		max-height: 217px;
		overflow: hidden;
		background-color: #FFFFFF;
	}
	
	.jy-food-1 {
		position: relative;
		padding: 12px 0;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.jy-name-2 {
		font-size: 14px;
		line-height: 24px;
		color: rgb(7, 17, 27);
	}
	
	.jy-price2 {
		position: absolute;
		right: 90px;
		bottom: 12px;
		font-size: 14px;
		line-height: 24px;
		font-weight: 700;
		color: rgb(240, 20, 20);
	}
	
	.jy-cartcontrol-wrapper2 {
		position: absolute;
		right: 0;
		bottom: 6px;
	}
	
	.jy-mask {
		position: fixed;
		bottom: 48px;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(7, 17, 27, 0.6);
		backdrop-filter: blur(10px);
		opacity: 1;
		z-index: 250;
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
		background-color: rgba(7, 17, 27, 0);
	}
	
	.jy-pay-methods-wrapper {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 200;
	}
	
	.jy-pay-content {
		width: 100%;
		height: 100%;
		background: #fff;
		padding: 30px;
		box-sizing: border-box;
	}
	
	.jy-pay-header {
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.jy-pay-title {
		font-size: 18px;
		font-weight: 700;
		color: #666;
	}
	
	.jy-pay-list {
		padding: 20px 0;
	}
	
	.jy-pay-methods {
		font-size: 16px;
		line-height: 26px;
		padding: 10px 0;
	}
	
	.jy-back {
		position: fixed;
		bottom: 50px;
		width: 100%;
		height: 50px;
		text-align: center;
		box-sizing: border-box;
	}
	
	.jy-backBtn {
		width: 120px;
		height: 50px;
		line-height: 50px;
		background: #aaa;
		color: #fff;
		margin: 0 auto;
	}
</style>