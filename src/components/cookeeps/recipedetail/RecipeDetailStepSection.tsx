type StepLike = string | { content: string };

interface RecipeDetailStepSectionProps {
  steps: StepLike[];
}

export default function RecipeDetailStepSection({
  steps,
}: RecipeDetailStepSectionProps) {
  const formatDescription = (text: string) => {
    return text.replace(/^\d+[.)\s:-]*/, "").trim();
  };

  return (
    <div className="bg-gray-0 border-gray-10 text-gray-80 rounded-L flex w-full flex-col items-start gap-4 border px-3 py-4">
      <span className="typo-l-strong">조리 방법</span>

      <div className="flex w-full flex-col items-start gap-3">
        {steps.map((step, index) => {
          const stepOrder = index + 1;
          const content = typeof step === "string" ? step : step.content;

          return (
            <div key={stepOrder} className="flex w-full items-start">
              <div className="typo-m-strong text-gray-30 flex h-5 w-5 items-center justify-start">
                <span className="h-full">{stepOrder}</span>
              </div>
              <p className="typo-m flex-1">{formatDescription(content)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
