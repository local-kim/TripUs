package util;

import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class RandomNumberKey {
	
	// 난수 만들기 
	public String createKey() {
		StringBuffer authenticationKey = new StringBuffer();
		Random randomNumber = new Random();
		
		for(int i = 0; i < 8; i++) { // 인증 코드 8자리
			Integer index = randomNumber.nextInt(3); // 0~2 까지의 랜덤
			
			switch (index) {
				case 0:
					authenticationKey.append((char) ((int)(randomNumber.nextInt(26))+97));
					// a~z 까지 랜덤 (ex. 1+97=98 => (char)98 = 'b')
					break;
				case 1:
					authenticationKey.append((char) ((int)(randomNumber.nextInt(26))+65));
					// A~Z 까지 랜덤
					break;
				case 2:
					authenticationKey.append((randomNumber.nextInt(10)));
					// 0~9 까지 랜덤
					break;
			}
		}
		String auth= authenticationKey.toString();
		return auth;
	}

}
