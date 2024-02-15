import { useState } from "react";
import { Roulette } from "./components/roulette";
import { SelectorType } from "./types/type";
import { SelectorForm } from "./components/SelectorForm";

const initialSelectors: SelectorType[] = [
  { name: "1", color: "royalblue" },
  { name: "2", color: "salmon" },
  { name: "3", color: "palegreen" },
  { name: "4", color: "wheat" },
];

const colors = [
  "royalblue",
  "salmon",
  "palegreen",
  "wheat",
  "gold",
  "lightgoldenrodyellow",
  "lightskyblue",
  "lightpink",
  "lightgrey",
  "lightblue",
];


export const Home = () => {
  const [selectors, setSelectors] = useState<SelectorType[]>(initialSelectors);
  const [detailSettingOpen, setDetailSettingOpen] = useState<boolean>(false);
  const canAddSelector = selectors.length < colors.length;

  const addSelector = () => {
    if (!canAddSelector) return;

    setSelectors([
      ...selectors,
      { name: `${selectors.length + 1}`, color: colors[selectors.length] },
    ]);
  };

  const updateSelector = (index: number, updatedSelector: SelectorType) => {
    const newSelectors = [...selectors];
    newSelectors[index] = updatedSelector;
    setSelectors(newSelectors);
  };

  const deleteSelector = (index: number) => {
    const newSelectors = [...selectors];
    newSelectors.splice(index, 1);
    setSelectors(newSelectors);
  };

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-8">ルーレットOnline</h1>
        <Roulette selectors={selectors} />
        {detailSettingOpen ? (
          <button
          onClick={() => setDetailSettingOpen(!detailSettingOpen)}
          className="mt-8 bg-red-500 hover:bg-red-700 text-white rounded-md p-2"
        >
          閉じる
        </button>
        ) : (
          <button
            onClick={() => setDetailSettingOpen(!detailSettingOpen)}
            className="mt-8 bg-blue-500  hover:bg-blue-700 text-white rounded-md p-2"
          >
            詳細設定
          </button>
        )}
        {detailSettingOpen && (
          <div
            className="space-y-4 mt-8 flex flex-col items-center max-h-72 overflow-y-auto"
            style={{
                /*IE(Internet Explorer)・Microsoft Edgeへの対応*/
                msOverflowStyle: "none",
                /*Firefoxへの対応*/
                scrollbarWidth: "none",
            }}
          >
          {selectors.map((selector, index) => (
            <SelectorForm
              key={index}
              selector={selector}
              onChange={(updatedSelector) => updateSelector(index, updatedSelector)}
              onDelete={() => deleteSelector(index)}
            />
          ))}
          <button
            onClick={addSelector}
            disabled={!canAddSelector}
            className="bg-green-500 hover:bg-green-700 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {canAddSelector ? "追加" : "これ以上追加できません"}
          </button>
        </div>
        )}
      </div>
    </div>
  );
};
