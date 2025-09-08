import { animate, motion } from "framer-motion";

// variants

const stairsAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

const reverseIndex = (index) => {
  const totalSteps = 6; // Total number of steps
  return totalSteps - index - 1;
};

const Stairs = () => {
  return (
    <>
      {/* {render 6 motion divs, each representing a step of the stairs.
  Each div will have the some animation defined by the stairsAnimation object.
  The delay for each div is calculated sinamically based. on it`s reversed index,
  creating a staggered effect with decreosing delay for each subsequent step.
  
  
  } */}
      {[...Array(6)].map((_, index) => {
        return (
        <motion.div
          key={index}
          variants={stairsAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.4,
            delay: reverseIndex(index) * 0.1,
            ease: "easeInOut",
          }}
          className="h-full w-full bg-white relative"
        />
        );
      })}
    </>
  );
};

export default Stairs;
