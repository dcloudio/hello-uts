<template>
	{{ret}}
	<button @click="instanceCreate">多实例创建测试</button>
	
</template>

<script>
	import {
		User
	} from '@/uni_modules/uts-advance'



	export default {
		data() {
			return {
				ret:''
			}
		},
		methods: {
			
			instanceCreate() {
				
				const user1 = new User("张三", 20);
				let userText1 = user1.describeSelf() 
								
				const user2 = new User("李四", 30);  
				let userText2 = user2.describeSelf()   
								
				const user3 = new User("王五", 40);  
				let userText3 = user3.describeSelf()  

				
				if(userText1 == userText2 || userText1 == userText3 || userText2 == userText3){
					this.ret = '测试未通过'
				}else{
					this.ret = '测试通过'
				}
				
			}

			
		}
	}
</script>

<style>
</style>