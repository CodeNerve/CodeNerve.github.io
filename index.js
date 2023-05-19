const Typer = {
  text: '',
  accessCountimer: null,
  index: 0,
  speed: 2,
  file: '',
  accessCount: 0,
  deniedCount: 0,

  init: function () {
    this.accessCountimer = setInterval(() => {
      this.updLstChr();
    }, 500);
    fetch(this.file)
      .then(response => response.text())
      .then(data => {
        this.text = data.slice(0, -1);
      });
  },

  content: function () {
    return $('#console').html();
  },

  write: function (str) {
    $('#console').append(str);
    return false;
  },

  addText: function (key) {
    if (key.keyCode === 18) {
      this.accessCount++;
      if (this.accessCount >= 3) {
        this.makeAccess();
      }
    } else if (key.keyCode === 20) {
      this.deniedCount++;
      if (this.deniedCount >= 3) {
        this.makeDenied();
      }
    } else if (key.keyCode === 27) {
      this.hidepop();
    } else if (this.text) {
      const cont = this.content();
      if (cont.endsWith('|')) {
        $('#console').html(cont.slice(0, -1));
      }
      if (key.keyCode !== 8) {
        this.index += this.speed;
      } else {
        if (this.index > 0) {
          this.index -= this.speed;
        }
      }
      const text = this.text.substring(0, this.index);
      const rtn = /\n/g;
      $('#console').html(text.replace(rtn, '<br/>'));
      window.scrollBy(0, 50);
    }

    if (key.preventDefault && key.keyCode !== 122) {
      key.preventDefault();
    }

    if (key.keyCode !== 122) {
      // prevent default behavior for other keys
      key.returnValue = false;
    }
  },

  updLstChr: function () {
    const cont = this.content();
    if (cont.endsWith('|')) {
      $('#console').html(cont.slice(0, -1));
    } else {
      this.write('|');
    }
  },

  makeAccess: function () {
    // Implement the makeAccess function as needed
  },

  makeDenied: function () {
    // Implement the makeDenied function as needed
  },

  hidepop: function () {
    // Implement the hidepop function as needed
  }
};

function replaceUrls(text) {
  const http = text.indexOf('http://');
  const space = text.indexOf('.me ', http);

  if (space !== -1) {
    const url = text.slice(http, space - 1);
    return text.replace(url, `<a href="${url}">${url}</a>`);
  } else {
    return text;
  }
}

Typer.speed = 3;
Typer.file = 'CodeNerve.txt';
Typer.init();

const timer = setInterval(t, 30);
function t() {
  Typer.addText({ keyCode: 123748 });

if (Typer.index > Typer.text.length) {
clearInterval(timer);
}
}

document.addEventListener('keydown', function (e) {
if (e.keyCode === 27) {
// fast forward text
Typer.index = Typer.text.length;
}
});