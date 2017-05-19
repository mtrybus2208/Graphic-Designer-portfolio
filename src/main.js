// main.js
import './main.scss';
const $moreFilms =  document.querySelector('#loader_wrapper'); 
const $body =  document.querySelector('body');

$moreFilms.addEventListener('click',()=>{
	$body.classList.add('loaded');
});
 
if(document.location.hash == '#n'){
	$body.classList.add('loaded');
	document.location.hash = '';
}
 