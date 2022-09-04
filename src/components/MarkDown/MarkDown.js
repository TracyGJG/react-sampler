import { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import AppContext from '../../AppContext';

function MarkDown(props) {
  const AppData = useContext(AppContext);
  console.log(`MarkDown::AppData: ${AppData.message}`);

  return props.text.length ? (
    <ReactMarkdown remarkPlugins={[remarkGfm]}># Hello, *world*!</ReactMarkdown>
  ) : (
    <ReactMarkdown children={props.children} remarkPlugins={[remarkGfm]} />
  );
}

export default MarkDown;

MarkDown.propTypes = {
  text: PropTypes.string
};

MarkDown.defaultProps = {
  text: ''
};
