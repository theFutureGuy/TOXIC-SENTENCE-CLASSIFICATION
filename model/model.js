//tensorflow JS
import * as DICTIONARY from './dictionary';
const MODEL_JSON_URL = './model/model.json';

const ENCODING_LENGTH = 21;

var model = undefined;


window.loadAndPredict = async function loadAndPredict(inputText) {
    if (model === undefined) {
      model = await tf.loadLayersModel(MODEL_JSON_URL);
    }
    
  

    let lowercaseSentenceArray = inputText.toLowerCase().replace(/[^\w\s]/g, ' ').split(' ');
      
    lowercaseSentenceArray = lowercaseSentenceArray.slice(0, 20);
      
    
    let results = model.predict(tokenize(lowercaseSentenceArray));
      
    let dataArray = results.dataSync();

    let toxicityLevel = dataArray[1] * 100;

    console.log('Toxiticy level: ' + toxicityLevel);

    return toxicityLevel;
}

//tokenize
function tokenize(wordArray) {
  let returnArray = [DICTIONARY.START];

  for (var i = 0; i < wordArray.length; i++) {
    let encoding = DICTIONARY.LOOKUP[wordArray[i]];
    returnArray.push(encoding === undefined ? DICTIONARY.UNKNOWN : encoding);
  }

  while (returnArray.length < ENCODING_LENGTH) {
    returnArray.push(DICTIONARY.PAD);
  }
  

  console.log([returnArray]);
  
  // Convert to a TensorFlow Tensor 2D and return that.
  return tf.tensor2d([returnArray]);
}