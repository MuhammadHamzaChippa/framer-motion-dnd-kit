import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import "../App.css";
const Draggable = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.label,
  });
  return (
    <motion.div
      ref={setNodeRef}
      animate={{
        top: `${item.y}px`,
        left: `${item.x}px`,
        background: item.background,
        width: item.width,
        padding: "10px",
        position: "absolute",
      }}
      transition={{ type: "spring", bounce: 0 }}
      initial={false}
      style={{
        position: "absolute",
        "--translate-x": `${transform?.x ?? 0}px`,
        "--translate-y": `${transform?.y ?? 0}px`,
      }}
      className="dragging"
      {...attributes}
      {...listeners}
    >
      {item.label}
    </motion.div>
  );
};

export default Draggable;
