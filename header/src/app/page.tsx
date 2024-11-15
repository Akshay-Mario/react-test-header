
"use client"; 
import styles from "./page.module.css";
import Basic from "./components/basic";
import { useEffect, useRef, useState } from "react";

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

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.toolBar}>Tool Bar</header>
        <div className={styles.textareaContainer}>
          <textarea className={styles.textArea} id="autoGrowTextarea" placeholder="Type here..."></textarea>
          {/* <div className="mirrorDiv"></div> */}
        </div>

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
        minWidth: '90vw',
      }}
      placeholder="Type here..."
    />
    </div>
      </main>

    </div>
  );
}
