<template>
    <view>
        <page-head :title="title"></page-head>
        <view class="uni-btn-v uni-common-mt">
            <button @tap="callKotlinMethodGetInfoTest">调用kotlin方法</button>
            <button @tap="callJavaMethodGetInfoTest">调用java方法(需自定义基座)</button>
        </view>
    </view>
</template>
<script>
    import { callKotlinMethodGetInfo, callJavaMethodGetInfo} from "../../uni_modules/uts-syntaxcase";
    
    export default {
        data() {
            return {
                title: 'UTS混编示例',
            }
        },

        methods: {
            callKotlinMethodGetInfoTest: function () {

                let phoneInfo = callKotlinMethodGetInfo();
                uni.showToast({
                  title:phoneInfo
                })
            },
            callJavaMethodGetInfoTest: function () {
                let javaInfo = callJavaMethodGetInfo();
                uni.showToast({
                  title:javaInfo
                })
            },

        }
    }
</script>

<style>


</style>