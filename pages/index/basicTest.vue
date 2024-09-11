<template>
    <view class="content">
		<page-head :title="title"></page-head>
        <view v-for="(item,name) in result" :key="name" class="result">
            <view>{{name}}测试结果：</view>
             <view>
                测试api：{{item.passed.join(', ')}}
            </view>
            <view>总共：{{item.total}}</view>
            <view>通过：{{item.passed.length}}</view>
            <view>失败：{{item.failed.length}}</view>
            <view v-for="(fail,index) in item.failed" :key="index" class="failed">
                <view>{{fail.split('\n')[0]}}</view>
                <view>{{fail.split('\n')[1]}}</view>
            </view>
        </view>
    </view>
</template>
<script>
    import {
        runTests
    } from '../../uni_modules/uts-tests'
    import { onTest1, testKeepAlive, testKeepAliveOption, TestKeepAliveClass } from '@/uni_modules/uts-tests'
    export default {
        data() {
            return {
				title: 'UTS基础语法',
                result: {}
            }
        },
        onReady() {
            this.test()
        },
        methods: {
            test() {
                this.result = runTests()
                console.log(this.result)
            },
               
            jest_testCallbackKeepAlive() {
              let ret = true
              let count = 0;
              
              onTest1((res) => {
                count++;
                console.log("onTest1 callback =====> ", res)
              })
              
              if (count < 2) {
                ret = false
              }
              count = 0;
              
              testKeepAlive((res) => {
                count++;
                console.log(res)
              })
              
              if (count < 2) {
                ret = false
              }
              count = 0;
              
              testKeepAliveOption({
                a: "testKeepAliveOption",
                success: (res) => {
                  count++;
                  console.log("testKeepAliveOption callback =====> ", res)
                }
              })
              
              if (count < 2) {
                ret = false
              }
              count = 0;
              
              TestKeepAliveClass.onTestStatic((res) => {
                count++;
                console.log("onTestStatic callback =====> ", res)
              })
              
              if (count < 2) {
                ret = false
              }
              count = 0;
              
              TestKeepAliveClass.testKeepAliveStatic((res) => {
                count++;
                console.log("testKeepAliveStatic callback =====> ", res)
              })
              
              if (count < 2) {
                ret = false
              }
              count = 0;
              
              TestKeepAliveClass.testKeepAliveOptionStatic({
                a: "testKeepAliveOption",
                success: (res) => {
                  count++;
                  console.log("testKeepAliveOptionStatic callback =====> ", res)
                }
              })
              
              if (count < 2) {
                ret = false
              }
              count = 0;
              
              const obj = new TestKeepAliveClass()
              obj.onTest((res) => {
                count++;
                console.log("TestKeepAliveClass.onTest callback =====> ", res)
              })
              
              if (count < 2) {
                ret = false
              }
              count = 0;
              
              obj.testKeepAlive((res) => {
                count++;
                console.log("TestKeepAliveClass.testKeepAlive callback =====> ", res)
              })
              
              if (count < 2) {
                ret = false
              }
              count = 0;
              
              obj.testKeepAliveOption({
                a: "testKeepAliveOption",
                success: (res) => {
                  count++;
                  console.log("TestKeepAliveClass.testKeepAliveOption callback =====> ", res)
                }
              })
              if (count < 2) {
                ret = false
              }
              return ret
            }
        }
    }
</script>
<style>
	@import '@/common/uni-uvue.css';
	
    .content {
		min-height: 100%;
        padding: 32rpx;
    }

    .passed {
        color: green;
    }

    .failed {
        color: red;
    }
    .result {
        margin-bottom: 20rpx;
    }
</style>
