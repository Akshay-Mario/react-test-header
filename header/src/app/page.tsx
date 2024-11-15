"use client";
import styles from "./page.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const [text, setText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Adjust the height of the textarea as the user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [text]);

  // Listen for window resize to detect when the keyboard opens
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.clientHeight;
      const keyboardVisible = windowHeight < documentHeight;

      if (keyboardVisible) {
        // Set the keyboard height dynamically when it's visible
        setKeyboardHeight(documentHeight - windowHeight);
      } else {
        // Reset keyboard height when keyboard is hidden
        setKeyboardHeight(0);
      }
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className={styles.page}>
      <header className={styles.toolBar}>Tool Bar</header>

      <main className={styles.main} style={{ paddingBottom: `${keyboardHeight}px` }}>
        <div className={styles.textareaContainer}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            placeholder="Type here..."
            style={{
              width: '100%',
              overflow: 'hidden',
              resize: 'none',
              minHeight: '40px',
              padding: '8px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </main>
    </div>
  );
}
