export default function SingleCards({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={!!card && card.src} className="front" alt={card.src} />

        {/* <Image
          src={card.src}
          alt={card.src}
          width="100%"
          height="100%"
          className="front"
        /> */}

        {/* <Image
          src="/Images/camel-cover.jpg"
          alt="camel-cover"
          width="100%"
          height="100%"
          onClick={handleClick}
        /> */}

        <img
          src="/Images/camel-cover.jpg"
          alt="camel-cover"
          onClick={handleClick}
          className="back"
        />
      </div>
    </div>
  );
}
