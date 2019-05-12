import hihat from './audio/hihat.mp3';
import kick from './audio/kick.mp3';
import snare from './audio/snare.mp3';
import cymbal from './audio/cymbal.mp3';

export const Drums = {
	hihat: new Audio(hihat),
	cymbal: new Audio(cymbal),
	snare: new Audio(snare),
	kick: new Audio(kick),
}
