<template>
	<div class="">
		I am seller
		<button @click="bbb()">点我</button>
		<div class="xxx" :class="zzz">
			dkkdkd
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				/*aaa: 0,*/
				zzz: 'yyy'
			}
		},
		methods: {
			bbb() {
				/*this.aaa = !this.aaa*/
				this.zzz === 'yyy' ? this.zzz = 'zzz' : this.zzz = 'yyy'
			}
		}
	}
</script>

<style>
	.xxx {
		width: 100px;
		height: 100px;
		background-color: #00B43C;
		transition: transform 2s;
	}
	
	.yyy {
		transform: translateY(0);
		color: rgb(0, 0, 200);
	}
	
	.zzz {
		transform: translateY(100%);
		color: rgb(200, 0, 0);
	}
</style>