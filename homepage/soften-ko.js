/**
 * softenKo (v2 · 의료법 제56조 순화 + 고객 호감형 공감·신뢰 문장 자동 다듬기 엔진)
 * - 금지어/과장 표현이 있으면 의료법 제56조 기준에 맞게 안전하게 순화합니다.
 * - 금지어 경고가 전혀 없는 평범하거나 딱딱한 병원 중심 문장이라도,
 *   환자가 읽었을 때 안심하고 호감을 느끼는 따뜻한 환자 중심 표현으로 자동 다듬어 줍니다.
 */
(function (root) {
  function hasBatchim(ch) {
    if (!ch) return false;
    var c = ch.charCodeAt(0);
    if (c < 0xAC00 || c > 0xD7A3) return false;
    return (c - 0xAC00) % 28 !== 0;
  }
  function eunNeun(w) {
    w = String(w || '').replace(/[\s.,!?'"“”)\]]+$/, '');
    return hasBatchim(w.charAt(w.length - 1)) ? '은' : '는';
  }

  var SUP = '(?:최고|최상|최강|제일|1등|1위|넘버\\s?원|No\\.?\\s?1|NO\\.?\\s?1|유일(?:한)?|최초(?:의)?)';
  var COND = '(?:드시면|드시게\\s?되면|복용하(?:시)?면|복용하시면|먹으면|하시면|받으시면|치료받으면|치료하면)';
  var ENDG = '(?:됩니다|된다|돼요|됩니다만|가능합니다|가능해요|할\\s?수\\s?있습니다)';

  /* 1단계: 의료법 제56조 주의·과장 표현 문맥 순화 규칙 */
  var RULES = [
    [new RegExp('(' + COND + ')\\s*(?:100\\s?%\\s*|백\\s?%\\s*)?완치\\s*' + ENDG, 'g'), '$1 증상 완화와 편안한 일상 회복에 도움이 될 수 있습니다', true],
    [/(?:100\s?%\s*|백\s?%\s*)?완치\s*(?:시켜\s?드립니다|해\s?드립니다|시킵니다|해드립니다|시켜드립니다|합니다)/g, '불편한 증상의 원인을 세심하게 살펴 회복을 도와드립니다', true],
    [new RegExp('(?:100\\s?%\\s*|백\\s?%\\s*)?완치\\s*' + ENDG, 'g'), '증상 완화와 건강한 회복에 도움이 될 수 있습니다', true],
    [/(?:100\s?%\s*|백\s?%\s*)?완치\s*보장\s*(?:합니다|해\s?드립니다|해드립니다)?/g, '체계적인 맞춤 진료로 회복 과정을 세심히 함께합니다', true],
    [/완치율\s*\d*\s?%?(?:\s*(?:입니다|달성|보장))?/g, '개인의 체질과 증상 깊이에 맞춘 세심한 진료를 지향합니다', true],

    [new RegExp('^(.+?)\\s*(?:이|가|은|는)\\s*' + SUP + '\\s*(?:입니다|이에요|예요|이다|다)', 'g'),
      function (m, subj) { return subj + eunNeun(subj) + ' 환자 한 분 한 분의 목소리에 귀 기울이며 정성을 다해 진료합니다'; }, false],
    [new RegExp('(?:(\\S+)\\s+)?' + SUP + '\\s*(한의원|병원|의원|명의|원장|클리닉)\\s*(?:입니다|이에요|예요|이다)', 'g'),
      function (m, pre, noun) {
        if (!pre) return '환자분의 일상을 세심히 살피며 정성껏 진료하는 ' + noun + '입니다';
        if (/^(우리|저희|본)$/.test(pre)) return pre + '는 환자분의 마음을 먼저 헤아리며 정성껏 진료하는 ' + noun + '입니다';
        return pre + '에서 정성과 근거를 바탕으로 세심히 진료하는 ' + noun + '입니다';
      }, false],

    [/(?:치료\s*)?효과\s*(?:가\s*)?(?:100\s?%|백\s?%|보장|확실|즉시|바로)\s*(?:보장|입니다|합니다|해요|예요)?/g, '개인별 증상과 체질에 맞춘 단계별 회복 계획을 안내해 드립니다', true],
    [/100\s?%\s*(?:치료\s*)?(?:효과|만족|보장)\s*(?:보장|입니다)?/g, '환자분의 상태에 맞춘 세심한 진료로 만족스러운 회복을 돕습니다', true],
    [/(?:효과|결과|치료)(?:를|을)?\s*보장\s*(?:합니다|해\s?드립니다|해드립니다|해요)/g, '건강한 일상으로 돌아가실 수 있도록 정성을 다해 진료합니다', true],

    [/특효약?(?:으로|이라서|이라|이니)\s*/g, '체질과 증상을 고려한 맞춤 처방으로 ', true],
    [/특효(약|가\s?있습니다|입니다)?/g, function (m, t) { return t === '약' ? '체질 맞춤 처방' : '긍정적인 회복에 도움이 될 수 있습니다'; }, true],
    [/(?:([^.,!?]+?),\s*)?(?:무조건|반드시|확실히|틀림없이|꼭)\s*(?:낫습니다|낫는다|좋아집니다|효과가\s?있습니다|효과\s?봅니다|치료됩니다)/g,
      function (m, topic) { return topic ? topic + eunNeun(topic) + ' 원인부터 차근차근 살피면 충분히 긍정적인 변화를 기대하실 수 있습니다' : '원인부터 차근차근 살피며 편안한 회복을 도와드립니다'; }, true],

    [/부작용(?:이|은|도)?\s*(?:전혀\s*|하나도\s*|0%\s*)?없(?:습니다|어요|다|는)/g,
      function (m) { return /는$/.test(m) ? '몸의 부담을 덜고 안전성을 세심히 살피는' : '몸에 무리가 가지 않도록 체질과 안전성을 꼼꼼히 살펴 처방합니다'; }, false],

    [/즉시\s*(?:효과|호전|완화)(?:가\s*)?(?:있습니다|나타납니다|납니다)?/g, '일상 속 불편함을 덜어드릴 수 있도록 세심하게 케어합니다', false],
    [/(?:\d+\s?%\s*)?(?:할인|이벤트|특가)(?:\s*이벤트|\s*행사)?\s*(?:진행\s?중입니다|진행합니다|중입니다|합니다|해\s?드립니다|해드립니다|중)?/g, '투명한 비급여 진료비 안내는 원내 및 홈페이지 수가표에서 편안하게 확인하실 수 있습니다', false],
    [/100\s?%\s*(안전|만족|정품)/g, function (m, w) { return w === '정품' ? '엄선된 정품 약재' : w + '을 최우선으로 생각하는 진료'; }, false]
  ];

  var LEFT = [
    [/완치/g, '증상 완화 및 회복'], [/100\s?%/g, '체계적인'], [/백\s?%/g, '체계적인'],
    [/최고의?|최상의?|최강의?|제일|1등|1위|유일한?|최초의?/g, '정성을 다하는'],
    [/보장/g, '세심한 케어'], [/특효/g, '맞춤 처방'], [/기적의?/g, '밀도 높은'],
    [/무조건|절대/g, '면밀히'], [/무통/g, '통증 부담을 줄인'], [/할인|이벤트/g, '투명한 안내']
  ];
  var BAN = /(완치|100\s?%|백\s?%|최고|최상|최강|제일|1등|1위|유일|최초|보장|특효|기적|무조건|절대|무통|부작용\s?(?:없|0%)|할인|이벤트)/;

  function splitSentences(t) {
    var out = [], buf = '';
    for (var i = 0; i < t.length; i++) {
      var ch = t.charAt(i);
      buf += ch;
      if (/[.!?]/.test(ch) && !/\d/.test(t.charAt(i + 1) || '')) {
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
      if (!punct) punct = '.';
      st.lawHits++;
    }
    return m[1] + core + punct + m[4];
  }

  /* 2단계: 금지어가 없더라도 딱딱한 병원 중심 표현을 고객이 좋아하는 공감·안심 언어로 윤문 */
  var TOPIC_EMPATHY = [
    {
      re: /(추나|척추|골반|허리|목\s?디스크|거북목|일자목|어깨|관절|통증|방사통|저림)/,
      lead: '반복되는 뻐근함과 통증으로 일상이 불편하셨나요?',
      tail: '통증 부위만 일시적으로 가리지 않고 틀어진 체형 균형까지 세심하게 살펴 편안한 일상 회복을 돕습니다.'
    },
    {
      re: /(성장|성조숙|키\s?성장|소아|어린이|아이|초등|사춘기|성장판)/,
      lead: '또래보다 작거나 잠·식사 리듬이 걱정되는 우리 아이,',
      tail: '성장판 시기와 수면·소화 흡수력부터 꼼꼼히 살핀 뒤 아이 체질에 맞춘 건강한 성장 과정을 함께합니다.'
    },
    {
      re: /(다이어트|비만|체중|감량|체형|부종|살|산후)/,
      lead: '무리하게 굶어서 지치는 감량이 아닌, 내 몸을 아끼는 건강한 변화를 시작해 보세요.',
      tail: '개인의 체질과 대사 리듬을 먼저 바로잡아 일상에서도 편안하게 유지할 수 있는 맞춤 체중 관리를 도와드립니다.'
    },
    {
      re: /(탈모|두피|모발|원형탈모|지루성|정수리|M자)/,
      lead: '거울을 볼 때마다 신경 쓰이는 모발과 두피 열감, 혼자 고민하지 마세요.',
      tail: '두피 표면뿐 아니라 몸속 열 균형과 생활 리듬까지 입체적으로 살펴 건강한 모발 환경을 되찾도록 돕습니다.'
    },
    {
      re: /(공진단|보약|경옥고|녹용|만성\s?피로|기력|면역|보양|수험생)/,
      lead: '쉬어도 가시지 않는 깊은 피로, 내 몸에 꼭 맞는 세심한 보충이 필요한 때입니다.',
      tail: '엄선된 약재와 대표원장의 1:1 진맥을 바탕으로 체질에 알맞은 기력 회복 처방을 정성껏 준비합니다.'
    },
    {
      re: /(교통사고|입원|후유증|어혈|자동차보험)/,
      lead: '사고 직후에는 괜찮은 듯해도 시간이 지나며 나타나는 뻐근함과 긴장감,',
      tail: '눈에 보이지 않는 미세 통증과 어혈까지 초기에 세심히 케어하여 후유증 걱정 없는 회복을 도와드립니다.'
    },
    {
      re: /(소화|담적|위염|역류성|장염|과민성|비염|불면|자율신경|두통|어지럼|전립선|야간뇨)/,
      lead: '검사에서는 뚜렷한 이상이 없다는데 계속 반복되는 불편함,',
      tail: '몸속 장부 기능과 자율신경 균형을 차분히 짚어내어 속부터 편안해지는 맞춤 진료를 이어갑니다.'
    }
  ];

  var WARM_TONE_SWAPS = [
    [/진료합니다\.?$/g, '원인과 체형 균형까지 세심하게 살펴 돌봐 드립니다.'],
    [/치료합니다\.?$/g, '불편함의 원인을 차근차근 짚어 편안한 일상 회복을 돕습니다.'],
    [/처방합니다\.?$/g, function(m, off, str) {
      return /체질/.test(str)
        ? '생활 리듬과 몸 상태를 꼼꼼히 살펴 정성껏 처방해 드립니다.'
        : '개인의 체질과 생활 리듬에 맞추어 세심하게 처방해 드립니다.';
    }],
    [/운영합니다\.?$/g, '편안하게 상담받고 회복하실 수 있도록 세심하게 운영하고 있습니다.'],
    [/진행합니다\.?$/g, '충분한 설명과 공감을 바탕으로 차근차근 진행해 드립니다.'],
    [/시행합니다\.?$/g, '몸에 무리가 가지 않도록 상태에 맞추어 정밀하게 시행합니다.'],
    [/도와드립니다\.?$/g, '건강한 일상으로 돌아가시는 길을 든든하게 함께합니다.'],
    [/전문으로\s*합니다\.?$/g, '중점적으로 깊이 있게 살피며 맞춤 케어를 제공합니다.'],
    [/잘하는\s*곳입니다\.?$/g, '원인부터 꼼꼼하게 짚어 정성껏 돌보는 공간입니다.']
  ];

  function elevateForPatientEmpathy(cleanText, origText, hadLawFix) {
    var base = cleanText.trim();
    if (!base) return { text: '', note: '' };

    var alreadyWarm = /(함께합니다|일상 회복을 돕습니다|혼자 고민하지 마세요|불편하셨나요|귀 기울이며|정성을 다해|정성껏|세심히|세심하게)/.test(base);
    var matchedTopic = null;
    for (var i = 0; i < TOPIC_EMPATHY.length; i++) {
      if (TOPIC_EMPATHY[i].re.test(origText) || TOPIC_EMPATHY[i].re.test(base)) {
        matchedTopic = TOPIC_EMPATHY[i];
        break;
      }
    }

    var elevated = base;
    if (!alreadyWarm) {
      for (var j = 0; j < WARM_TONE_SWAPS.length; j++) {
        elevated = elevated.replace(WARM_TONE_SWAPS[j][0], WARM_TONE_SWAPS[j][1]);
      }
    }

    if (!hadLawFix && !alreadyWarm) {
      if (matchedTopic) {
        if (elevated === base) {
          if (!/(다|요|니다|세요)[.!?]?$/.test(base)) {
            elevated = matchedTopic.lead + ' ' + base.replace(/[.!?]+$/, '') + ', ' + matchedTopic.tail;
          } else {
            elevated = matchedTopic.lead + ' ' + base.replace(/[.!?]+$/, '') + '. ' + matchedTopic.tail;
          }
        } else if (base.length < 65) {
          elevated = matchedTopic.lead + ' ' + elevated;
        }
      } else {
        if (!/(다|요|니다|세요)[.!?]?$/.test(base)) {
          elevated = '작은 불편함도 가볍게 넘기지 않고 귀 기울여 듣습니다. ' + base.replace(/[.!?]+$/, '') + ', 환자분의 체질과 일상에 맞춘 1:1 맞춤 진료로 편안한 회복을 함께합니다.';
        } else if (elevated === base) {
          elevated = '환자분의 불안한 마음까지 먼저 헤아립니다. ' + base.replace(/[.!?]+$/, '') + '. 충분한 설명과 세심한 맞춤 진료로 편안한 회복 과정을 함께합니다.';
        } else if (base.length < 60) {
          elevated = '환자분의 작은 불편함에도 깊이 귀 기울입니다. ' + elevated;
        }
      }
    } else if (hadLawFix && matchedTopic && elevated.length < 55) {
      elevated = matchedTopic.lead + ' ' + elevated;
    }

    elevated = elevated.replace(/\.\./g, '.').replace(/\s{2,}/g, ' ').trim();
    var reason = hadLawFix
      ? '의료법 제56조 주의 표현을 안전하게 순화하고, 환자가 안심할 수 있는 공감·신뢰 어조로 다듬었습니다.'
      : '금지어는 없었지만, 병원 중심의 설명투를 환자가 읽자마자 공감하고 안심하는 따뜻한 상담 어조로 업그레이드했습니다.';
    return { text: elevated, note: reason };
  }

  function softenKo(text) {
    var src = String(text == null ? '' : text).trim();
    if (!src) {
      return { text: '', changed: false, hits: 0, lawHits: 0, mode: 'empty', note: '다듬을 문구를 입력해 주세요.' };
    }
    var st = { guarantee: false, lawHits: 0 };
    var parts = splitSentences(src), out = [];
    parts.forEach(function (p) {
      var q = softenSentence(p, st).trim();
      if (q && out.indexOf(q) < 0) out.push(q);
    });
    var lawCleaned = out.join(' ').replace(/\s{2,}/g, ' ').trim();
    var elevatedObj = elevateForPatientEmpathy(lawCleaned, src, st.lawHits > 0);
    var res = elevatedObj.text;
    if (st.guarantee && res.indexOf('개인차') < 0) {
      res += ' (개인별 체질과 증상에 따라 회복 경과에는 차이가 있을 수 있습니다.)';
    }
    return {
      text: res,
      changed: res !== src,
      hits: st.lawHits,
      lawHits: st.lawHits,
      mode: st.lawHits > 0 ? 'law+empathy' : 'empathy',
      note: elevatedObj.note
    };
  }

  function polishClinicPair(title, sub) {
    var tSrc = String(title || '').trim();
    var sSrc = String(sub || '').trim();
    var tRes = tSrc ? softenKo(tSrc) : { text: '', lawHits: 0 };
    var cleanTitle = tSrc;
    if (tSrc) {
      var stT = { guarantee: false, lawHits: 0 };
      cleanTitle = softenSentence(tSrc, stT).replace(/[.]+$/, '').trim();
      if (stT.lawHits === 0 && cleanTitle.length < 28 && !/[—·:?]/.test(cleanTitle) && !/^(통증의 중심축|아이의 바른|체질부터|뿌리부터|정성과 진맥|마음까지)/.test(cleanTitle)) {
        if (/(추나|척추|골반|허리|목)/.test(cleanTitle)) cleanTitle = '통증의 중심축을 바로잡는 ' + cleanTitle;
        else if (/(성장|소아|아이)/.test(cleanTitle)) cleanTitle = '아이의 바른 성장을 함께하는 ' + cleanTitle;
        else if (/(다이어트|체형|비만)/.test(cleanTitle)) cleanTitle = '체질부터 건강하게 비우는 ' + cleanTitle;
        else if (/(탈모|두피)/.test(cleanTitle)) cleanTitle = '뿌리부터 건강하게 돌보는 ' + cleanTitle;
        else if (/(공진단|보약|녹용)/.test(cleanTitle)) cleanTitle = '정성과 진맥으로 빚어내는 ' + cleanTitle;
        else cleanTitle = '마음까지 세심히 살피는 ' + cleanTitle;
      }
    }
    var sRes = sSrc ? softenKo(sSrc) : { text: '', lawHits: 0, note: '' };
    return {
      title: cleanTitle,
      sub: sRes.text,
      lawHits: (tRes.lawHits || 0) + (sRes.lawHits || 0),
      note: sRes.note || tRes.note || ''
    };
  }

  root.softenKo = softenKo;
  root.polishClinicPair = polishClinicPair;
  if (typeof module !== 'undefined') {
    module.exports = softenKo;
    module.exports.softenKo = softenKo;
    module.exports.polishClinicPair = polishClinicPair;
  }
})(typeof window !== 'undefined' ? window : globalThis);
