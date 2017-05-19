//##import modules
import './main.scss';
import $ from "jquery";
import autosize from "autosize";

(function(){
//##init autosize to textarea -  autosize is a module from node_modules
autosize(document.querySelector('textarea'));
//##validation object
const validation = {
	//settings
	namePass: false,
	emailPass: false,
	textPass: false,
	phonePass: true,
	//set the error messages
	reqError: 'Wymagane',
	emailError: 'Wpisz poprawny email',
	phoneError: 'Wpisz poprawny nr telefonu',
	//message when ajax is sending
	waitMsg: 'Wysyłam...',
	init() {
		this.cacheDom();
		this.bindEvents();
	},
	cacheDom() {
		this.$el = $('.main-form');
		this.$formItem = this.$el.find('.form-item');
		this.$button = this.$el.find('.button');
		this.$name = this.$el.find('.name-input');
		this.$email = this.$el.find('.email-input');
		this.$phone = this.$el.find('.phone-input');
		this.$text = this.$el.find('textarea');
		this.$formContent = this.$el.find('.form-content');
		this.$thanksAfter = this.$el.find('.thanks-after');
	},
	bindEvents() {
		this.$formItem.on( "focusout", this.holdLabels);
		this.$button.on('click', this.validate.bind(this));
	},
	//function  to hold labels when text is in the input
	holdLabels() {
		$(this).val() == "" ? $(this).removeClass('has-value') : $(this).addClass('has-value');
	},
	validate(e) {
		e.preventDefault();
		this.required(this.$name,this.$email,this.$text,this.$phone);	
	},
	required(name,email,text,phone) {
		//set required field
		this.req = [name,email,text];
		this.req.forEach((v,i)=>{
			if(v.val().length == 0){
				this.errorHandle($(v),true,this.reqError);
			}else{
				if(i==1){
					if(this.validateEmail(v.val())) {
						this.errorHandle($(v),false);	
						this.emailPass = true;
					}else{
						this.errorHandle($(v),true,this.emailError);	 
						this.emailPass = false;
					}
				}
				if(i!=1){this.errorHandle($(v),false)}  
				if(i==0){this.namePass = true;}  
				if(i==2){this.textPass = true;}
			} 
		})//forEach loop on required fields
 		if(phone.val().length != 0){
			if(this.validatePhone(phone.val())){
				 this.errorHandle($(phone),false);
				 this.phonePass=true;
			}else{
				this.phonePass=false;
				this.errorHandle($(phone),true,this.phoneError);
			}		 
		}//if phone
		if(this.namePass==true && this.emailPass==true && this.textPass==true && this.phonePass == true){
			this.prepareMail(name,email,text,phone);
		}
	},
	prepareMail(name,email,text,phone) {
		this.$button.html(this.waitMsg);
		const msgObject = {
			'Imie:'	: 	name.val(),
			'E-mail:' : email.val(),
			'Treść:' : text.val(),
			'Telefon:' : phone.val()
		}
		const mailPromise = this.sendMessage(msgObject);
		mailPromise.done(this.succesMail.bind(this))
		mailPromise.fail(function(){console.log("error")})
	},
	//return a promise
	sendMessage(msg) {
		return $.ajax({
		 	type: 'POST',
		 	url: 'https://formspree.io/mtrybus2208@wp.pl',
		 	data: msg,
		 	dataType: "json"
		 });
	},
	//animation after success
	succesMail() {
		this.$el.addClass('finished');
		this.$formContent.animate({opacity: 0}, 300 ).animate({height: 0}, 400 );
		this.$thanksAfter.animate({opacity: 1}, 200 );
	},
	//show error messages
	errorHandle(item,status,msg) {
		if(status == true){
			item.parent().find('.input-error').html(msg);
			item.parent().addClass('form-error');
		}else if(status == false){
			item.parent().removeClass('form-error');
		}	
	},
	validateEmail(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	validatePhone(phone) {
		const re = /^\+?\d([ \-]?\d){6,}$/;
		if(re.test(phone)) return true;
		return false;
	}
}
validation.init();
})()//end IFFE
 