import React from "react";
import { useDroppable } from "@dnd-kit/core";

const DroppableContainer = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: "droppable",
  });
  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        background: "black",
        height: "100vh",
        width: "100%",
      }}
    >
     {children}
    </div>
  );
};

export default DroppableContainer;
