import h from 'hyperscript'
import hh from 'hyperscript-helpers'

const { div, button } = hh(h)

// model
const initModel = 0;

// view function
function view(dispatch, model) {
  return div([
    div({ className: 'mv2' },`Count: ${model}`),
      button({ className: 'pv1 ph2 mr2', 
        onclick: () => dispatch(MSGS.ADD) }, '+'),
      button({ className: 'pv1 ph2', 
        onclick: () => dispatch(MSGS.SUBTRACK) }, '-'),
  ]);
}

const MSGS = {
  ADD: 'ADD',
  SUBTRACK: 'SUBTRACK',
}

// update function
function update(msg, model) {
  switch (msg) {
    case MSGS.ADD: 
      return model + 1
      break
    case MSGS.SUBTRACK:
      return model - 1
      break
    default:
     return model
  }
}

// impure code below
function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  node.appendChild(currentView);
  function dispatch(msg) {
    model = update(msg, model);
    const updatedView = view(dispatch, model)
    node.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}

const rootNode = document.getElementById('app');

app(initModel, update, view, rootNode);
//  rootNode.appendChild(view(update('plus', initModel)))
