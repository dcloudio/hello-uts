package uts.sdk.modules.utsSyntaxcase

import android.os.Build
import io.dcloud.uts.UTSAndroid
import io.dcloud.uts.console

object NativeCode {

    fun getPhoneInfo():String{
        val ret = "${Build.BOARD}-${Build.USER}"
        console.log("PhoneInfo",ret)
        return ret
    }

    fun finishActivity(){
        UTSAndroid.getUniActivity()?.finish()
    }
	
    fun getJavaUser():JavaUser{
      return JavaUser("张三",12)
    }

}