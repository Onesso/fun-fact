import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  {
    /* below is a state variable using a useState hook */
  }
  {
    /* the parts of using state variable include */
  }
  {
    /* 1. Define state variable */
  }

  const [ShowForm, setShowForm] = useState(false);
  const [facts, setfacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  //the empty array in the function in the useEffect will ensure that the function only runs once, as soon the first component renders
  useEffect(
    function () {
      {
        /*supabase take time to load the data so we must wait and wait is only used in an async function therefore the async is created inside the function of the useState */
      }
      async function getFacts() {
        setIsLoading(true);

        let quary = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          quary = quary.eq("category", currentCategory);

        const { data: facts, error } = await quary
          .order("created_at", { ascending: false }) //sorting the data based on the number of high votes
          .limit(1000); //limiting the number of votes that can be uploaded

        if (!error) setfacts(facts);
        else alert("There is an error fetching the data");
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  ); //currentCategory is added in the dependancy since it change; the dependancy array is here so that is can enable react to load once, therefore the function will be loading whenever the CurrentCategory changes

  return (
    <>
      {/* <Counter />*/}
      {/*ternary operator; where we are condtional rendering the component. */}

      {/* Use state variable */}
      <Header ShowForm={ShowForm} setShowForm={setShowForm} />

      {ShowForm ? (
        <NewFactForm setfacts={setfacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilters setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setfacts={setfacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="loaderMessage"> Loading... </p>;
}

function Header({ ShowForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="today_i_learned_logo" />
        <h1 className="h1">Today I learned</h1>
      </div>
      {/*usestate; when ever we click the button the function changes the setShowForm to the opposite 
    also need to learn how to rerender the component.
  */}
      <button
        className="btn btn-large btn-open"
        //update state variable
        onClick={() => setShowForm((show) => !show)}
      >
        {ShowForm ? "Close" : "share a fact"}
      </button>
    </header>
  );
}

function isValidHttpUrl(string) {
  try {
    const newUrl = new URL(string);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}
//only async function can await promises and make the function stop
function NewFactForm({ setfacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUpLoading, setIsUpLoading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    //1.preventing react from reloading the page
    e.preventDefault();

    //2.Checking if the data is valid
    if (text && isValidHttpUrl(source) && category && text.length <= 250) {
      //3.Create a new fact object and upload to supabase

      setIsUpLoading(true); //it is set to true so that isUpLoading 'becomes true' which is passed through the diasble variable
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select(); //select() is added on the query so that we can get the data back(supabase will the data from the server to back to the  client) and upload the state
      setIsUpLoading(false); //it is set to false meaning that the data is already sent to and sent back again to placed in the factlist; it will therefore enable adding of new data
      //4.Add the new fact object to the Ul:add the fact to state
      if (!error) setfacts((facts) => [newFact[0], ...facts]); //supabase returns an arrary of one object hence the selection of the newFact[0]

      //5.Reset input fields
      setText("");
      setCategory("");
      setSource("");
      //6.Close the form
      setShowForm(null);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      {" "}
      {/*we are not calling the funtion since we want react to call it */}
      <input
        type="text"
        placeholder="Share a fact with the world"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUpLoading}
      />
      <span> {250 - textLength} </span>
      <input
        type="text"
        placeholder="https://example.com"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUpLoading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUpLoading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cate) => (
          <option key={cate.name} value={cate.name}>
            {cate.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUpLoading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilters({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li>
          <button
            className="btn btn-all-category"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cate) => (
          <li key={cate.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: cate.color }}
              onClick={() => setCurrentCategory(cate.name)}
            >
              {cate.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Counter() {
  {
    /*usestate returns an array which is the initial set value and a function
  therefore to use the usestate function we must destructure it. it is also imported since it is a react build in function 
  */
  }

  const [counter, setCounter] = useState(0);

  return (
    <div>
      <span style={{ fontSize: "40px" }}>{counter}</span>
      <button
        className="btn btn-large"
        onClick={() => setCounter((currentCount) => currentCount + 1)}
      >
        +1
      </button>
    </div>
  );
}

//this is a component of facts; where the facts are listed
function FactList({ facts, setfacts }) {
  //this data in this component is needed to be passed to another container; the Fact container theirfore props is needed.

  if (facts.length === 0)
    return (
      <p className="loaderMessage">
        No facts for this category yet!! Create and be the first one 🥇
      </p>
    );

  return (
    <section className="section">
      <ul className="fact-list">
        {facts.map((data) => (
          //in this component(father)(FactList) we are passing in other components child(Fact)
          <Fact key={data.id} data={data} setfacts={setfacts} />
        ))}
      </ul>
      <p>
        There are {facts.length} facts in the database. Contribute by adding
        more
      </p>
    </section>
  );
}

//this is a fact component
function Fact({ data, setfacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDispute =
    data.votesInteresting + data.votesMindblowing < data.votesFalse;

  //the function below handles the voting, it makes the update to the supabase then supabase returns data only of the specified id in an array form.

  // ====this function is generalised to suet all three of the voting=====
  //a string is passed to the function then the same string is used in the update section when quarrying supabase
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: data[columnName] + 1 })
      .eq("id", data.id) //update is only done to this object
      .select();
    setIsUpdating(false);
    if (!error)
      setfacts(
        (facts) => facts.map((f) => (f.id === data.id ? updatedFact[0] : f)) //the fact thst was voted on is the only one the would be update the rest nothing happens to them
      );
  }
  return (
    //this is not html this is jxs
    <li className="facts">
      <p>
        {isDispute ? <span className="disputed">[🚩RUMOURS]</span> : null}
        {data.text}
        <a href={data.source} translate="_blank" class="source">
          Source
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find(
            (catName) => catName.name === data.category
          ).color,
        }} //the style is an object hence the two carly braces
      >
        {data.category}
      </span>
      <div className="vote-button">
        {/*In generalizing the vote function we are not to call the function but rather to define the function */}
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {data.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {data.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {data.votesFalse}
        </button>
      </div>
    </li>
  );
}
export default App;
