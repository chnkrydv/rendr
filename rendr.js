const stack = {
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

const html = `
  <div>
    <input type="text" placeholder="input your name here" />
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
  let ul = document.createElement('ul');

  [...Array(4).keys()].forEach( (key) => {
    let li = document.createElement('li');
    li.innerText = 'item: ' + key;
    ul.appendChild(li);
  });

  console.log(html);



  el.appendChild(ul);
  return el;
}

function htmlToDOM(html) {
  let dom;
  let charBuffer = html.split('');
  let lastChar = '';
  let elStart = false;
  let childChar = false;
  let elEnd = false;

  charBuffer.forEach( char => {
    if(char === ' ') return;

    let combo = lastChar + char;

    if(lastChar === '<' && combo !== '</') {
      elStart = true;
    }
    if(char === '>' && combo !== '/>') {
      elStart = false;
    }
    if(lastChar === '<' && combo === '</') {
      elEnd = true;
    }
    if(char === '>' && combo === '/>') {
      elStart = false;
      childChar = false;
      elEnd = false;      
    }
    
    lastChar = char;
  })
  return dom;
}