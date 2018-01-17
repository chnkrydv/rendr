const html = `
  <div>
    <input />
    <p>want to see the magic</p>
    <ul>
      <li>something here as usual</li>
      <li>unusually different</li>
    </ul>
    <br />
    <button>click here</button>
  </div>
`;

function render() {
  let el = document.createElement('div');
  let input = createHtmlElement('input', null, {
    type: 'text',
    placeholder: 'Enter your name',
    style: 'background-color: yellow;'
  });

  let button = createHtmlElement('button', 'click here', {
    style: 'background-color: blue; color: white; border: 1px solid black;'
  });
  let div = createHtmlElement('div', [input, button], {
    style: 'background-color: #ddd; height: 100px; width: 200px;'
  });

  el.appendChild(div);
  // el.appendChild(button);

  return el;
}

function htmlToDOM(html) {
  let dom = document.createElement('p');
  let charBuffer = html.split('');
  let lastChar = '';

  let elStart = false;
  let childChar = false;
  let elEnd = false;

  let elName = '';
  let elements = [];

  let iteration = 0;

  charBuffer.forEach( char => {
    let combo = lastChar + char;

    if(combo === '  ') {
      return;
    }
    

    if(lastChar === '<' && combo !== '</') {
      elStart = true;
      childChar = false;
      elEnd = false;      
    }
    if(char === '>' && combo !== '/>') {
      if(elEnd) {
        elStart = false;
        childChar = false;
        elEnd = false;
      } else {
        elStart = false;
        childChar = true;
        elEnd = false; 
      
        console.log(++iteration, 'childChar')
        console.log(elName);
        elements.push(elName.trim());
        elName = '';
      }
    }
    if(lastChar === '<' && combo === '</') {
      elStart = false;
      childChar = false;
      elEnd = true;
    }

    if(char === '>' && combo === '/>') {
      elStart = false;
      childChar = false;
      elEnd = false;   
      
      console.log(++iteration, 'elEnd')

      if(elName.length) {
        console.log(elName);
        elements.push(elName.trim());
        elName = '';   
      }
    }

    if(elStart) {
      char !== '/' ? elName += char : null;
    }
      
    // dom.innerText = 'element name: ' + elName;
    lastChar = char;
  });
      
  elements.forEach( el => {
    let elem = document.createElement(el);
    
    if(el === 'input') elem.value = el;
    else elem.innerText = el;

    dom.appendChild(elem);
  });

  console.log(elements);

  return dom;
}

function createHtmlElement(tagName, child, attributes) {
  let el = document.createElement(tagName);

  if(child instanceof HTMLElement) {
    el.appendChild(child);
  } else if(typeof child === 'string') {
    el.innerText = child;
  } else if(Array.isArray(child)) {
    child.forEach( elem => {
      if(elem instanceof HTMLElement) el.appendChild(elem);
    })
  }

  if(attributes) {
    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
  }

  return el;
}

const Stack = {
  scriptArr: [],
  push: function(script) {
    this.scriptArr.push(script)
  },
  pop: function() {
    let last = this.scriptArr.length - 1;
    eval(this.scriptArr[last]);
    this.scriptArr.pop();
  }
}