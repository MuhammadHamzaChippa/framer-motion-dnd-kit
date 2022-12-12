import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion, useAnimation } from "framer-motion";
import "../App.css";
const Draggable = ({ item, className, Instance, setClassName }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.label,
  });
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      top: `${item.y}%`,
      left: `${item.x}%`,
      background: item.background,
      width: item.width,
      padding: "10px",
      position: "absolute",
      transition: { type: "spring", bounce: 0 },
    }).then(() => {
      setClassName("dragging");
    })
  }, [Instance]);
  
  return (
    <motion.div
      key={item.label}
      ref={setNodeRef}
      animate={controls}
      transition={{ type: "spring", bounce: 0 }}
      style={{
        "--top": `${item.y}%`,
        "--left": `${item.x}%`,
        position: "absolute",
        "--translate-x": `${transform?.x ?? 0}px`,
        "--translate-y": `${transform?.y ?? 0}px`,
      }}
      initial={false}
      {...attributes}
      {...listeners}
      className={className}
    >
      {item.label}-{item.x}-{item.y}
    </motion.div>
  );
};

export default Draggable;
