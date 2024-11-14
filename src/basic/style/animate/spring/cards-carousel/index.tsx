import { useState, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { v4 as uuidv4 } from "uuid";
import styles from "./index.module.css";
import Carousel from "react-spring-3d-carousel";

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
}

const Card = ({ image }) => {
  const [shown, setShown] = useState(false);

  const props = useSpring({
    transform: shown ? "scale(1.03)" : "scale(1)",
    boxShadow: shown ? "0 20px 25px rgb(0 0 0 / 25%)" : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  return (
    <animated.div
      className={styles.card}
      style={props}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img src={image} alt='' />
      <h2>Title</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
        dolore magna aliquam erat volutpat.
      </p>
      <div className={styles.btnLine}>
        <Button text='Demo' />
        <Button text='Code' />
      </div>
    </animated.div>
  );
};

function Carroussel(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  return (
    <div style={{ width: props.width, height: props.height, margin: props.margin }}>
      <Carousel
        slides={cards}
        goToSlide={goToSlide || 0}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}

const CardsCarousel = () => {
  let cards = [
    {
      key: uuidv4(),
      content: <Card image='https://updates.theme-fusion.com/wp-content/uploads/2017/12/convertplus_thumbnail.jpg' />,
    },
    {
      key: uuidv4(),
      content: <Card image='https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png' />,
    },
    {
      key: uuidv4(),
      content: (
        <Card image='https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png' />
      ),
    },
    {
      key: uuidv4(),
      content: <Card image='https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png' />,
    },
    {
      key: uuidv4(),
      content: <Card image='https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg' />,
    },
  ];
  return (
    <div className='h-screen flex justify-center items-center'>
      <Carroussel cards={cards} height='500px' width='30%' margin='0 auto' offset={2} showArrows={false} />
    </div>
  );
};

export default CardsCarousel;
