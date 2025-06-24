import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import "./App.css"
import { useTranslation } from 'react-i18next';
import i18n from './assets/i18n';

const defaultItems = [
  {name: 'ノーマル1', rarity: "rarity-normal", weight: 40},
  {name: 'ノーマル2', rarity: "rarity-normal", weight: 40},
  {name: 'ノーマル3', rarity: "rarity-normal", weight: 40},
  {name: 'ノーマル4', rarity: "rarity-normal", weight: 40},
  {name: 'ノーマル5', rarity: "rarity-normal", weight: 40},
  {name: 'レア1', rarity: "rarity-rare", weight: 20},
  {name: 'レア2', rarity: "rarity-rare", weight: 20},
  {name: 'スーパーレア', rarity: "rarity-super", weight: 10},
];

const LANGS = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const Gacha = () => {
  const { t } = useTranslation();
  const resultRef = useRef(null);
  const [result, setResult] = useState<string | undefined>();
  const [rarity, setRarity] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState(defaultItems);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editItems, setEditItems] = useState(items.map(item => ({...item})));

  // メニュー開閉
  const openMenu = () => {
    setEditItems(items.map(item => ({...item})));
    setMenuOpen(true);
  };
  const closeMenu = () => setMenuOpen(false);

  // 言語切り替え
  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // アイテム編集
  const handleItemChange = (idx: number, key: 'name'|'weight'|'rarity', value: string) => {
    setEditItems(prev => prev.map((item, i) => i === idx ? {...item, [key]: key==='weight'?Number(value):value} : item));
  };
  const handleAddItem = () => {
    if (editItems.length < 100) {
      setEditItems([...editItems, {name: '', rarity: 'rarity-normal', weight: 1}]);
    }
  };
  const handleDeleteItem = (idx: number) => {
    setEditItems(editItems.filter((_, i) => i !== idx));
  };
  const handleSaveMenu = () => {
    setItems(editItems);
    setMenuOpen(false);
  };

  const handleGacha = () => {
    setRarity(undefined);
    setResult(undefined);
    setLoading(true);
    setTimeout(() => {
      const item = getWeightedRandomItem(items);
      if (!item) return;
      setResult(item.name);
      setRarity(item.rarity);
      setLoading(false);
    }, 1000);
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
      {/* 左上メニューボタン */}
      <button className="menu-btn" onClick={openMenu}>{t('menu')}</button>
      {/* 右上言語切り替え */}
      <div className="lang-switch">
        {LANGS.map(l => (
          <button key={l.code} onClick={() => handleLangChange(l.code)} disabled={i18n.language===l.code}>{l.label}</button>
        ))}
      </div>
      {/* メニュー（モーダル） */}
      {menuOpen && (
        <div className="modal-bg" onClick={closeMenu}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h2>{t('edit_items')}</h2>
            <div>{t('max_items')}</div>
            <table>
              <thead>
                <tr>
                  <th>{t('item_name')}</th>
                  <th>{t('item_prob')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {editItems.map((item, idx) => (
                  <tr key={idx}>
                    <td><input value={item.name} onChange={e=>handleItemChange(idx, 'name', e.target.value)} /></td>
                    <td><input type="number" min={1} value={item.weight} onChange={e=>handleItemChange(idx, 'weight', e.target.value)} /></td>
                    <td>
                      <select value={item.rarity} onChange={e=>handleItemChange(idx, 'rarity', e.target.value)}>
                        <option value="rarity-normal">{t('rarity_normal')}</option>
                        <option value="rarity-rare">{t('rarity_rare')}</option>
                        <option value="rarity-super">{t('rarity_super')}</option>
                      </select>
                    </td>                    
                    <td><button onClick={()=>handleDeleteItem(idx)}>{t('delete')}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleAddItem} disabled={editItems.length>=100}>{t('add_item')}</button>
            <div style={{marginTop:8}}>
              <button onClick={handleSaveMenu}>{t('save_menu')}</button>
              <button onClick={closeMenu}>{t('cancel')}</button>
            </div>
          </div>
        </div>
      )}
      {/* メイン */}
      <div className="contents" ref={resultRef}>
        <h1 className="title">{t('title')}</h1>
        {loading && (<div className="loading">{t('loading')}</div>)}
        {!loading && !result && (
          <button onClick={handleGacha} className="gachabutton">{t('gacha')}</button>
        )}
        {!loading && result && (
          <div className="retry-area">
            <button onClick={handleGacha} className="gachabutton">{t('retry')}</button>
            <button className="dlbutton" onClick={handleCapture}>{t('save')}</button>
          </div>
        )}
        {result && (<><div className={rarity}>{t('result', { result })}</div></>)}
      </div>
    </div>
  );
};

const getWeightedRandomItem = (items: typeof defaultItems) => {
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
