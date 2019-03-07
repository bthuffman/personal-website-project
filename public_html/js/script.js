//TYPEWRITER EFFECT
/**
 * @param txtElement is the span element in the html (i.e. class txt-type
 * @param words the data words attribute within the span
 * @param wait, the wait time before the text starts to be deleted
 * */
const TypeWriter = function(txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
}

// Type method
TypeWriter.prototype.type = function() {
	//get current index of word
	const current = this.wordIndex % this.words.length;
	//get full text of the current word
	const fullTxt = this.words[current];
	//check if deleting
	if(this.isDeleting) {
		//Remove character if deleting
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		//Add character if not deleting
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	// Insert txt into the txtElement
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

	// Initial type speed
	let typeSpeed = 300;

	if(this.isDeleting) {
		typeSpeed = typeSpeed / 2;
	}

	//Check to see if the word is complete
	if(!this.isDeleting && this.txt === fullTxt) {
		// Make a pause at the end of typing
		typeSpeed = this.wait;
		// Set delete to true
		this.isDeleting = true;
		//once it completely deletes this word (this text = nothing) then...
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		//Move to the next word
		this.wordIndex++;
		//Pause before typing new word
		typeSpeed = 500;
	}

	setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);
// Init App
function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}

