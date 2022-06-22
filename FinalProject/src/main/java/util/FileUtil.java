package util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class FileUtil {

	public static String changeFileName(String fileName) {
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat format = new SimpleDateFormat();
		
		format.applyPattern("yyyyMMddHHmmss");
		
		return format.format(cal.getTime()) + "_" + fileName;
	}
}
