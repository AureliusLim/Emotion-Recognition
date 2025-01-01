
 
const Emojiitem = (props) =>{
return(
<div>
    <img src={props.image}></img>
    <p>{props.percentage}%</p>
</div>
);
}

export default Emojiitem;