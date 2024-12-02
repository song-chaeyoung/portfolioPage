import { useEffect, useState } from "react";

type Props = {
  texts: string[];
};

const useTextEffect = ({ texts }: Props) => {
  const [displayText, setDisplayText] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingDelay = 300;
  const deletingDelay = 200;
  const endDelay = 1500;

  useEffect(() => {
    const currentText = texts[textIdx];
    let timer: ReturnType<typeof setTimeout>;

    const typingText = () => {
      setDisplayText(currentText.substring(0, charIdx + 1));
      setCharIdx((prev) => prev + 1);
    };

    const deleteText = () => {
      setDisplayText(currentText.substring(0, charIdx - 1));
      setCharIdx((prev) => prev - 1);
    };

    if (!isDeleting && charIdx < currentText.length) {
      timer = setTimeout(typingText, typingDelay);
    } else if (!isDeleting && charIdx === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), endDelay);
    } else if (isDeleting && charIdx > 0) {
      timer = setTimeout(deleteText, deletingDelay);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTextIdx((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [texts, textIdx, charIdx, isDeleting]);

  return displayText;
};

export default useTextEffect;
