import { useParams } from "react-router-dom";
import Analysis from "../Analysis";
import Summary from "../Summary";
import useAnswers from "../../hooks/useAnswers";

export default function Result() {
  const { id } = useParams()
  
  const {loading, error, answers} = useAnswers(id)
  // console.log(loading, error, answers);
  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <h3>There was an error!</h3>}
      <Summary />
      <Analysis />
    </>
  );
}