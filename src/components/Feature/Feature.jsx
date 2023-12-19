import { useState, useEffect } from 'react';
// styles
import * as styles from './styles.module.css';
// utilities
import { content } from '../../utilities/content';

const Feature = ({ compileTime, alias, index }) => {
  // set component data, using passed-in props
  const [data, setData] = useState(compileTime.components[index]);
  // on page load...
  useEffect(() => {
    // re-fetch page data, then...
    content(alias).then(runTime => {
      // if run-time data is different than compile-time data...
      if (runTime['last-updated'] !== compileTime['last-updated'])
        // update component data
        setData(runTime.components[index]);
    });
  }, []);
  // render component
  return (
    <section className={styles.Feature}>
      {/* title */}
      {data.title &&
        <h1>{data.title}</h1>}
      {/* text(s) */}
      {data.text && data.text.map((text,i) =>
        <p key={i}>{text}</p>)}
      {/* link(s) */}
      {data.links && data.links.map((link,i) =>
        <a key={i} href={link.uri}>{link.label}</a>)}
    </section>
  );
};

export default Feature;