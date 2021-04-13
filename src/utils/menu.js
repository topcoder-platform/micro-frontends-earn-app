import _ from "lodash";

export class MenuSelection {
  constructor(menu, selectedMenuItem, onSelectMenuItem) {
    this.menu = _.cloneDeep(menu);
    this.onSelectMenuItem = onSelectMenuItem;
    this.selectedMenuItem = selectedMenuItem;
    this.travel(this.menu);
  }

  travel(root) {
    this.getMenuItems(root).forEach((key) => {
      if (_.isObject(root[key])) {
        root[key].expanded = false;
        root[key].branch = true;
        this.travel(root[key]);
      } else {
        root[key] = {
          name: key,
          active: this.selectedMenuItem === key,
          leaf: true,
        };
      }
    });
  }

  getMenuItems(menu) {
    return Object.keys(_.omit(menu, "expanded", "active", "branch", "leaf"));
  }

  select(name) {
    let found = false;

    const selectInternal = (root) => {
      this.getMenuItems(root).forEach((key) => {
        if (found) {
          return;
        }

        if (key !== name) {
          if (root[key].branch) {
            selectInternal(root[key]);
          } else {
            root[key].active = false;
          }
        } else {
          if (root[key].leaf) {
            root[key].active = true;
            this.selectedMenuItem = name;
          } else {
            root[key].expanded = !root[key].expanded;
          }

          found = true;
          this.emitSelectionEvent();
        }
      });
    };

    selectInternal(this.menu);
  }

  isLeaf(name) {
    let leaf = false;

    const isLeafInternal = (root) => {
      this.getMenuItems(root).forEach((key) => {
        if (key !== name) {
          if (root[key].branch) {
            isLeafInternal(root[key]);
          }
        } else if (root[key].leaf) {
          leaf = true;
        }
      });
    };

    isLeafInternal(this.menu);

    return leaf;
  }

  isSelected(name) {
    return name === this.selectedMenuItem;
  }

  isExpanded(name) {
    let expanded;

    const isExpandedInternal = (root) => {
      this.getMenuItems(root).forEach((key) => {
        if (key !== name) {
          if (root[key].branch) {
            isExpandedInternal(root[key]);
          }
        } else if (root[key].branch) {
          expanded = root[key].expanded;
        }
      });
    };

    isExpandedInternal(this.menu);

    return expanded;
  }

  isActive(name) {
    let stack = {
      arr: [],
      push(name) {
        this.arr.push(name);
      },
      pop() {
        this.arr.splice(this.arr.length - 1, 1);
      },
    };
    let path;

    if (!this.selectedMenuItem) {
      return false;
    }

    const isActiveInternal = (root) => {
      this.getMenuItems(root).forEach((key) => {
        if (key !== this.selectedMenuItem) {
          if (root[key].branch) {
            stack.push(key);
            isActiveInternal(root[key]);
            stack.pop(key);
          }
        } else {
          stack.push(key);
          path = [...stack.arr];
        }
      });
    };

    isActiveInternal(this.menu);

    return path.indexOf(name) !== -1;
  }

  emitSelectionEvent() {
    this.onSelectMenuItem(this.selectedMenuItem);
  }
}

export function getNameByPath(MENU, path) {
  const root = MENU;
  let name;

  Object.keys(root).forEach((key) => {
    if (_.isObject(root[key])) {
      name = getNameByPath(root[key], path);
    } else if (root[key] === path) {
      name = key;
    }
  });

  return name;
}
