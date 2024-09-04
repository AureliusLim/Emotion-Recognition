import logo from './logo.svg';
import classes from './resources/App.module.css';
import sad from "./resources/sad.png"
import angry from "./resources/angry.png"
import happy from "./resources/happy.png"
import Emojiitem from "./components/Emojiitem.js"
import Imagecontainer from './components/Imagecontainer.js';
function App() {
  return (
    // background section
    // result section
    // upload section
    <div>
      <div className={classes.topHeader}>
        <b>Emotion Recognition Implementation</b>
        <p>The model uses CNN and is trained from kaggle datasets. The program tries to determine between the most likely emotions from the picture. Model is still far from perfect garnering only an accuracy of apprxoimately 55%.</p>
      </div>
      <p className={classes.introT}>See if the app can determine which of these emotions your image shows!</p>
      <div className ={classes.emojicontainer}>
        <Emojiitem image={happy}></Emojiitem>
        <Emojiitem image={angry}></Emojiitem>
        <Emojiitem image={sad}></Emojiitem>
      </div>
      <div className ={classes.imagecontainer}> 
        <Imagecontainer/>
      </div>

    
    </div>

    

  );
}

export default App;
