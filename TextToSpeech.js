/* 
Sybil text-to-speech library
Reference: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance

Version 1.0
Authored: Nguyen Dinh
website: http://www.oldpoems.ink
license: MIT
*/

/**
 * Class that abstracts 
 * @param {Object} synth Instance for Speech Synthesis API functionality
 * @param {Object} voices Array, containing OS speech synthesis options
 * @param {String} inputText The text to be uttered
 * @param {Boolean} isUtteranceDone Signals end of Speech Synthesis utterance
 */
class TextToSpeech{
    constructor(){
        this.synth = window.speechSynthesis;
        this.voices = this.synth.getVoices();
        
        //this.utterance = new SpeechSynthesisUtterance();
        this.inputText = "";
        this.inputTextTokens = [];       
        this.isUtteranceDone = false;
    }
    
    /**
     * Registers event listeners for utterances. Links events to DOM, variable updates
     */
    initializeEventListeners(){
        let self = this;   // scope into arrow functions

        // Triggers on boundaries for word/sentence
        this.utterance.addEventListener('boundary', function(event) { 
            // Can add highlight class to tracked word boundaries
        });

        // Triggers beginning of utterance
        this.utterance.addEventListener('start', function(event) { 
            self.isUtteranceDone = false;
            // Can be linked to playback buttons
          });

        // Triggers end of utterance
        this.utterance.addEventListener('end', function(event) { 
            self.isUtteranceDone = true;
            // Can be linked to playback buttons
        });
    }

    /**
     * Initializes and processes class parameters based on inputted text
     * 
     * @param {String} text Input text to be uttered
     */
    processUtterance(text){
        this.inputText = text;     
        this.initializeEventListeners();
    }

    /**
     * Registers input text for new utterance instance, required for speak() to function
     *
     * @param {String} text Input text to be uttered
     */
    read(text){
        this.utterance = new SpeechSynthesisUtterance();    
        this.utterance.text = text
        this.processUtterance(text);
    }

    /**
     * Sets rate of synth voice
     * 
     * @param {number} rate rate of synth voice
     * @return {number} The rate value of synth.voice
     */
    speed(rate = 0.7){
        // hard-coded until adjustment option is created
        this.utterance.rate = rate;
        return this.utterance.rate;
    }

    /**
     * Sets pitch of synth voice
     * 
     * @param {number} pitch pitch of synth voice
     * @returns {number} The pitch value of synth.voice
     */
    pitch(pitch = 0.9){
        // hard-coded until adjustment option is created
        this.utterance.pitch = pitch;
        return this.utterance.pitch;
    }

    /**
     * Is synth utterance paused
     * 
     * @returns {Boolean} Represents status of
     */
    isWaiting(){
        return this.synth.paused;
    }

    /**
     * Is synth utterance completed, based on 'end' event listener
     * 
     * @returns {Boolean} Represents status of synth playback/queue
     */
    isFinished(){
        return this.isUtteranceDone;
    }

    /**
     * Pauses played utterances, style playback buttons
     */
    wait(){
        this.synth.pause();
        // Can add playback button responses here
    }

    /**
     * Resumes paused utterances, style playback buttons
     */
    continue(){
        this.synth.resume();
        // Can add playback button responses here
    }

    /**
     * Repeats already uttered text, requires new instance of Utterance
     */
    repeat(){
        this.listen(this.inputText);
        this.synth.resume();
        this.synth.cancel();            // Bug in queuing utterances, cancel all before starting again
        this.speak();
    }

    /**
     * Displays internal variables
     */
    diagnose(){
        console.log("-----Synth Internal------\n")
        console.log("InpuText: "+this.inputText)
        console.log("InpuTextTokens: "+this.inputTextTokens)
    }

    /**
     * Speaks registered utterance
     */
    speak(){
        if(this.utterance.text){
            this.pitch();
            this.speed();
            this.synth.speak(this.utterance);
        }else{
            // No utterance text
            console.log('No utterance text given.');
            console.log('Please use sybil.listen("Your text here.") before sybil.speak() ')
        }
    }
}
