package uts.sdk.modules.utsSyntaxcase

import android.os.Build
import io.dcloud.uts.UTSAndroid


object NativeCode {

    fun getPhoneInfo():String{
        return "${Build.BOARD}-${Build.USER}"
    }

    fun finishActivity(){
        UTSAndroid.getUniActivity()?.finish()
    }
	
    fun getJavaUser():JavaUser{
      return JavaUser("张三",12)
    }

}