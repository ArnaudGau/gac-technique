import { useState } from "react";

type Question = {
  id: string;
  label: string;
  content: string;
  relatedQuestionId?: string;
};

type ListProps = {
  questions: Question[]
};

const questions: Question[] = [
  {
    id: "S1-6_01",
    label: "Employés globaux",
    content: "table",
  },
  {
    id: "S1-6_02",
    label: "Nombre d'employés (fin de période)",
    content: "number",
    relatedQuestionId: "S1-6_01",
  },
];

const [employeCount, setEmployeCount] = useState('')

export function QuestionList() {
    
  return () => (
    <main>
         <ul><List questions={questions}/></ul>
         <CountEmploye />
    </main>

  );
}

function CountEmploye() {
    return() =>
        <label htmlFor="employee-count">Nombre d’employés </label>
        <input type=number value={employeCount} onChange={(event) => setEmployeCount(event.target.value)}></input>
        <p>Valeur Actuelle {employeCount}</p>
}

function List(props: ListProps) {
    const questions = props.questions
    return () =>
        questions.map((question) => (
            <li key={question.id}>{question.label}</li>
        ))
}