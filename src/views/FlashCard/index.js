import React from 'react';
import AnswerCard from '../../components/Cards/AnswerCard';
import QuestionCard from '../../components/Cards/QuestionCard';
import { getQuestions } from '../../helpers/data/questionData';
import AppModal from '../../components/AppModal';
import FlashForm from '../../components/Forms/FlashForm';

export default class FlashCard extends React.Component {
  state = {
    flashCards: [],
    currentCard: {},
    answer: false,
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    if (!this.state.answer) {
      getQuestions().then((response) => {
        this.setState({
          flashCards: response,
          currentCard: response[0],
        });
      });
    } else {
      const { flashCards } = this.state;
      const nextQuestion = flashCards.indexOf(this.state.currentCard) + 1;
      this.setState({
        answer: false,
        currentCard: flashCards[nextQuestion] || flashCards[0],
      });
    }
  }

  showAnswerToQuestion = (e) => {
    e.preventDefault();
    this.setState({
      answer: true,
    });
  }

  render() {
    const { answer, currentCard, flashCards } = this.state;
    const showQuestion = () => <QuestionCard key={currentCard.firebaseKey} card={currentCard} showAnswer={this.showAnswerToQuestion} updateQuestion={this.loadData}/>;
    const showAnswer = () => <AnswerCard key={currentCard.firebaseKey} card={currentCard} showNextQuestion={this.loadData} updateQuestion={this.loadData}/>;
    return (
      <>
      <AppModal title={'Create Question'} buttonLabel={'Create Question'}>
      <FlashForm card={flashCards} onUpdate={this.loadData}/>
      </AppModal>
        <div className="flash-card d-flex flex-wrap justify-content-center">
          {answer === false ? showQuestion() : showAnswer() }
      </div>
      </>
    );
  }
}
