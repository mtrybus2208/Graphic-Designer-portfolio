// about.js
import './main.scss';
import $ from "jquery";
import './jquery.magnific-popup.min.js'



$(document).ready(function() {
	$('.galleryItem').magnificPopup({
		mainClass: 'mfp-fade',
		removalDelay: 0,
		type: 'image',
		gallery: {
		preload: [0,2],
		navigateByImgClick: true,
		enabled: true
	  },
	      image: {
		    titleSrc: 'data-title'
		  }
	});
 
});
 