import { useState } from "react";

type ItemType = string;

type DraggedItem = {
  item: ItemType;
  from: "A" | "B";
} | null;

export default function Draganddrop() {
  const [containerA, setContainerA] = useState<ItemType[]>(["🍎 Apple", "🍌 Banana", "🍇 Grape"]);
  const [containerB, setContainerB] = useState<ItemType[]>(["🍊 Orange", "🍉 Watermelon"]);

  const [draggedItem, setDraggedItem] = useState<DraggedItem>(null);

  const handleDragStart = (item: ItemType, from: "A" | "B") => {
    setDraggedItem({ item, from });
  };

  const handleDrop = (to: "A" | "B") => {
    if (!draggedItem) return;

    if (draggedItem.from === "A" && to === "B") {
      setContainerA(containerA.filter((i) => i !== draggedItem.item));
      setContainerB([...containerB, draggedItem.item]);
    } else if (draggedItem.from === "B" && to === "A") {
      setContainerB(containerB.filter((i) => i !== draggedItem.item));
      setContainerA([...containerA, draggedItem.item]);
    }

    setDraggedItem(null); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="grid grid-cols-2 gap-10 w-full max-w-4xl">
        {/* first container */}
        <div
          className="bg-white rounded-2xl shadow-lg p-6 flex-1 border-2 border-dashed border-blue-400"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("A")}
        >
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Fruit Container -A(count{containerA.length})
          </h2>
          <div className="space-y-2">
            {containerA.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-blue-100 rounded-lg cursor-move hover:bg-blue-200 transition"
                draggable
                onDragStart={() => handleDragStart(item, "A")}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* second container */}
        <div
          className="bg-white rounded-2xl shadow-lg p-6 flex-1 border-2 border-dashed border-green-400"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("B")}
        >
          <h2 className="text-xl font-bold mb-4 text-green-600">
           Fruit Container-B (count:{containerB.length})
          </h2>
          <div className="space-y-2">
            {containerB.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-green-100 rounded-lg cursor-move hover:bg-green-200 transition"
                draggable
                onDragStart={() => handleDragStart(item, "B")}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
