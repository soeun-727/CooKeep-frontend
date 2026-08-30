import AddButton from "@/components/fridge/addItems/components/AddButton";
import FridgeTab from "@/components/fridge/main/FridgeTab";

export default function FridgePage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col">
        <FridgeTab />
        <AddButton />
      </div>
    </div>
  );
}
