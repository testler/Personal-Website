import React, { useState } from 'react'
import "./Skills.css";
import langs from "../../assets/Languages/index";

const Skills = () => {
  useEffect(() => document.title = "Skills", []);

  const [langList, setLangList] = useState(langs);

  return (
    <div>
      <h3 className="opening-line">I have learned many language this is a list of the ones I am most confident in</h3>
      <ul className ="skill-name-list">
      {langList.langNames.map((name, index)=>{
        return (
        <li className="skill-name" key={index}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </li>)
      })}
      </ul>
      <ul className="skill-list">
      {langList.langs.map((lang, index)=>{
        return (
        <li key={index}>
          <img  className="skill-img" src={lang}/>
        </li>)
      })}
      </ul>
    </div>
  )
}

export default Skills