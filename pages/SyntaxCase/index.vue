<template>
    <view>
        <button @click="testUtsSync">点击测试uts同步方法</button>
        <view>测试return：
            {{ format(testUtsSyncResult) }}
        </view>
        <button @click="testUtsSyncWithCallback">
            点击测试uts带callback的同步方法
        </button>
        <view>测试return：{{ format(testUtsSyncWithCallbackResult.return) }}</view>
        <view>测试success：{{ format(testUtsSyncWithCallbackResult.success) }}</view>
        <view>测试complete：{{ format(testUtsSyncWithCallbackResult.complete) }}</view>
        <button @click="testUtsAsync">点击测试uts异步方法</button>
        <view>测试return：{{ format(testUtsAsyncResult.return) }}</view>
        <view>测试success：{{ format(testUtsAsyncResult.success) }}</view>
        <view>测试complete：{{ format(testUtsAsyncResult.complete) }}</view>
        <button @click="testUtsClassConstructor">点击测试uts class构造函数</button>
        <view>测试callback：{{ format(testUtsClassConstructorResult.callback) }}</view>
        <button @click="testUtsClassStaticProp">点击测试uts class静态属性</button>
        <view>测试value：{{ format(testUtsClassStaticPropResult) }}</view>
        <button @click="testUtsClassStaticSyncWithCallback">
            点击测试uts class静态方法
        </button>
        <view>测试return：{{ format(testUtsClassStaticSyncWithCallbackResult.return) }}</view>
        <view>测试success：{{ format(testUtsClassStaticSyncWithCallbackResult.success) }}</view>
        <view>测试complete：{{ format(testUtsClassStaticSyncWithCallbackResult.complete) }}</view>
        <button @click="testUtsClassStaticAsync">点击测试uts class静态异步方法</button>
        <view>测试return：{{ format(testUtsClassStaticAsyncResult.return) }}</view>
        <view>测试success：{{ format(testUtsClassStaticAsyncResult.success) }}</view>
        <view>测试complete：{{ format(testUtsClassStaticAsyncResult.complete) }}</view>
        <button @click="testUtsClassProp">点击测试uts class实例属性</button>
        <view>测试value：{{ format(testUtsClassPropResult) }}</view>
        <button @click="testUtsClassSyncWithCallback">
            点击测试uts class实例方法
        </button>
        <view>测试return：{{ format(testUtsClassSyncWithCallbackResult.return) }}</view>
        <view>测试success：{{ format(testUtsClassSyncWithCallbackResult.success) }}</view>
        <view>测试complete：{{ format(testUtsClassSyncWithCallbackResult.complete) }}</view>
        <button @click="testUtsClassAsync">点击测试uts class实例异步方法</button>
        <view>测试return：{{ format(testUtsClassAsyncResult.return) }}</view>
        <view>测试success：{{ format(testUtsClassAsyncResult.success) }}</view>
        <view>测试complete：{{ format(testUtsClassAsyncResult.complete) }}</view>
        <button @click="testUtsClassInstance">点击测试uts方法返回类实例</button>
        <view>测试prop：{{ format(testUtsClassInstanceResult.prop) }}</view>
        <view>测试return：{{ format(testUtsClassInstanceResult.return) }}</view>
        <view>测试success：{{ format(testUtsClassInstanceResult.success) }}</view>
        <view>测试complete：{{ format(testUtsClassInstanceResult.complete) }}</view>
        <view>测试callback：{{ format(testUtsClassInstanceResult.callback) }}</view>
        <button @click="testAll">点击测试所有</button>
    </view>
</template>
<script>
    import {
        MAX,
        testSync,
        testSyncWithCallback,
        testAsync,
        Test,
        request,
    } from "../../uni_modules/uts-syntaxcase";

    let test
    let id = 0
    export default {
        data() {
            return {
                testUtsSyncResult: null,
                testUtsSyncWithCallbackResult: {
                    return: null,
                    success: null,
                    fail: null,
                    complete: null,
                },
                testUtsAsyncResult: {
                    return: null,
                    success: null,
                    fail: null,
                    complete: null,
                },
                testUtsClassConstructorResult: {
                    callback: null
                },
                testUtsClassStaticPropResult: null,
                testUtsClassStaticSyncWithCallbackResult: {
                    return: null,
                    success: null,
                    fail: null,
                    complete: null,
                },
                testUtsClassStaticAsyncResult: {
                    return: null,
                    success: null,
                    fail: null,
                    complete: null,
                },
                testUtsClassPropResult: null,
                testUtsClassSyncWithCallbackResult: {
                    return: null,
                    success: null,
                    fail: null,
                    complete: null,
                },
                testUtsClassAsyncResult: {
                    return: null,
                    success: null,
                    fail: null,
                    complete: null,
                },
                testUtsClassInstanceResult: {
                    prop: null,
                    return: null,
                    success: null,
                    fail: null,
                    complete: null,
                    callback: null
                }
            }
        },
        methods: {
            format(v) {
                return v == null ? "--" : v ? "通过" : "未通过";
            },
            testAll() {
                this.testUtsSync();
                this.testUtsSyncWithCallback();
                this.testUtsAsync();
                this.testUtsClassConstructor();
                this.testUtsClassStaticProp();
                this.testUtsClassStaticSyncWithCallback();
                this.testUtsClassStaticAsync();
                this.testUtsClassProp();
                this.testUtsClassSyncWithCallback();
                this.testUtsClassAsync();
                this.testUtsClassInstance();
            },
            testUtsSync() {
                this.testUtsSyncResult = false;
                try {
                    if (testSync("dcloud").msg === "hello dcloud") {
                        this.testUtsSyncResult = true;
                    }
                } catch (e) {
                    console.error("testUtsSync", e);
                }
            },
            testUtsSyncWithCallback() {
                try {
                    this.testUtsSyncWithCallbackResult.return = false;
                    this.testUtsSyncWithCallbackResult.success = false;
                    // testUtsSyncWithCallbackResult.fail = false;
                    this.testUtsSyncWithCallbackResult.complete = false;
                    if (
                        testSyncWithCallback({
                            type: "success",
                            success: (res) => {
                                console.log("testSyncWithCallback.success.callback", res);
                                this.testUtsSyncWithCallbackResult.success = true;
                            },
                            fail: (res) => {
                                console.log("testSyncWithCallback.fail.callback", res);
                                // testUtsSyncWithCallbackResult.fail = true;
                            },
                            complete: (res) => {
                                console.log("testSyncWithCallback.complete.callback", res);
                                this.testUtsSyncWithCallbackResult.complete = true;
                            },
                        }).name === "testSyncWithCallback"
                    ) {
                        this.testUtsSyncWithCallbackResult.return = true;
                    }
                } catch (e) {}
            },
            async testUtsAsync() {
                this.testUtsAsyncResult.return = false;
                this.testUtsAsyncResult.success = false;
                // testUtsAsyncResult.fail = false;
                this.testUtsAsyncResult.complete = false;
                try {
                    const res = await testAsync({
                        type: "success",
                        success: (res) => {
                            console.log("testAsync.success.callback", res);
                            this.testUtsAsyncResult.success = true;
                        },
                        fail: (res) => {
                            console.log("testAsync.fail.callback", res);
                        },
                        complete: (res) => {
                            console.log("testAsync.complete.callback", res);
                            this.testUtsAsyncResult.complete = true;
                        },
                    });
                    if (res.name === "testAsync") {
                        this.testUtsAsyncResult.return = true;
                    }
                } catch (e) {}
            },
            testUtsClassConstructor() {
                this.testUtsClassConstructorResult.callback = false
                id++
                test = new Test(id, {
                    name: 'name' + id,
                    callback: (res) => {
                        console.log(res)
                        this.testUtsClassConstructorResult.callback = true
                    }
                })
            },
            testUtsClassStaticProp() {
                this.testUtsClassStaticPropResult = false
                if (Test.type === 'Test') {
                    this.testUtsClassStaticPropResult = true
                }
            },
            testUtsClassStaticSyncWithCallback() {
                try {
                    this.testUtsClassStaticSyncWithCallbackResult.return = false;
                    this.testUtsClassStaticSyncWithCallbackResult.success = false;
                    // testUtsClassStaticSyncWithCallbackResult.fail = false;
                    this.testUtsClassStaticSyncWithCallbackResult.complete = false;
                    if (
                        Test.testClassStaticSyncWithCallback({
                            type: "success",
                            success: (res) => {
                                console.log("testStaticSyncWithCallback.success.callback", res);
                                this.testUtsClassStaticSyncWithCallbackResult.success = true;
                            },
                            fail: (res) => {
                                console.log("testStaticSyncWithCallback.fail.callback", res);
                                // testUtsClassStaticSyncWithCallbackResult.fail = true;
                            },
                            complete: (res) => {
                                console.log("testStaticSyncWithCallback.complete.callback", res);
                                this.testUtsClassStaticSyncWithCallbackResult.complete = true;
                            },
                        }).name === "testSyncWithCallback"
                    ) {
                        this.testUtsClassStaticSyncWithCallbackResult.return = true;
                    }
                } catch (e) {}
            },
            async testUtsClassStaticAsync() {
                this.testUtsClassStaticAsyncResult.return = false;
                this.testUtsClassStaticAsyncResult.success = false;
                // testUtsClassStaticAsyncResult.fail = false;
                this.testUtsClassStaticAsyncResult.complete = false;
                try {
                    const res = await Test.testClassStaticAsync({
                        type: "success",
                        success: (res) => {
                            console.log("testAsync.success.callback", res);
                            this.testUtsClassStaticAsyncResult.success = true;
                        },
                        fail: (res) => {
                            console.log("testAsync.fail.callback", res);
                        },
                        complete: (res) => {
                            console.log("testAsync.complete.callback", res);
                            this.testUtsClassStaticAsyncResult.complete = true;
                        },
                    });
                    if (res.name === "testAsync") {
                        this.testUtsClassStaticAsyncResult.return = true;
                    }
                } catch (e) {}
            },
            testUtsClassProp() {
                if (!test) {
                    this.testUtsClassConstructor()
                }
                this.testUtsClassPropResult = false
                if (test.id > 0) {
                    this.testUtsClassPropResult = true
                }
            },
            testUtsClassSyncWithCallback() {
                if (!test) {
                    this.testUtsClassConstructor()
                }
                try {
                    this.testUtsClassSyncWithCallbackResult.return = false;
                    this.testUtsClassSyncWithCallbackResult.success = false;
                    // testUtsClassSyncWithCallbackResult.fail = false;
                    this.testUtsClassSyncWithCallbackResult.complete = false;
                    if (
                        test.testClassSyncWithCallback({
                            type: "success",
                            success: (res) => {
                                console.log("testSyncWithCallback.success.callback", res);
                                this.testUtsClassSyncWithCallbackResult.success = true;
                            },
                            fail: (res) => {
                                console.log("testSyncWithCallback.fail.callback", res);
                                // testUtsClassSyncWithCallbackResult.fail = true;
                            },
                            complete: (res) => {
                                console.log("testSyncWithCallback.complete.callback", res);
                                this.testUtsClassSyncWithCallbackResult.complete = true;
                            },
                        }).name === "testSyncWithCallback"
                    ) {
                        this.testUtsClassSyncWithCallbackResult.return = true;
                    }
                } catch (e) {}
            },
            async testUtsClassAsync() {
                if (!test) {
                    this.testUtsClassConstructor()
                }
                this.testUtsClassAsyncResult.return = false;
                this.testUtsClassAsyncResult.success = false;
                // testUtsClassAsyncResult.fail = false;
                this.testUtsClassAsyncResult.complete = false;
                try {
                    const res = await test.testClassAsync({
                        type: "success",
                        success: (res) => {
                            console.log("testAsync.success.callback", res);
                            this.testUtsClassAsyncResult.success = true;
                        },
                        fail: (res) => {
                            console.log("testAsync.fail.callback", res);
                        },
                        complete: (res) => {
                            console.log("testAsync.complete.callback", res);
                            this.testUtsClassAsyncResult.complete = true;
                        },
                    });
                    console.log('res', res)
                    if (res.name === "testAsync") {
                        this.testUtsClassAsyncResult.return = true;
                    }
                } catch (e) {
                    console.error(e)
                }
            },
            testUtsClassInstance() {
                this.testUtsClassInstanceResult.prop = false;
                this.testUtsClassInstanceResult.return = false;
                this.testUtsClassInstanceResult.success = false;
                // testUtsClassAsyncResult.fail = false;
                this.testUtsClassInstanceResult.complete = false;
                this.testUtsClassInstanceResult.callback = false;
                const url = 'https://dcloud.io/'
                const task = request(url)
                if (task.url === url && task.abort().url === url) {
                    this.testUtsClassInstanceResult.prop = true;
                }
                task.onCallback((res) => {
                    if (res === 'onCallback') {
                        this.testUtsClassInstanceResult.callback = true;
                    }
                })
                const res = task.sync({
                    success: (res) => {
                        console.log("task.sync.success.callback", res);
                        this.testUtsClassInstanceResult.success = true;
                    },
                    fail: (res) => {
                        console.log("task.sync.fail.callback", res);
                    },
                    complete: (res) => {
                        console.log("task.sync.complete.callback", res);
                        this.testUtsClassInstanceResult.complete = true;
                    },
                })
                if (res === 'sync') {
                    this.testUtsClassInstanceResult.return = true;
                }
            }
        }
    }
</script>