import React, { useState } from 'react';
import css from './ChatMessage.module.scss';

function ChatMessage(props) {
  const { text, name } = props.message;
  const [hover, setHover] = useState(false);

  return (
    <div className={css.message}>
      <span
        className={css.user}
        onMouseOver={() => setHover(true)}
        // onMouseOver={(e) =>
        //   setHover(e.target.scrollWidth > e.target.offsetWidth)
        // }
        onMouseOut={() => setHover(false)}
      >
        {name}
      </span>
      <span
        className={css.tooltip}
        data-show={hover}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {name}
      </span>
      <p className={css.text}>{text}</p>
    </div>
  );
}

export default ChatMessage;
