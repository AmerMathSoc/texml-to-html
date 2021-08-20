const { article } = require('./helper.js');
const tape = require('tape');

tape('Template: pub-date, history/date', async function(t) {
  t.plan(1);
  const document = article;
  let pubDate = {};
  document.querySelectorAll('section[data-ams-doc="copyright-page"] dt').forEach(node => {
    if (node.innerHTML === 'Publication History') pubDate = node.nextElementSibling;
  });
  t.equal(pubDate.innerHTML.trim(), 'This article was received on <time datetime="1999-09-15">1999-09-15</time>,&nbsp;revised on <time datetime="2000-07-01">2000-07-01</time>, <time datetime="2000-07-02">2000-07-02</time>,  and published on <time datetime="2000-04-13">2000-04-13</time>.', 'pubDate creates content from ../history/date\'s and @iso-8601-date')
});
