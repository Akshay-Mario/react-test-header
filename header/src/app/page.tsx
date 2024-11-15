
"use client";
import styles from "./page.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Adjust the height of the textarea as the user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to the scroll height
    }
  }, [text]); // Runs whenever text changes

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <>

      <div className={styles.page}>
        <header className={styles.toolBar}>Tool Bar</header>

        <main className={styles.main}>
          <div>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              style={{
                width: '100%',
                overflow: 'hidden',
                resize: 'none', // Prevent manual resize
                minHeight: '40px',
                padding: '8px',
                border: '1px solid #ccc',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                boxSizing: 'border-box',
                minWidth: '10vw',
              }}
              placeholder="Type here..."
            />
          </div>
        </main>

      </div>
    </>
  );
}
