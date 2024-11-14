/** @jsx createElement */

function createElement(tag, props, ...children) {
    return {
        tag,
        props: props || {},
        children: children.flat(),
    };
}

class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.update();
    }

    update() {
        const newVNode = this.render();
        this.base = updateElement(this.base, newVNode, this._vnode);
        this._vnode = newVNode;
    }
}

function updateElement(dom, newVNode, oldVNode) {
    const activeElement = document.activeElement;
    const shouldRestoreFocus = dom && dom.contains(activeElement);

    if (typeof newVNode === "string" || typeof newVNode === "number") {
        if (!dom || dom.nodeType !== Node.TEXT_NODE) {
            const newDom = document.createTextNode(newVNode);
            if (dom && dom.parentNode) {
                dom.parentNode.replaceChild(newDom, dom);
            }
            if (shouldRestoreFocus && activeElement) activeElement.focus();
            return newDom;
        } else if (dom.textContent !== newVNode) {
            dom.textContent = newVNode;
        }
        if (shouldRestoreFocus && activeElement) activeElement.focus();
        return dom;
    }

    if (!newVNode) {
        return dom;
    }

    if (!oldVNode || !dom || newVNode.tag !== oldVNode?.tag) {
        const newDom = document.createElement(newVNode.tag);
        if (dom) {
            while (dom.firstChild) {
                newDom.appendChild(dom.firstChild);
            }
            if (dom.parentNode) {
                dom.parentNode.replaceChild(newDom, dom);
            }
        }
        dom = newDom;
    }

    updateProps(dom, newVNode.props, oldVNode?.props);

    const newChildren = newVNode.children || [];
    const oldChildren = oldVNode?.children || [];

    const keyedOldChildren = {};
    oldChildren.forEach((child, index) => {
        if (child && child.props && child.props.key) {
            keyedOldChildren[child.props.key] = {
                domNode: dom.childNodes[index],
                vnode: child,
            };
        }
    });

    const newChildNodes = [];

    newChildren.forEach((newChildVNode, index) => {
        let newChildDom;
        if (newChildVNode && newChildVNode.props && newChildVNode.props.key) {
            const oldChild = keyedOldChildren[newChildVNode.props.key];
            if (oldChild) {
                newChildDom = updateElement(
                    oldChild.domNode,
                    newChildVNode,
                    oldChild.vnode
                );
                delete keyedOldChildren[newChildVNode.props.key];
            } else {
                newChildDom = updateElement(null, newChildVNode);
            }
        } else {
            const oldChildVNode = oldChildren[index];
            const childDom = dom.childNodes[index];
            if (!childDom) {
                newChildDom = updateElement(null, newChildVNode);
            } else {
                newChildDom = updateElement(
                    childDom,
                    newChildVNode,
                    oldChildVNode
                );
            }
        }
        newChildNodes.push(newChildDom);
    });

    while (dom.firstChild) {
        dom.removeChild(dom.firstChild);
    }

    newChildNodes.forEach((childDom) => {
        if (childDom) {
            dom.appendChild(childDom);
        }
    });

    if (
        shouldRestoreFocus &&
        activeElement &&
        document.contains(activeElement)
    ) {
        activeElement.focus();
    }

    return dom;
}

function updateProps(dom, newProps, oldProps = {}) {
    for (let name in oldProps) {
        if (!(name in newProps)) {
            if (name.startsWith("on")) {
                const eventName = name.substring(2).toLowerCase();
                dom.removeEventListener(eventName, oldProps[name]);
            } else {
                dom.removeAttribute(name);
            }
        }
    }

    for (let name in newProps) {
        if (name.startsWith("on")) {
            const eventName = name.substring(2).toLowerCase();
            if (oldProps[name] !== newProps[name]) {
                if (oldProps[name]) {
                    dom.removeEventListener(eventName, oldProps[name]);
                }
                dom.addEventListener(eventName, newProps[name]);
            }
        } else if (name === "className") {
            dom.setAttribute("class", newProps[name]);
        } else if (name === "value" || name === "checked") {
            if (dom[name] !== newProps[name]) {
                dom[name] = newProps[name];
            }
        } else {
            dom.setAttribute(name, newProps[name]);
        }
    }
}

function render(component, container) {
    container.innerHTML = "";
    component.base = updateElement(null, component.render());
    container.appendChild(component.base);
    component._vnode = component.render();
}
