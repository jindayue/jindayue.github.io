<template>
	<div class="star" >
		<span class="jy-star-item" v-for="itemClass in itemClasses" :class="itemClass" track-by="$index">
			
		</span>
	</div>
</template>

<script>
	const LENGTH = 5
	const CLS_ON = 'on'
	const CLS_HALF = 'half'
	const CLS_OFF = 'off'

	export default {
		props: {
			score: {
				type: Number
			}
		},
		computed: {
			itemClasses() {
				let result = []
				let score = Math.floor(this.score * 2) / 2
				let hasDecimal = score % 1 !== 0
				let integer = Math.floor(score)
				for(let i = 0; i < integer; i++) {
					result.push(CLS_ON)
				}
				if(hasDecimal) {
					result.push(CLS_HALF)
				}
				while(result.length < LENGTH) {
					result.push(CLS_OFF)
				}
				return result
			},
		}
	}
</script>

<style>
	.star {
		display: flex;
		justify-content: center;
		width: 100%;
		font-size: 0;
		margin-top: 16px;
		
	}
	
	.jy-star-item {
		display: inline-block;
		width: 20px;
		height: 20px;
		margin-right: 22px;
		background-size: 20px 20px;
	
	}
	
	.on {
		background-image: url("png/star48_on@2x.png");
	}
	
	.half {
		background-image: url("png/star48_half@2x.png");
	}
	
	.off {
		background-image: url("png/star48_off@2x.png");
	}
</style>