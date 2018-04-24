<template>
	<div>
		<div class="goods">
		<div class="jy-menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="jy-menu-item" :class="{current:currentIndex===index}" v-for="(item,index) in goods" @click="selectMenu(index,$event)">
					<span class="jy-item-text">
							<span class="jy-item-png" :class="classMap[item.type]" v-show="item.type>0"></span> {{ item.name }}</span>
				</li>
			</ul>
		</div>
		<div class="jy-foods-wrapper" ref="foodsWrapper">
			<ul>
				<li class="jy-food-list food-list-hook" v-for="(item,index) in goods">
					<h1 class="jy-title">{{ item.name }}</h1>
					<ul>
						<li class="jy-food-item" v-for="food in item.foods" @click="selectFood(food,$event)">
							<div class="jy-food-img">
								<img :src="food.icon" />
							</div>
							<div class="jy-food-content">
								<h2 class="jy-name-2">{{ food.name }}</h2>
								<p class="jy-desc">{{ food.description }}</p>
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
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>	
	<v-shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
		<v-food :food="selectedFood" ref="food"></v-food> 
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import food from '../food/food.vue'
	import shopcart from '../shopcart/shopcart.vue'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'
	const resData = require('../../assets/api/data.json')

	export default {
		props: {
			seller: {
				type: Object

			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood:{}
			}
		},
		computed: {
			currentIndex() {
				for(let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i + 1]
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i
					}
				}
				return 0
			},
			selectFoods() {
				let foods = []
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			this.goods = resData.goods
			this.$nextTick(() => {
				this.initScroll()
				this.calculateHeight()
			})
		},
		methods: {
			initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				})
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click: true,
					probeType: 3
				})
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			calculateHeight() {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				let height = 0
				this.listHeight.push(height)
				for(let i = 0; i < foodList.length; i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},
			selectMenu(index, event) {
				if(!event._constructed) {
					return
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el, 300)
			},
			drop(target) {
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target)
				})				
			},
			selectFood(food,event){
				if(!event._constructed) {
					return
				}
				this.selectedFood = food
				this.$refs.food.show()
			}
		},
		components: {
			'v-shopcart': shopcart,
			'v-cartcontrol': cartcontrol,
			'v-food':food
		},
		events: {
			'cart-add' (target) {
				this.drop(target)
			}

		}
	}
</script>

<style>
	.goods{
		display: flex;
		position: absolute;
		top: 175px;
		bottom: 46px;
		width: 100%;
		
		overflow: hidden;
		z-index: 100;
	}
	.jy-menu-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background-color: #f3f5f7;
	}
	.jy-menu-item{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 56px;
		height: 54px;
		padding: 0 12px;
		border-bottom: 1px solid rgba(7,17,27,0.1);

	}
	.current{
		background-color: #FFFFFF;
		color: rgb(240,20,20);
	}
	.jy-item-text{
		display: inline-block;
		font-size:12px ;
		font-weight: 200;
		line-height: 14px;
		color: rgb(77,85,93);
		
	}
	.jy-item-png{
		display: inline-block;
		width: 12px;
		height: 12px;
		background-size: 12px 12px;
		margin-right: 2px;
	}
	.decrease {
		background-image: url('png/decrease_3@2x.png');
	}
	
	.discount {
		background-image: url('png/discount_3@2x.png');
	}
	
	.special {
		background-image: url('png/special_3@2x.png');
	}
	
	.invoice {
		background-image: url('png/invoice_3@2x.png');
	}
	
	.guarantee {
		background-image: url('png/guarantee_3@2x.png');
	}		
	.jy-foods-wrapper{
		flex: 1;
	}
	.jy-title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		font-size: 12px;
		color: rgb(147,153,159);
		background-color: #f3f5f7;
	    border-left: 2px solid #d9dde1;
	}
	.jy-food-item{
		display: flex;
		margin: 18px;
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.jy-food-img{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.jy-food-img img{
		width: 57px;
		height: 57px;
	}
	.jy-food-content{
		flex: 1;
	}
	.jy-name-2{
		font-size: 14px;
		color: rgb(7,17,27);
		line-height: 14px;
		margin: 2px 0 8px 0;
	}
	.jy-desc{
		
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 12px;
		margin-bottom: 6px;
	}
	.jy-extra{
		display: flex;
		align-items: center;
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 10px;
		margin-bottom: 8px;
	}
	.jy-count{
		margin-right: 12px;
	}
	.jy-func{
		display: inline-flex;
		height: 36px;
		width: 100%;
		justify-content:center;
		align-items:center;
	}
	.jy-price{
		flex: 1;
		
	}
	.jy-cartcontrol-wrapper1{
	    flex: 1;
	    display: inline-flex;
	    flex-direction: row-reverse;
	}	
	.jy-mark{
		font-size: 10px;
		color:rgb(240,20,20);
		font-weight: normal;
		
	}
	.jy-now-price{
		font-size: 14px;
		color: rgb(240,20,20);
		font-weight: 700;
		
	}
	.jy-old-price{
		font-size: 10px;
		color:rgb(147,153,159);
		font-weight: normal;
		text-decoration: line-through;
	}
		
</style>