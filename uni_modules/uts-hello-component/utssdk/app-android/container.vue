<template>
	<view >
		<slot></slot>
	</view>
</template>
<script lang="uts">

	import LinearLayout from 'android.widget.LinearLayout'

	//原生提供以下属性或方法的实现  
	export default {
		name: "uts-hello-container",
		
		NVLoad(): LinearLayout {
			let contentLayout = new LinearLayout($androidContext)
			contentLayout.orientation = LinearLayout.VERTICAL;
			return contentLayout
		}
		
	}
</script>

