import { CartState } from "../context/Context";
import SingleProducts from "./SingleProducts";
import "./styles.css";

const Home = () => {
  const {
    state: { products },
  } = CartState();

  return (
    <div className="home">
      <div className="productContainer">
        {products.map((item) => (
          <SingleProducts item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
