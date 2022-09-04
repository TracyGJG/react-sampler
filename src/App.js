import { useEffect, useReducer, useState, useContext } from 'react';
import { reducer, reducerActions } from './reducer';

import { primary } from './utils/utils1';
import MarkDown from './components/MarkDown';
import ReleaseNotes from './ReleaseNotes.md';
import ReleaseNotesJson from './ReleaseNotes.json';
import AppContext from './AppContext';

import './App.css';

function numberColour(stateColour) {
  return { color: stateColour ? '#000' : '#00F' };
}

function App() {
  const AppData = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    userInput: '',
    color: false
  });

  const [releaseNotes, setReleaseNotes] = useState({ md: '' });
  const [showMore, setShowMore] = useState(false);

  function releaseNoteHeaderClicked(index) {
    return (event) => event.target.parentElement.classList.toggle('compressed');
  }

  function releaseNoteFooterClicked() {
    setShowMore((_flag) => !_flag);
  }

  useEffect(() => {
    console.debug('Loading MD file');
    fetch(ReleaseNotes)
      .then((res) => res.text())
      .then((md) => {
        setReleaseNotes({ md });
      });
    primary();
  }, []);

  return (
    <main className="App">
      <header>
        <details>
          <summary>This sandbox contains server code sampler.</summary>
          <ol>
            <li>
              Top-left: Use of the useReducer hook (without a switch block).
            </li>
            <li>
              Bottom-left: Direct use of the MarkDown component using Fetch to
              obtain the contents of a markdown (.md) file.
            </li>
            <li>
              Right: Indirect use of the MarDown component using multiple
              fragments of markdown contained in a JSON file.
            </li>
            <li>
              In the browser console the MarDown component presents the content
              of AppContext.
            </li>
          </ol>
        </details>
      </header>
      <main className="Examples">
        <section className="examples">
          <article>
            <input
              type="text"
              value={state.userInput}
              onChange={(e) =>
                dispatch({
                  type: reducerActions.USER_INPUT,
                  payload: e.target.value
                })
              }
            />
          </article>
          <article>
            <p className="txtUserName" style={numberColour(state.color)}>
              {state.userInput}
            </p>
          </article>
          <hr />
          <article>
            <p className="txtNumber" style={numberColour(state.color)}>
              {state.count}
            </p>
          </article>
          <article>
            <button
              onClick={() => dispatch({ type: reducerActions.DECREMENT })}
            >
              -
            </button>
            <button
              onClick={() => dispatch({ type: reducerActions.INCREMENT })}
            >
              +
            </button>
            <button
              onClick={() => dispatch({ type: reducerActions.TOGGLE_COLOR })}
            >
              Color
            </button>
          </article>
          <hr />
          <article>
            <h3>{AppData.message}</h3>
          </article>
          <hr />
          <article className="ReleaseNotes">
            <MarkDown>{releaseNotes.md}</MarkDown>
          </article>
        </section>
        <section className={`ReleaseNotes ${showMore ? 'show-more' : ''}`}>
          {Object.entries(ReleaseNotesJson).map(
            ([releaseVersion, releaseNote], index) => (
              <span className="MarkDown" key={releaseVersion}>
                <article className={index ? 'compressed' : ''}>
                  {index ? (
                    <header onClick={releaseNoteHeaderClicked(index)}>
                      Release: {releaseVersion}
                    </header>
                  ) : (
                    <header>Latest Release: {releaseVersion}</header>
                  )}
                  <MarkDown>{releaseNote.join('\n')}</MarkDown>
                </article>
                {!index && <footer onClick={releaseNoteFooterClicked}></footer>}
              </span>
            )
          )}
        </section>
      </main>
    </main>
  );
}

export default App;
