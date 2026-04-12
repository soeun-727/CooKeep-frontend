import { useNavigate } from "react-router-dom";
import tempFoodPhoto from "../../../assets/mycookeep/record/temp_food_photo.svg";
import Button from "../../ui/Button";
import { useCookeepRecordStore } from "../../../stores/useCookeepRecordStore";
import RecordCard from "./RecordCard";
import AddRecordButton from "./AddRecordButton";
import { DailyRecipe } from "../../../api/myRecipe";

interface Props {
  records: DailyRecipe[];
}
export default function RecordEntry({ records }: Props) {
  const navigate = useNavigate();
  const { resetRecord } = useCookeepRecordStore();

  const handleRecordClick = () => {
    resetRecord();
    navigate("/mycookeep/record/select");
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center px-4 pt-[50px] pb-[calc(72px+env(safe-area-inset-bottom))] bg-white rounded-b-[6px]">
        <div className="flex flex-col w-full max-w-[361px] items-start gap-4">
          {records.length === 0 ? (
            <>
              <img
                src={tempFoodPhoto}
                alt="임시 요리 이미지"
                className="h-[160px] w-full object-contain"
              />
              <div className="flex flex-col items-center gap-[6px] w-full">
                <Button size="L" variant="black" onClick={handleRecordClick}>
                  오늘 만든 요리 기록하기
                </Button>
              </div>
            </>
          ) : (
            records.map((record) => (
              <RecordCard key={record.dailyRecipeId} record={record} />
            ))
          )}
        </div>
      </div>
      {records.length > 0 && (
        <div className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] inset-x-0 z-[100] pointer-events-none">
          <div className="relative max-w-[450px] mx-auto w-full">
            <div className="absolute bottom-0 right-[31px] pointer-events-auto">
              <AddRecordButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
