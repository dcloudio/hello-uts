<template>
	<view class="defaultStyles">

	</view>
</template>
<script lang="uts">
	import TextUtils from 'android.text.TextUtils'
	import Button from 'android.widget.Button'
	import LinearLayout from 'android.widget.LinearLayout'
	import Color from 'android.graphics.Color'
	import View from 'android.view.View'

	class ButtonClickListsner extends View.OnClickListener {
		constructor() {}
		override onClick(v ? : View) {
			console.log(v)
		}
	}

	//原生提供以下属性或方法的实现  
	export default {
		
		name: "uts-hello-view",
		
		props: {

			"buttonText": {
				type: String,
				default: "点击触发"
			}
		},
		
		data() {
			return {}
		},
		
		watch: {
			"buttonText": {
				/**
				 * 这里监听属性变化，并进行组件内部更新
				 */
				handler(newButtonText: string) {
					if (this.$el != null) {
						let button = this.$el!.findViewWithTag("centerButton") as Button
						if (!TextUtils.isEmpty(newButtonText)) {
							button.setText(newButtonText)
						}
					}
				},
				immediate: false
			},
		},

		NVLoad(): LinearLayout {
			//必须实现  
			let contentLayout = new LinearLayout($androidContext)
			let button = new Button($androidContext)
			button.setText("点击触发");
			button.setTag("centerButton");
			contentLayout.addView(button, LinearLayout.LayoutParams(500, 500));
			button.setOnClickListener(new ButtonClickListsner())
			return contentLayout
		}
	}
</script>
<style>
	/* 定义默认样式值, 组件使用者没有配置时使用 */
	.defaultStyles {
		width: 750rpx;
		height: 240rpx;
	}
</style>
