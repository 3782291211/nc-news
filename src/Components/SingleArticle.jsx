import { useParams } from "react-router-dom";

const SingleArticle = () => {
 const param = useParams();
 console.log(param);
};

export default SingleArticle;