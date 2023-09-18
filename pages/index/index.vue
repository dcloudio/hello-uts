<template>
	<view>
		<page-head :title="title"></page-head>
			<input class="uni-input"  v-model="stringParam" />
			<view class="uni-btn-v uni-common-mt">
				<button type="primary"  @tap="testDoSthWithCallback">uts异步方法（无参数）</button>
				<button type="primary"  @tap="testDoSthWithString">uts异步方法（字符串参数）</button>
				<button type="primary"  @tap="testDoSthWithJSON">uts异步方法（json参数）</button>
				<button type="primary"  @tap="testBuildinObject">内置对象语法测试</button>
			</view>
	</view>
</template>
<script>
	import { callWithJSONParam, callWithStringParam, callWithoutParam } from "../../uni_modules/uts-helloworld";
	
	export default {
		data() {
			return {
				title: 'UTS入门示例',
				stringParam:"hello world",
			}
		},
		
		methods: {
			
			/**
			 * 测试无参数调用
			 */
			testDoSthWithCallback: function () {
				
				callWithoutParam(
					()=>{
						uni.showToast({
							title:'成功调用uts插件uts-helloworld的callWithoutParam',
							icon:'none'
						});
					}
				);
			},
			/**
			 * 测试字符串参数回调
			 */
			testDoSthWithString: function () {
				
				callWithStringParam(
					this.stringParam,
					function(response){
						uni.showToast({
							title:'uts插件uts-helloworld的callWithStringParam方法收到了你输入的字符串：'+response,
							icon:'none'
						});
					},
				);
			},
			/**
			 * 测试json参数回调
			 */
			testDoSthWithJSON: function () {
				var inputObject = {
					inputText:this.stringParam,
					errCode:0
				}
				
				callWithJSONParam({
					input:inputObject,
					success:function(response){
						uni.showToast({
							title:'执行结果:' + JSON.stringify(response),
							icon:'none'
						});
					}
				});
			},
			/**
			 * 测试内置对象
			 */
			testBuildinObject: function() {
				uni.navigateTo({
				    url: `/pages/index/basicTest`
				})
			}
			
		}
	}
</script>

<style>

  
</style>