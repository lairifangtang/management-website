// src/utils.js

export const flattenMenus = (menus) => {
    let flat = [];
    menus.forEach(item => {
      flat.push({ key: item.key, name: item.name });
      if (item.children) {
        flat = flat.concat(flattenMenus(item.children));
      }
    });
    return flat;
  };
  