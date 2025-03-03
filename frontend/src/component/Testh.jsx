import { useEffect, useState } from "react";
import axios from "axios";

const Testh = () => {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    axios.get("https://official-joke-api.appspot.com/random_joke")
      .then(res => {
        setJoke(res.data);
      })
  }, []);

  return (
    <div>
      {joke ? <Track joke={joke} /> : <p>Loading...</p>}
    </div>
  );
};

function Track({ joke }) {
  return (
    <>
    <h2>😂 Refresh and enjoy unlimited jokes 😂</h2>
      <h1>Category : {joke.type}</h1>
      <h2>Que : {joke.setup}</h2>
      <h3>Punchline : {joke.punchline}</h3>
    </>
  );
}

export default Testh;
