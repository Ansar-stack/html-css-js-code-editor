import './style.css'

const $ = (selector) => document.querySelector(selector);
const $$ = (selectors) => Array.from(document.querySelectorAll(selectors));

// Update line numbers
const updateLines = () => {
  const htmlLines = $('#html').value.split('\n').length;
  const cssLines = $('#css').value.split('\n').length;
  const jsLines = $('#js').value.split('\n').length;

  $('#line1').value = Array.from({ length: htmlLines }, (_, i) => i + 1).join('\n');
  $('#line2').value = Array.from({ length: cssLines }, (_, i) => i + 1).join('\n');
  $('#line3').value = Array.from({ length: jsLines }, (_, i) => i + 1).join('\n');
}


const runCode = () => {
  const html = $('#html').value;
  const css = $('#css').value;
  const js = $('#js').value;
  const frame = $('iframe');
  frame.contentDocument.body.innerHTML = `${html} <style>${css}</style>`;
  frame.contentWindow.eval(js);
}


const handleInputs = () => {
  const editors = [$('#html'), $('#css'), $('#js')];
  editors.forEach(editor => {
    editor.addEventListener('input', () => {
      updateLines();
      runCode();
    });
  });
}


const handleScroll = () => {
  const html = $('#html');
  const css = $('#css');
  const js = $('#js');

  html.addEventListener('scroll', () => { $('#line1').scrollTop = html.scrollTop; });
  css.addEventListener('scroll', () => { $('#line2').scrollTop = css.scrollTop; });
  js.addEventListener('scroll', () => { $('#line3').scrollTop = js.scrollTop; });
}


document.addEventListener('DOMContentLoaded', () => {
  updateLines(); 
  handleInputs();
  handleScroll();
  runCode(); 
});
