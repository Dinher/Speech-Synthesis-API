# Web Speech Synthesis API Library
Small custom library to use the Web Speech Synthesis API.

## Description
This library interfaces the two main Speech Synthesis APIs, SpeechSynthesis and SpeechSynthesisUtterance. It also, sets up a few event listeners which can allow for word/sentence highlighting.
You can see the API documention here:
- [Speech Synthesis Web API, MOZ](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [Speech Synthesis Utterance Web API, MOZ](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
## Usage
Create an instance from the TextToSpeech class
```
var Sarah = new TextToSpeech()
```

Give the instance some text
```
var text = "It was a bright cold day in April, and the clocks were striking thirteen.";
Sarah.read(text);
```

Listen to the instance talk!
```
Sarah.speak();
```

Let's hear that again.
```
Sarah.repeat();
```

## Issues
These specific web APIs though [fairly supported](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis#Browser_compatibility), are still experiemental. So the specifications and behaviours may change.

### Replaying utterances (FireFox)
Not fully supported. If you're experimenting with the base SpeechSynthesis object, trying to reuse a previously played utterance will cause unintended behaviours:
- Utterance added to Synth queue but won't play
- Adding second utterance will cause queue to play
- Events will fire excessively

A clear way to avoid this is to clear the current queue `synth.clear()` and speak with a new utterance instance `synth.speak(new SpeechSynthesisUtterance("Hello World"))`

## License
This project is open to the MIT License, enjoy!

Copyright (c) 2019 Nguyen Dinh
