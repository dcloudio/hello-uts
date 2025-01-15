import DCloudUTSFoundation
import DCloudUniappRuntime

class ReadFile {
	public static func readFile(
	    _ path: String,
	    _ completionHandler: ((ArrayBuffer?, NSNumber) -> Void)? = nil
	) {
	    let absolutePath = UTSiOS.convert2AbsFullPath(path)
	
	    if FileManager.default.fileExists(atPath: absolutePath) == false {
	        completionHandler?(nil, 1)
	        return
	    }
	    
	    let fileUrl = URL(fileURLWithPath: absolutePath)
	    
	    do {
	        let fileData = try Data(contentsOf: fileUrl)
	        let result = ArrayBuffer.fromData(fileData)
	        if result == nil {
	            completionHandler?(nil, 2)
	            return
	        }
	        completionHandler?(result, 0)
	    } catch {
	        completionHandler?(nil, 1)
	    }
	}
}
