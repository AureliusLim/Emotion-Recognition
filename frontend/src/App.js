import React, { useState } from 'react';
import classes from './resources/App.module.css';
import Imagecontainer from './components/Imagecontainer';
import Emojiitem from './components/Emojiitem';
import happy from './resources/happy.png';
import angry from './resources/angry.png';
import sad from './resources/sad.png';

function App() {
    const [predictions, setPredictions] = useState(null);

    const handlePrediction = (data) => {
        setPredictions(data);
    };
    const getHighestEmotion = () => {
      if (!predictions) return null;

      const emotions = [
          { name: 'Happy', value: predictions.emotion_happy },
          { name: 'Angry', value: predictions.emotion_angry },
          { name: 'Sad', value: predictions.emotion_sad }
      ];

      let highestEmotion = emotions[0].name;
      let highestValue = emotions[0].value;

      for (let i = 1; i < emotions.length; i++) {
          if (emotions[i].value > highestValue) {
              highestEmotion = emotions[i].name;
              highestValue = emotions[i].value;
          }
      }

      return highestEmotion;
    };
    const getEmotionColor = (emotion) => {
      switch (emotion) {
          case 'Happy':
              return 'yellow';
          case 'Angry':
              return 'red';
          case 'Sad':
              return 'blue';
          default:
              return 'black';
      }
  };

  const highestEmotion = getHighestEmotion();
  const emotionColor = getEmotionColor(highestEmotion);

    return (
        <div>
            <div className={classes.topHeader}>
                <b>Emotion Recognition Implementation</b>
                <p>The model uses CNN and is trained from kaggle datasets. The program tries to determine between the most likely emotions from the picture. Model is still far from perfect garnering only an accuracy of approximately 55%.</p>
            </div>
            <p className={classes.introT}>See if the app can determine which of these emotions your image shows!</p>
            <div className={classes.emojicontainer}>
                <Emojiitem image={happy} percentage={predictions ? predictions.emotion_happy : 0} />
                <Emojiitem image={angry} percentage={predictions ? predictions.emotion_angry : 0} />
                <Emojiitem image={sad} percentage={predictions ? predictions.emotion_sad : 0} />
            </div>
            {predictions && (
                <p className={classes.resultText}>
                The model guesses the emotion to be <span style={{ color: emotionColor }}>{highestEmotion}</span>
                </p>
            )}
            <div className={classes.imagecontainer}>
                <Imagecontainer onPrediction={handlePrediction} />
            </div>
        </div>
    );
}

export default App;