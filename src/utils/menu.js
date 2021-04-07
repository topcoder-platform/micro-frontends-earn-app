import _ from "lodash";

export class MenuSelection {
  constructor(menu, selectedMenuItem, onSelectMenuItem) {
    this.menu = _.cloneDeep(menu);
    this.onSelectMenuItem = onSelectMenuItem;
    this.selectedMenuItem = selectedMenuItem;
    this.travel(this.menu);
  }

  travel(root) {
    Object.keys(root).forEach((key) => {
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

  select(name) {
    let found = false;

    const selectInternal = (root) => {
      Object.keys(_.omit(root, "expanded", "active", "branch", "leaf")).forEach(
        (key) => {
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
        }
      );
    };

    selectInternal(this.menu);
  }

  isLeaf(name) {
    let leaf = false;

    const isLeafInternal = (root) => {
      Object.keys(_.omit(root, "expanded", "active", "branch", "leaf")).forEach(
        (key) => {
          if (key !== name) {
            if (root[key].branch) {
              isLeafInternal(root[key]);
            }
          } else if (root[key].leaf) {
            leaf = true;
          }
        }
      );
    };

    isLeafInternal(this.menu);

    return leaf;
  }

  isSelected(name) {
    return name === this.selectedMenuItem;
  }

  isExpanded(name) {
    let expanded = false;

    const isExpandedInternal = (root) => {
      Object.keys(_.omit(root, "expanded", "active", "branch", "leaf")).forEach(
        (key) => {
          if (key !== name) {
            if (root[key].branch) {
              isExpandedInternal(root[key]);
            }
          } else if (root[key].branch) {
            expanded = root[key].expanded;
          }
        }
      );
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
      Object.keys(_.omit(root, "expanded", "active", "branch", "leaf")).forEach(
        (key) => {
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
        }
      );
    };

    isActiveInternal(this.menu);

    return path.indexOf(name) !== -1;
  }

  emitSelectionEvent() {
    this.onSelectMenuItem(this.selectedMenuItem);
  }
}

export function getMenuItemUrlPath(MENU, item) {
  const root = MENU;
  let path;

  Object.keys(root).forEach((key) => {
    if (_.isObject(root[key])) {
      path = getMenuItemUrlPath(root[key], item);
    } else if (key === item) {
      path = root[key];
    }
  });

  return path;
}
