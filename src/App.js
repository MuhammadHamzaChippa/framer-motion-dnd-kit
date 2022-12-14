import { useState } from "react";
import { Instance1, Instance2, Instance3 } from "./data";
import DroppableContainer from "./components/DroppableContainer";
import Draggable from "./components/Draggable";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

function App() {
  const [Instance, setInstance] = useState(Instance1);
  const [className, setClassName] = useState("");
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const handleDragEnd = (event) => {
    const { active, over, delta } = event;
    if (!over) {
      return;
    }
    const height = over.rect.height;
    const width = over.rect.width;
    const draggingObjectId = active.id;
    const oldInstance = [...Instance];
    const newInstance = oldInstance.map((item) => {
      if (item.label === draggingObjectId) {
        const convertedX = (item.x * width) / 100;
        const convertedY = (item.y * height) / 100;
        const finalX = convertedX + delta.x;
        const finalY = convertedY + delta.y;
        const finalXPercentage = (finalX * 100) / width;
        const finalYPercentage = (finalY * 100) / height;
        return {
          ...item,
          x: finalXPercentage,
          y: finalYPercentage,
        };
      }
      return item;
    });
    setInstance(newInstance);
  };
  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToWindowEdges]}
      onDragEnd={handleDragEnd}
    >
      <DroppableContainer>
        {Instance.map((item) => (
          <Draggable item={item} key={item.label} className={className} Instance={Instance} setClassName={setClassName} />
        ))}
        <div style={{ position: "absolute", bottom: "0px" }}>
          <button
            onClick={() => {
              setClassName("");
              setInstance(Instance1);
            }}
          >
            Instance 1
          </button>
          <button
            onClick={() => {
              setClassName("");
              setInstance(Instance2);
            }}
          >
            Instance 2
          </button>
          <button
            onClick={() => {
              setClassName("");
              setInstance(Instance3);
            }}
          >
            Instance 3
          </button>
        </div>
      </DroppableContainer>
    </DndContext>
  );
}

export default App;
