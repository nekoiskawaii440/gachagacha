import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import "./App.css"

const items = [
  {name: 'ノーマル1', rarity: "rarity-normal", weight: 40},
  {name: 'ノーマル2', rarity: "rarity-normal", weight: 40},
  {name: 'ノーマル3', rarity: "rarity-normal", weight: 40},
  {name: 'ノーマル4', rarity: "rarity-normal", weight: 40},
  {name: 'ノーマル5', rarity: "rarity-normal", weight: 40},
  {name: 'レア1', rarity: "rarity-rare", weight: 20},
  {name: 'レア2', rarity: "rarity-rare", weight: 20},
  {name: 'スーパーレア', rarity: "rarity-super", weight: 10},
];

const Gacha = () => {
  const resultRef = useRef(null);
  const [result, setResult] = useState<string | undefined>();
  const [rarity, setRarity] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGacha = () => {
    setRarity(undefined);
    setResult(undefined);
    setLoading(true);
    setTimeout(() => {
      const item = getWeightedRandomItem();
      if (!item) return;

      setResult(item.name);
      setRarity(item.rarity);
      setLoading(false);  // 結果が表示されたらローディングを解除
    }, 1000);  // 1秒後に結果を表示
  };

  const handleCapture = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const image = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = image;
      link.download = 'gacha-result.png';
      link.click();
    }
  };

  return (
    <div className="wrap">
      <div className="contents"  ref={resultRef}>
        <h1 className="title">😏ガチャガチャゲーム😮</h1>
        {loading && (
        <div className="loading">⏳ ガチャ中... ⏳</div>
        )}

        {!loading && !result && (
          <button onClick={handleGacha} className="gachabutton">
            ガチャる！
          </button>
        )}

        {!loading && result && (
          <div className="retry-area">
            <button onClick={handleGacha} className="gachabutton">
              もう1回ガチャる！
            </button>
            <button className="dlbutton" onClick={handleCapture}>
              スクショして保存
            </button>
          </div>
        )}

        {result && (
          <>
            <div className={rarity}>
              🎉 結果: {result} 🎉
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const getWeightedRandomItem = () => {
  if (items.length === 0) {
    throw new Error('ガチャのアイテムがありません！');
  }

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  const rand = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const item of items) {
    cumulativeWeight += item.weight;
    if (rand < cumulativeWeight) {
      return item;
    }
  }
  return items[items.length - 1];
};

export default Gacha;