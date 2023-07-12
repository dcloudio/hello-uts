<template>
	<view>
		<button class="width:100%" @click="getAppContextClick" >getAppContext</button>
		<button class="width:100%" @click="getUniActivityClick">getUniActivity</button>
		<button class="width:100%" @click="getAppTempPathClick">getAppTempPath</button>
		<button class="width:100%" @click="typeofClick">typeof</button>
		<button class="width:100%" @click="checkSystemPermissionGrantedClick">checkSystemPermissionGranted</button>
		<button class="width:100%" @click="getSystemPermissionDeniedClick">getSystemPermissionDenied</button>
		<button class="width:100%" @click="gotoSystemPermissionActivityClick">gotoSystemPermissionActivity</button>
		<button class="width:100%" @click="arrayPermissionFlowClick">组权限申请流程测试</button>
		
	</view>
</template>

<script>
	
	import {
		getAppContextTest,
		getUniActivityTest,
		getAppTempPathTest,
		typeofClickTest,
		checkSystemPermissionGrantedTest,
		getSystemPermissionDeniedTest,
		gotoSystemPermissionActivityTest,
		arrayPermissionFlowTest
	} from '@/uni_modules/uts-platform-api'
	
	/**
	 * 测试在页面生命周期之外，使用api
	 */
	export default {
		data() {
			return {}
		},
		methods: {
			
			getAppContextClick() {
				console.log("getAppContextClick")
				if(getAppContextTest()){
					uni.showToast({
						title:'测试通过'
					})
				}else{
					uni.showToast({
						icon:'error',
						title:'测试失败'
					})
				}
			},
			
			getUniActivityClick() {
				getUniActivityTest()
			},
	
			getAppTempPathClick() {
				getAppTempPathTest()
			},
			typeofClick() {
				if(typeofClickTest()){
					uni.showToast({
						title:'测试通过'
					})
				}else{
					uni.showToast({
						icon:'error',
						title:'测试失败'
					})
				}
			},
			checkSystemPermissionGrantedClick() {
				if(checkSystemPermissionGrantedTest()){
					uni.showToast({
						title:'测试通过'
					})
				}else{
					uni.showToast({
						icon:'error',
						title:'测试失败'
					})
				}
			},
			getSystemPermissionDeniedClick() {
				if(getSystemPermissionDeniedTest()){
					uni.showToast({
						title:'测试通过'
					})
				}else{
					uni.showToast({
						icon:'error',
						title:'测试失败'
					})
				}
			},
			gotoSystemPermissionActivityClick() {
				gotoSystemPermissionActivityTest()
			},
			arrayPermissionFlowClick() {
				arrayPermissionFlowTest()
			}
		}
	}
</script>

<style>
</style>