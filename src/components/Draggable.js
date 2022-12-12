import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import "../App.css";
const Draggable = ({ item, className }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.label,
  });

  return (
    <motion.div
      ref={setNodeRef}
      drag
      animate={{
        top: `${item.y}%`,
        left: `${item.x}%`,
        background: item.background,
        width: item.width,
        padding: "10px",
        position: "absolute",
      }}
      transition={{ type: "spring", bounce: 0 }}
      initial={false}
      style={{
        "--top": `${item.y}%`,
        "--left": `${item.x}%`,
        position: "absolute",
        "--translate-x": `${transform?.x ?? 0}px`,
        "--translate-y": `${transform?.y ?? 0}px`,
      }}
      {...attributes}
      {...listeners}
      className={className}
    >
      {item.label}
    </motion.div>
  );
};

export default Draggable;
