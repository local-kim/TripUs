package data.service;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import util.RandomNumberKey;

@Service
public class EmailServiceImp implements EmailService {
	@Autowired
	private JavaMailSender emailSender;
	@Autowired
	private RandomNumberKey randomKey;



	private String authenticationKey;

    private MimeMessage createMessage(String user_email)throws Exception{
        MimeMessage  message = emailSender.createMimeMessage();
        authenticationKey = randomKey.createKey();
        message.addRecipients(RecipientType.TO, user_email);//보내는 대상
        message.setSubject("TRIP:US 회원가입 이메일 인증");//제목
 
        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요.나만의 여행 플래너 - TRIP:US입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>아래 코드를 입력해주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "인증번호 : <strong>";
        msgg+= authenticationKey+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("twayong@gmail.com","TRIP:US"));//보내는 사람
 
        return message;
    }
    @Override
    public String sendSimpleMessage(String to)throws Exception {
        // TODO Auto-generated method stub
        MimeMessage message = createMessage(to);
        try{//예외처리
            emailSender.send(message);
        }catch(MailException err){
            err.printStackTrace();
            throw new IllegalArgumentException();
        }
        
        return authenticationKey;
    }

}