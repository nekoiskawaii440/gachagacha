import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ja: {
    translation: {
      title: '😏ガチャガチャゲーム😮',
      gacha: 'ガチャる！',
      retry: 'もう1回ガチャる！',
      save: 'スクショして保存',
      result: '🎉 結果: {{result}} 🎉',
      loading: '⏳ ガチャ中... ⏳',
      menu: 'アイテムリスト編集',
      edit_items: 'ガチャの中身編集',
      edit_prob: '確率編集',
      lang: '言語',
      add_item: 'アイテム追加',
      delete: '削除',
      save_menu: '保存',
      cancel: 'キャンセル',
      max_items: '最大100個まで',
      item_name: 'アイテム名',
      item_prob: '確率',
      rarity_normal: 'ノーマル',
      rarity_rare: 'レア',
      rarity_super: 'スーパーレア',
    },
  },
  en: {
    translation: {
      title: '😏Gacha Game😮',
      gacha: 'Gacha!',
      retry: 'Try Again!',
      save: 'Save Screenshot',
      result: '🎉 Result: {{result}} 🎉',
      loading: '⏳ Rolling... ⏳',
      menu: 'Edit Items',
      edit_items: 'Edit Items',
      edit_prob: 'Edit Probability',
      lang: 'Language',
      add_item: 'Add Item',
      delete: 'Delete',
      save_menu: 'Save',
      cancel: 'Cancel',
      max_items: 'Up to 100 items',
      item_name: 'Item Name',
      item_prob: 'Probability',
      rarity_normal: 'Normal',
      rarity_rare: 'Rare',
      rarity_super: 'Super Rare',
    },
  },
  es: {
    translation: {
      title: '😏Juego de Gacha😮',
      gacha: '¡Gacha!',
      retry: '¡Intentar de nuevo!',
      save: 'Guardar captura',
      result: '🎉 Resultado: {{result}} 🎉',
      loading: '⏳ Girando... ⏳',
      menu: 'Editar ítems',
      edit_items: 'Editar ítems',
      edit_prob: 'Editar probabilidad',
      lang: 'Idioma',
      add_item: 'Agregar ítem',
      delete: 'Eliminar',
      save_menu: 'Guardar',
      cancel: 'Cancelar',
      max_items: 'Hasta 100 ítems',
      item_name: 'Nombre del ítem',
      item_prob: 'Probabilidad',
      rarity_normal: 'Normal',
      rarity_rare: 'Raro',
      rarity_super: 'Super Raro',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja',
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 