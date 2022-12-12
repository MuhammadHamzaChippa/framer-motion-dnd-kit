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
    console.log(event);
  
    const draggingObjectId = active.id;
    const oldInstance = [...Instance];
    const newInstance = oldInstance.map((item) => {
      if (item.label === draggingObjectId) {
        return {
          ...item,
          x: item.x + delta.x,
          y: item.y + delta.y,
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
          <Draggable item={item} key={item.label} />
        ))}
        <div style={{ position: "absolute", bottom: "0px" }}>
          <button onClick={() => setInstance(Instance1)}>Instance 1</button>
          <button onClick={() => setInstance(Instance2)}>Instance 2</button>
          <button onClick={() => setInstance(Instance3)}>Instance 3</button>
        </div>
      </DroppableContainer>
    </DndContext>
  );
}

export default App;
