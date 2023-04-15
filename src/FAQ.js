import React, { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "How do I use the Sample Lab?",
    answer: "Upload your samples by clicking or tapping the sample slots. Press the corresponding keyboard keys (Q, W, E, R, T, Y, U, I) or tap the drum pads to play the samples.",
  },
  {
    question: "What file formats are supported?",
    answer: "Sample Lab supports .wav and .mp3 audio files.",
  },
  {
    question: "Can i export or download the sequence i play on sample lab?",
    answer: "Sample lab currently does not support exporting or downloading the sequence you play. However you can export the audio using the 'Sample' chrome extension from the chrome web store.",
  },
  {
    question: "So...What's the whole point?",
    answer: "Well, that's one cosmic question. I mean, we're all just floating on a blue marble through space, searching for meaning, yearning to unravel the mysteries of existence. The vastness of the universe is both humbling and awe-inspiring, reminding us of the intricate web of connections that bind us all together. In this grand cosmic tapestry, our individual pursuits of purpose and passion are like tiny threads, weaving together to create a rich, vibrant fabric of life. The ebb and flow of human experience, a delicate dance of growth and transformation, reflects the eternal quest to understand the very essence of our being. So, perhaps the true point of anything lies in our collective journey, the unfolding story of humanity, as we strive to uncover the hidden truths that lie within the depths of our shared consciousness.",
  },
  // ... add more FAQs if needed
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
}

function FAQ() {
  return (
    <div className="faq">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

export default FAQ;
