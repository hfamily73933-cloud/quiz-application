export default function QuestionCard() {

  const question = {
    question: "What is React?",
    options: [
      "Library",
      "Framework",
      "Language",
      "Database"
    ]
  };

  return (

    <div className="card">

      <h3>{question.question}</h3>

      {question.options.map((opt, i) => (

        <button key={i}>{opt}</button>

      ))}

    </div>

  );

}