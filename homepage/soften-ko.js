/**
 * softenKo — 의료광고 금지·과장 표현을 문맥에 맞는 자연스러운 한국어 문장으로 순화합니다.
 * (체험용 규칙 기반 엔진: 실제 시그니처 AI는 문장 전체를 새로 씁니다. 최종 책임은 원장님 감수에 있습니다.)
 * 사용: var r = softenKo('이 한약을 드시면 100% 완치됩니다.');  // { text, changed, hits }
 */
(function (root) {
  function hasBatchim(ch) {
    var c = ch.charCodeAt(0);
    if (c < 0xAC00 || c > 0xD7A3) return false;
    return (c - 0xAC00) % 28 !== 0;
  }
  function eunNeun(w) {
    w = String(w).replace(/[\s.,!?'"“”)\]]+$/, '');
    return hasBatchim(w.charAt(w.length - 1)) ? '은' : '는';
  }
  var SUP = '(?:최고|최상|최강|제일|1등|1위|넘버\\s?원|No\\.?\\s?1|NO\\.?\\s?1|유일(?:한)?)';
  var COND = '(?:드시면|드시게\\s?되면|복용하(?:시)?면|복용하시면|먹으면|하시면|받으시면|치료받으면|치료하면)';
  var ENDG = '(?:됩니다|된다|돼요|됩니다만|가능합니다|가능해요|할\\s?수\\s?있습니다)';

  /* [정규식, 치환(문자열|함수), 결과 보장성 표현 여부] — 위에서부터 순서대로 적용 */
  var RULES = [
    [new RegExp('(' + COND + ')\\s*(?:100\\s?%\\s*|백\\s?%\\s*)?완치\\s*' + ENDG, 'g'), '$1 증상 개선에 도움이 될 수 있습니다', true],
    [/(?:100\s?%\s*|백\s?%\s*)?완치\s*(?:시켜\s?드립니다|해\s?드립니다|시킵니다|해드립니다|시켜드립니다|합니다)/g, '증상 완화를 위해 정성껏 진료합니다', true],
    [new RegExp('(?:100\\s?%\\s*|백\\s?%\\s*)?완치\\s*' + ENDG, 'g'), '증상 개선에 도움이 될 수 있습니다', true],
    [/(?:100\s?%\s*|백\s?%\s*)?완치\s*보장\s*(?:합니다|해\s?드립니다|해드립니다)?/g, '증상 개선에 도움이 되도록 최선을 다합니다', true],
    [/완치율\s*\d*\s?%?(?:\s*(?:입니다|달성|보장))?/g, '치료 경과에는 개인차가 있을 수 있습니다', true],

    /* "우리 한의원이 최고입니다" → "우리 한의원은 정성을 다해 진료합니다" */
    [new RegExp('^(.+?)\\s*(?:이|가|은|는)\\s*' + SUP + '\\s*(?:입니다|이에요|예요|이다|다)', 'g'),
      function (m, subj) { return subj + eunNeun(subj) + ' 정성을 다해 진료합니다'; }, false],
    /* "동네 1등 한의원입니다" → "동네에서 정성껏 진료하는 한의원입니다" */
    [new RegExp('(?:(\\S+)\\s+)?' + SUP + '\\s*(한의원|병원|의원|명의|원장|클리닉)\\s*(?:입니다|이에요|예요|이다)', 'g'),
      function (m, pre, noun) {
        if (!pre) return '정성껏 진료하는 ' + noun + '입니다';
        if (/^(우리|저희|본)$/.test(pre)) return pre + '는 정성껏 진료하는 ' + noun + '입니다';
        return pre + '에서 정성껏 진료하는 ' + noun + '입니다';
      }, false],

    /* 효과 100% / 효과 보장 */
    [/(?:치료\s*)?효과\s*(?:가\s*)?(?:100\s?%|백\s?%|보장|확실|즉시|바로)\s*(?:보장|입니다|합니다|해요|예요)?/g, '치료 효과에는 개인차가 있을 수 있습니다', true],
    [/100\s?%\s*(?:치료\s*)?(?:효과|만족|보장)\s*(?:보장|입니다)?/g, '치료 효과에는 개인차가 있을 수 있습니다', true],
    [/(?:효과|결과|치료)(?:를|을)?\s*보장\s*(?:합니다|해\s?드립니다|해드립니다|해요)/g, '치료에 도움이 되도록 최선을 다합니다', true],

    /* 특효 · 무조건 · 반드시 */
    [/특효약?(?:으로|이라서|이라|이니)\s*/g, '', true],
    [/특효(약|가\s?있습니다|입니다)?/g, function (m, t) { return t === '약' ? '도움이 될 수 있는 처방' : '도움이 될 수 있습니다'; }, true],
    [/(?:([^.,!?]+?),\s*)?(?:무조건|반드시|확실히|틀림없이|꼭)\s*(?:낫습니다|낫는다|좋아집니다|효과가\s?있습니다|효과\s?봅니다|치료됩니다)/g,
      function (m, topic) { return topic ? topic + eunNeun(topic) + ' 개인에 따라 호전 정도가 다를 수 있습니다' : '개인에 따라 도움이 될 수 있습니다'; }, true],

    /* 부작용 없음 */
    [/부작용(?:이|은|도)?\s*(?:전혀\s*|하나도\s*)?없(?:습니다|어요|다|는)/g,
      function (m) { return /는$/.test(m) ? '이상 반응을 살피며 안전하게 처방하는' : '이상 반응을 살피며 안전하게 처방합니다'; }, false],

    /* 즉시 효과 */
    [/즉시\s*(?:효과|호전|완화)(?:가\s*)?(?:있습니다|나타납니다|납니다)?/g, '빠른 도움을 드리기 위해 노력합니다', false],

    /* 할인 · 이벤트 (환자 유인 광고 소지) */
    [/(?:\d+\s?%\s*)?(?:할인|이벤트)(?:\s*이벤트|\s*행사)?\s*(?:진행\s?중입니다|진행합니다|중입니다|합니다|해\s?드립니다|해드립니다|중)?/g, '비용은 비급여 진료비 안내표를 참고해 주세요', false],

    /* 100% 잔여 표현 */
    [/100\s?%\s*(안전|만족|정품)/g, function (m, w) { return w === '정품' ? '정품 약재' : w + '을 위해 노력'; }, false]
  ];
  var LEFT = [
    [/완치/g, '증상 개선'], [/100\s?%/g, ''], [/백\s?%/g, ''],
    [/최고|최상|최강|제일|1등|1위|유일한?/g, ''], [/보장/g, ''], [/특효/g, ''],
    [/무조건/g, ''], [/할인|이벤트/g, '']
  ];
  var BAN = /(완치|100\s?%|최고|최상|최강|제일|1등|1위|유일|보장|특효|무조건|부작용\s?없|할인|이벤트)/;

  function splitSentences(t) {
    var out = [], buf = '';
    for (var i = 0; i < t.length; i++) {
      var ch = t.charAt(i);
      buf += ch;
      if (/[.!?]/.test(ch) && !/\d/.test(t.charAt(i + 1) || '') ) {
        // 연속 구두점 흡수
        while (/[.!?]/.test(t.charAt(i + 1) || '')) { buf += t.charAt(++i); }
        out.push(buf); buf = '';
      } else if (ch === '\n') { out.push(buf); buf = ''; }
    }
    if (buf.trim()) out.push(buf);
    return out;
  }

  function softenSentence(s, st) {
    var m = s.match(/^(\s*)([\s\S]*?)([.!?]*)(\s*)$/);
    var core = m[2], punct = m[3], changed = false;
    if (!core.trim()) return s;
    for (var i = 0; i < RULES.length; i++) {
      var r = RULES[i];
      var next = core.replace(r[0], r[1]);
      if (next !== core) { core = next; changed = true; if (r[2]) st.guarantee = true; }
    }
    if (BAN.test(core)) {
      for (var j = 0; j < LEFT.length; j++) core = core.replace(LEFT[j][0], LEFT[j][1]);
      changed = true;
    }
    core = core.replace(/\s{2,}/g, ' ').replace(/\s+([,.])/g, '$1').trim();
    if (changed) {
      if (!punct) punct = /(다|요|니다|세요)$/.test(core) ? '.' : '';
      if (!punct && /(다|요|니다|세요)$/.test(core) === false) punct = '.';
      st.hits++;
    }
    return m[1] + core + punct + m[4];
  }

  function softenKo(text) {
    var src = String(text == null ? '' : text);
    var st = { guarantee: false, hits: 0 };
    var parts = splitSentences(src), out = [];
    parts.forEach(function (p) { var q = softenSentence(p, st).trim(); if (q && out.indexOf(q) < 0) out.push(q); });
    var res = out.join(' ');
    if (st.guarantee && res.indexOf('개인차') < 0) res += ' 치료 결과에는 개인차가 있을 수 있습니다.';
    return { text: res.replace(/\s{2,}/g, ' ').trim(), changed: st.hits > 0, hits: st.hits };
  }
  root.softenKo = softenKo;
  if (typeof module !== 'undefined') module.exports = softenKo;
})(typeof window !== 'undefined' ? window : globalThis);
