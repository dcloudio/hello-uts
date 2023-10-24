<template>
	<button @click="logStr">打印字符串</button>
	<button @click="logFloat">打印浮点数</button>
	<button @click="logInt">打印整数</button>
	<button @click="logObject">打印对象</button>
	<button @click="logFunction">打印函数</button>
	<button @click="logFile">打印文件</button>
	<button @click="logDate">打印日期</button>
	<button @click="logDateCombine">组合打印日期</button>
</template>

<script>
	import {
		logStrTest,
		logIntTest,
		logFloatTest,
		logObjectTest,
		logFunctionTest,
		logDateTest,
		logFileTest,
		logDateCombineTest
	} from '@/uni_modules/uts-advance'



	export default {
		data() {
			return {}
		},
		methods: {
			
			logStr() {
				logStrTest()
			},

			logFloat() {
				logFloatTest()
			},
			logInt() {
				logIntTest()
			},
			logObject() {
				logObjectTest()
			},
			logFunction() {
				logFunctionTest()
			},
			logFile() {
				logFileTest()
			},
			logDate() {
				logDateTest()
			},
			logDateCombine() {
				logDateCombineTest()
			},

		}
	}
</script>

<style>
</style>