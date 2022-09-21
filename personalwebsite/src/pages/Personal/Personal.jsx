import React from 'react';
import "./Personal.css";
import image from "../../assets/closeUp.jpg";

const Personal = () => {
  useEffect(() => document.title = "Personal life", []);

  return (
    <div className="centered">
      <h1>Personal Life</h1>
      <img src={image} className="personal-img" alt="my wife and I" />
      <p>I have lived most of my life in the Bentonville, Arkansas area.  I moved down to Denton, Texas, for four years, three years of that were high school, and that is where I first started learning Computer Science.  I also learned AC, DC, and Digital electrical engineering.  After graduating, I spent some time working minimum wage jobs and attending classes at the local community college when I could.  I wasn't satisfied working purely with my hands and barely using my brain.  That is when I decided to enroll and a software engineering boot camp and start my career doing the thing I love solving puzzles and using my brain.
I am happily married to my fantastic wife, Ruthie.  She has an excellent eye for design and has assisted me with the structures of the websites I build.  She is currently a hairdresser and hopes to someday work in design.  We grew up in Northwest Arkansas and met at my Best-man's wedding.  We hit it off from the first time we met and have been together ever since.
I am a Christian.  I was lucky enough to be raised in the church.  It continues to amaze me how timeless the lessons of the bible are, and it is truly remarkable.  The words of the bible and my relationship with God have made me into the man I am today.  I owe everything I am and everything I have to my faith.  I am over blessed.
My hobbies include tinkering with electronics, hiking, gaming, and spending quality time with my wife.  I sincerely enjoy learning new things and using my mind to solve puzzles, problems, and riddles.  I also enjoy clearing my mind by enjoying nature and the calming beauty it brings with it.</p>
    </div>
  )
}

export default Personal