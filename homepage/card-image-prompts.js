(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BareunCardPrompts = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * 11대 상세페이지 전체 카드 이미지별 실제 시각 장면 프롬프트 사전
   * - 템플릿이 아닌, 현재 각 카드에 실제로 걸려 있는 사진의 구도·조명·인물·소품을 그대로 읽어온 프롬프트입니다.
   * - 사용자는 이 프롬프트에서 원하는 부분만 수정하여 곧바로 새로운 최고화질 이미지를 제작할 수 있습니다.
   */
  const CARD_IMAGE_PROMPT_MAP = {
    // === 01. 대표원장 철학 · 9대 정밀검진 (director.html) ===
    'card_1_director.jpg':
      '따뜻한 채광이 우드 블라인드 사이로 은은하게 비치는 한의원 원목 진료실에서, 흰 의사 가운과 세로 스트라이프 셔츠, 얇은 금테 안경을 착용한 대표원장이 원목 책상에 두 손을 단정히 모으고 앉아 정면을 향해 온화하고 신뢰감 있게 미소 짓는 상반신 실사 포트레이트 (배경에는 서예 족자와 백자 약단지 선반이 부드럽게 아웃포커싱됨)',
    'detail_director_story1_enter.jpg':
      '따뜻한 원목과 한지 인테리어의 한의원 진료실 문을 열고 들어서며 단정한 흰 의사 가운 차림으로 환자분을 반갑고 다정하게 맞이하는 대표원장의 실사 사진',
    'detail_director_consult.jpg':
      '아늑한 원목 블라인드 채광이 들어오는 한의원 진료실 책상에서 흰 의사 가운을 입은 원장이 차트를 살피며 맞은편 환자의 이야기를 깊이 경청하고 1:1 심층 문진하는 실사 사진',
    'detail_director_story2_clean.jpg':
      '따뜻한 햇살이 스며드는 한의원 원목 진료 책상 위 명주 진맥 쿠션에 양 손목을 올려둔 환자에게, 흰 의사 가운과 스트라이프 셔츠를 입은 한의사의 양손이 손목 요골동맥 부위를 정성스럽게 감싸 맥을 짚는 클로즈업 실사 사진 (얼굴 미노출 손 클로즈업, 배경에 약재 유리병과 한방 찻잔 보케)',
    'detail_director_story2_both_wrists_pulse.jpg':
      '따뜻한 원목 한의원 진료 책상 위 진맥 쿠션에 놓인 환자의 양 손목 요골동맥을 흰 가운을 입은 한의사가 양손 손끝으로 정밀하게 짚어 자율신경과 장부 맥상을 판독하는 클로즈업 실사 사진',
    'detail_director_story3_clean.jpg':
      '따뜻한 우드 블라인드 햇살이 비치는 한의원 상담실에서 흰 가운을 입은 의사가 펜을 들고 태블릿 화면의 척추·경락 통합 치료 지도를 가리키며 설명하고, 맞은편 베이지 니트 차림의 여성 환자가 고개를 끄덕이며 밝게 미소 짓는 어깨너머(오버더숄더) 실사 사진',
    'detail_director_story4_clean.jpg':
      '따뜻한 원목 약재 검수 테이블 위 월넛 트레이에 놓인 최상급 러시아 녹용 분골 단면과 인삼·당귀·청정 한약재를 흰 가운 소매의 한의사 두 손이 황동 돋보기와 정밀 핀셋으로 꼼꼼하게 검수하는 하이앵글 클로즈업 실사 사진 (배경에 전통 고서와 황동 약저울 배치)',
    'detail_director_story4_decoction_lab.jpg':
      '위생적인 통유리 원내 무균 탕전실을 배경으로 최상급 녹용 절편과 청정 GMP 한약재를 정성껏 검수하고 달여내는 한의원 탕전 스틸 실사 사진',
    'detail_director_story5_no_director.jpg':
      '투명 통유리 너머 깨끗한 스테인리스 원내 탕전실이 보이는 따뜻한 우드톤 한의원 라운지 소파에서, 베이지 니트를 입은 엄마와 겨자색 가디건을 입은 어린 아들이 한방 찻잔을 들고 환하게 웃고 있는 실사 사진 (앞 원목 테이블 위 백자 다관과 맑은 한약 유리병 배치)',
    'ba_director_before.jpg':
      '차분한 한의원 진료실 배경에서 만성 피로와 통증 완화를 위한 한방 치료 전 상태를 보여주는 클리닉 비교용 실사 사진',
    'ba_director_after.jpg':
      '따뜻한 원목 한의원 진료실에서 단정한 흰 의사 가운과 금테 안경을 착용하고 신뢰감 있는 표정으로 서 있는 대표원장의 정면 프로필 실사 사진',
    'director_exam_card1_ultrasound.jpg':
      '따뜻한 한지 창호 자연광이 들어오는 한의원 검진실에서 흰 가운과 라텍스 장갑을 착용한 의료진이 베드에 누워 연두색 타월을 덮은 환자의 어깨·쇄골 부위에 초음파 젤과 프로브를 대고 뒤편 컬러 도플러 초음파 모니터로 심부 조직을 정밀 판독하는 실사 사진',
    'director_exam_card2_thermography.jpg':
      '원목 벽면과 우드 블라인드 햇살이 어우러진 한의원 체열진단실에서 연회색 검진복 차림의 여성 환자가 맨발로 적외선 체열진단 카메라 앞에 서 있고, 좌측 대형 세로 모니터에 전신 적외선 열화상(체열 분포도)이 선명하게 표시된 실사 사진',
    'director_exam_card3_ent_endoscope.jpg':
      '정갈하고 따뜻한 우드톤 한의원 이비인후 검진실에서 흰 가운을 입은 의료진이 고화질 비강·인후두 내시경 장비로 환자의 코·목 점막 상태를 살피며 모니터 화면으로 숨은 염증을 확인하는 실사 사진',
    'director_exam_card4_sasang_constitution.jpg':
      '따뜻한 한의원 상담실 원목 데스크에서 사상체질 정밀 분석 차트와 체형·맥진 데이터를 함께 대조하며 개인별 태양·태음·소양·소음 맞춤 체질 처방을 진단하는 실사 사진',
    'director_exam_card5_bodyfat_inbody.jpg':
      '모던하고 따뜻한 한의원 체성분 측정실에서 환자가 정밀 체성분·내장지방 분석기(인바디) 위에 올라 체지방률과 골격근량, 체수분 밸런스를 측정하고 결과 데이터를 확인하는 실사 사진',
    'director_exam_card6_autonomic_hrv.jpg':
      '차분한 한의원 신경계 검진실에서 환자가 손가락 맥파·심박변이도(HRV) 센서를 착용하고 편안히 앉아 자율신경 균형도와 스트레스 파형 그래프를 정밀 측정하는 실사 사진',
    'director_exam_card7_endocrine_liver_glucose.jpg':
      '깨끗하고 정밀한 한의원 임상 병리·생화학 검사 환경에서 안전한 한약 처방을 위해 간 기능 수치(AST·ALT)와 혈당·당화혈색소·지질 대사 지표를 소량 채혈 분석기로 정밀 점검하는 실사 사진',
    'director_exam_card8_vascular_toxin.jpg':
      '따뜻한 조명의 한의원 검진 데스크에서 가속도 맥파 측정 센서로 손끝 말초 혈관 탄성도와 혈액순환 속도, 어혈 정체 단계를 정밀 스캔하여 모니터 파형으로 판독하는 실사 사진',
    'director_exam_card9_growth_check.jpg':
      '밝고 따뜻한 소아 성장클리닉 검진실에서 방사선 노출 없는 안전한 초음파 프로브로 어린이 환자의 무릎·손목 성장판 개방도와 골연령을 정밀 측정하는 실사 사진',

    // === 02. 바른 추나 · 척추교정 (chuna.html) ===
    'chuna_minimal_card1_core_align_a.jpg':
      '미니멀한 웜 샌드베이지 스튜디오 배경 앞에서 아이보리 슬림 핏 상·하의를 입은 한국인 여성이 뒤돌아 서 있고, 허리와 요추·골반 부위에 붉은 통증 압박 신호가 투영된 에디토리얼 실사 사진',
    'chuna_minimal_card1_core_align_b.jpg':
      '미니멀한 웜 샌드베이지 스튜디오 배경 앞에서 아이보리 웨어 차림의 한국인 여성 뒷모습에 틀어진 요추와 골반 중심축이 부드러운 골드 라인으로 교정되어 가는 에디토리얼 실사 사진',
    'chuna_minimal_card1_core_align_c.jpg':
      '미니멀한 웜 샌드베이지 스튜디오 배경 앞에서 아이보리 웨어 차림의 한국인 여성이 곧고 반듯하게 정렬된 척추·골반 중심축으로 편안하게 서 있는 에디토리얼 실사 사진',
    'chuna_minimal_card2_painkiller_limit.jpg':
      '미니멀한 웜 베이지 톤 배경에서 진통제 알약과 파스만으로는 해결되지 않는 기울어진 척추·골반 불균형과 만성 허리 통증의 한계를 직관적으로 보여주는 에디토리얼 실사 사진',
    'chuna_minimal_card3_pelvis_tilted_a.jpg':
      '미니멀한 웜 베이지 스튜디오에서 골반과 어깨 높이가 비대칭으로 틀어지고 하체 순환 정체로 무거워 보이는 한국인 환자의 체형 전신 실사 사진',
    'chuna_minimal_card3_pelvis_correcting_b.jpg':
      '미니멀한 웜 베이지 스튜디오에서 중심축 추나 교정을 통해 좌우 골반 대칭과 전신 어혈·부종 순환이 회복되어 가는 체형 변화 실사 사진',
    'chuna_minimal_card3_pelvis_aligned_c.jpg':
      '미니멀한 웜 베이지 스튜디오에서 골반과 척추 대칭이 반듯하게 정렬되고 부종 없이 가벼워진 한국인 여성의 건강한 전신 라인 실사 사진',
    'chuna_minimal_card4_ba_before.jpg':
      '웜 베이지 스튜디오 측면 구도에서 거북목과 굽은 등, 기울어진 요추·골반으로 인해 디스크 압박이 심해진 교정 전 체형 실사 사진',
    'chuna_minimal_card4_ba_after.jpg':
      '웜 베이지 스튜디오 측면 구도에서 추간판 감압과 수기 추나 교정 후 귀·어깨·골반 중심축이 일직선으로 바르게 펴진 교정 후 체형 실사 사진',
    'chuna_minimal_card5_stage1_nerve_calm.jpg':
      '따뜻한 베이지 미니멀 톤에서 목과 허리의 과흥분된 척추 신경근 염증과 찌릿한 방사통 긴장이 부드럽게 진정되고 이완되는 감각적인 메디컬 에디토리얼 실사 사진',
    'chuna_minimal_card6_physiotherapy.jpg':
      '정갈하고 아늑한 우드·베이지 톤 한방 물리치료실에서 최신 심부 통증 제어 물리치료 기기로 근육·인대·관절 통증을 편안하게 케어받는 실사 사진',
    'chuna_minimal_card7_hand_palpation_herb.jpg':
      '미니멀한 따뜻한 베이지 스튜디오 배경과 내추럴 린넨 테이블 위에서, 네이비 니트 소매 환자의 손목이 아이보리 명주 진맥 쿠션에 놓여 있고 흰 의사 가운을 입은 한의사가 검지·중지·약지(2·3·4지) 세 손가락을 손목 요골동맥에 정확히 얹어 맥을 짚는 클로즈업 실사 사진 (우측에 따뜻한 황금빛 한약 유리 찻잔 배치)',
    'chuna_minimal_card8_upright_posture.jpg':
      '따뜻한 자연광이 비치는 공간에서 수술 없이 통증에서 벗어나 곧고 우아한 척추·어깨 자세로 밝게 미소 짓는 한국인 성인의 회복 후 실사 사진',
    'chuna_minimal_card9_trouble_1_childcare.jpg':
      '거실에서 어린 아이를 안아 올리다가 갑자기 허리와 골반에 찌릿한 통증이 찾아와 허리를 짚고 멈춰 선 한국인 엄마의 현실 공감 실사 사진',
    'chuna_minimal_card9_trouble_2_office.jpg':
      '사무실 책상 컴퓨터 앞에서 장시간 업무 중 굳어버린 뒷목 거북목과 허리 디스크 통증으로 목과 허리를 짚으며 힘들어하는 한국인 직장인의 실사 사진',
    'chuna_minimal_card9_trouble_3_menopause.jpg':
      '따뜻한 실내에서 갱년기 이후 갑자기 찾아온 골반·무릎·허리 관절 통증으로 자리에서 일어나기 힘들어하는 중년 여성의 공감 실사 사진',

    // === 03. 바른 성장 · 성조숙증 (growth.html) ===
    'growth-director-son.png':
      '밝고 따뜻한 자연광 아래 아빠 한의사와 아들이 함께 나란히 서서 해마다 건강하고 훤칠하게 자라나는 성장 과정을 다정하게 담은 가족 기념 실사 사진',
    'detail_growth_story2_supplements_limit.jpg':
      '식탁 위 수많은 일반 칼슘제와 영양제 통들이 놓여 있지만 식욕 부진과 잦은 비염으로 지쳐 있는 어린이의 모습을 통해 단순 영양제의 한계를 보여주는 따뜻한 톤의 실사 사진',
    'growth_minimal_card3_obese_to_tall_a.jpg':
      '미니멀한 웜 베이지 스튜디오 배경에서 통통한 소아비만 체형으로 서 있는 초등학생 아이의 치료 전 전신 실사 사진',
    'growth_minimal_card3_obese_to_tall_b.jpg':
      '미니멀한 웜 베이지 스튜디오 배경에서 체지방이 건강한 성장 대사 에너지로 전환되며 균형 잡힌 체형으로 키가 자라나는 아이의 전신 실사 사진',
    'growth_minimal_card3_obese_to_tall_c.jpg':
      '미니멀한 웜 베이지 스튜디오 배경에서 소아비만 살이 키로 전환되어 날씬하고 훤칠하게 자라난 청소년의 밝고 당당한 전신 실사 사진',
    'growth_minimal_card4_short_before.jpg':
      '미니멀한 웜 베이지 스튜디오에서 또래보다 작고 왜소한 키로 서 있는 성장 치료 전 어린이의 전신 실사 사진',
    'growth_minimal_card4_growing_mid.jpg':
      '미니멀한 웜 베이지 스튜디오에서 무릎과 척추 성장판 연골 증식이 활발해지며 위로 쑥쑥 자라나는 성장기 아이의 실사 사진',
    'growth_minimal_card4_tall_after.jpg':
      '미니멀한 웜 베이지 스튜디오에서 바른 척추 정렬과 함께 훤칠하고 탄탄한 키로 폭풍 성장한 청소년의 전신 실사 사진',
    'growth-child-sleep.jpg':
      '은은하고 포근한 밤 조명이 감도는 침실에서 구강호흡 없이 코로 편안하게 숨 쉬며 성장호르몬이 분비되는 깊은 숙면에 빠진 한국인 어린이의 실사 사진',
    'growth_minimal_card6_youth_athletes_v2.jpg':
      '깨끗하고 역동적인 스튜디오 조명 아래 운동복 차림으로 탄탄한 피지컬과 에너지를 보여주는 유소년·청소년 스포츠 선수 준비생의 에디토리얼 실사 사진',
    'growth_minimal_card7_ultrasound_noface.jpg':
      '따뜻한 소아 성장 검진실에서 방사선 노출 걱정 없는 안전한 초음파 프로브로 어린이의 무릎 성장판 부위를 부드럽게 스캔하는 클로즈업 실사 사진 (얼굴 미노출)',
    'detail_growth_story5_tall_basketball.jpg':
      '햇살 가득한 야외 농구 코트에서 또래보다 훤칠하게 자란 탄탄한 체격의 한국인 청소년이 농구공을 들고 건강하고 자신감 넘치게 미소 짓는 실사 사진',
    'detail_growth_story1_wall_chart.jpg':
      '집 거실 벽면 키재기 자 앞에 서서 잘 자라지 않는 작은 키를 아쉬운 눈빛으로 바라보는 어린이와 부모님의 일상 공감 실사 사진',
    'detail_growth_story1_mouth_breathing.jpg':
      '밤사이 비염과 코막힘 때문에 입을 벌리고 구강호흡을 하며 얕은 잠에 뒤척이는 한국인 어린이의 침실 실사 사진',
    'growth_minimal_card9_picky_eating.jpg':
      '식탁 위 정성껏 차린 밥상 앞에서 입맛이 없어 숟가락을 내려놓고 편식하는 어린 아이의 일상 공감 실사 사진',

    // === 04. 바른 다이어트 · 식욕ZERO (diet-zero.html) ===
    'diet_minimal_card1_muscle_burn_a.jpg':
      '미니멀한 웜 샌드베이지 스튜디오에서 아이보리 니트 라운지웨어를 입고 편안히 기대앉은 한국인 여성의 복부 코어 근육에 따뜻한 대사열 글로우가 깨어나는 하이엔드 에디토리얼 실사 사진',
    'diet_minimal_card1_muscle_burn_b.jpg':
      '미니멀한 웜 샌드베이지 스튜디오에서 아이보리 라운지웨어 차림으로 편안히 쉬는 동안 복부 근육 대사열이 내장지방을 분해하는 하이엔드 에디토리얼 실사 사진',
    'diet_minimal_card1_muscle_burn_c.jpg':
      '미니멀한 웜 샌드베이지 스튜디오에서 아이보리 니트 투피스를 입은 한국인 여성이 운동 없이도 탄탄하고 매끄러운 복부·허리 라인을 보여주는 에디토리얼 실사 사진',
    'diet_minimal_card2_starvation_muscle_loss.jpg':
      '미니멀한 베이지 톤 실내에서 무리한 굶기 다이어트로 기력이 빠지고 지쳐 보이는 여성의 모습을 통해 근손실과 요요의 위험성을 표현한 실사 사진',
    'diet_minimal_card3_edema_full_a.jpg':
      '미니멀한 웜 베이지 스튜디오에서 수분 정체와 림프 순환 저하로 얼굴과 하체 전신이 무겁게 부어 있는 여성의 전신 실사 사진',
    'diet_minimal_card3_edema_squeeze_b.jpg':
      '미니멀한 웜 베이지 스튜디오에서 정체된 체내 수독과 부종이 원활한 순환을 통해 빠져나가며 라인이 정리되는 과정의 에디토리얼 실사 사진',
    'diet_minimal_card3_edema_slim_c.jpg':
      '미니멀한 웜 베이지 스튜디오에서 전신 붓기가 깨끗하게 빠지고 가볍고 늘씬한 실루엣을 되찾은 한국인 여성의 에디토리얼 실사 사진',
    'diet_minimal_card9_ba_before_v2.jpg':
      '웜 베이지 스튜디오에서 복부와 허리 둘레에 내장지방과 나잇살이 집중되어 답답해 보이는 감량 전 체형 실사 사진',
    'diet_minimal_card9_ba_after.jpg':
      '웜 베이지 스튜디오에서 근육 대사 활성화로 복부 내장지방이 슬림하게 수축되고 탄력 있는 허리 라인이 완성된 감량 후 체형 실사 사진',
    'diet_minimal_card3_stage1_neuro_calm.jpg':
      '차분하고 따뜻한 저녁 실내 조명 아래 야식 유혹이나 가짜 배고픔 스트레스 없이 편안하고 안정된 표정으로 허브티를 즐기는 한국인 여성의 실사 사진',
    'diet_minimal_card7_custom_herb_pulse.jpg':
      '따뜻한 베이지 톤 진료 테이블 위 명주 쿠션에 놓인 환자 손목을 한의사가 세 손가락으로 정밀하게 진맥하며 옆에 체질 맞춤 다이어트 한약이 정갈하게 놓인 클로즈업 실사 사진',
    'diet_minimal_card8_slim_woman.jpg':
      '밝고 세련된 자연광 스튜디오에서 아이보리 톤 의상을 입고 건강하고 탄탄한 슬림 바디라인으로 환하게 미소 짓는 한국인 여성의 에디토리얼 실사 사진',
    'diet_minimal_card9_trouble_1_childcare.jpg':
      '드레스룸 거울 앞에서 출산과 육아 후 갑자기 불어난 뱃살 때문에 예전에 입던 바지 지퍼가 잠기지 않아 난감해하는 한국인 여성의 공감 실사 사진',
    'diet_minimal_card9_trouble_2_wedding.jpg':
      '결혼식을 앞두고 드레스 피팅 거울 앞에서 팔뚝과 허리 라인이 타이트하게 끼어 고민하는 예비 신부의 현실 공감 실사 사진',
    'diet_minimal_card9_trouble_3_menopause_v2.jpg':
      '적게 먹어도 복부와 허리에 나잇살이 쉽게 붙는 갱년기 체중 증가로 거울 앞에서 한숨짓는 중년 여성의 공감 실사 사진',

    // === 05~09. 바른 탈모 5종 클리닉 (hairloss*.html) ===
    'detail_hair_story1_30cm_tension.jpg':
      '자연광이 들어오는 현대적인 한국 오피스 사무실에서 하늘색 셔츠를 입은 30~40대 남성 직장인이 모니터 앞에 앉아 있고 뒤에 서류철을 든 동료가 가까이 다가와 서류와 모니터를 함께 볼 때, 위에서 보이는 M자 이마와 정수리 모발이 신경 쓰여 긴장한 리얼 오피스 실사 사진',
    'detail_hair_story1_date_bow.jpg':
      '따뜻한 카페 조명 아래 마주 앉은 자리에서 고개를 살짝 숙일 때 넓어진 정수리 가르마 빈모가 신경 쓰이는 한국인 여성의 일상 공감 실사 사진',
    'life_3a_hairloss.jpg':
      '거울 앞에서 머리카락을 들춰보며 동전 모양으로 비어버린 원형탈모 부위와 얇아진 모발을 걱정스럽게 살피는 한국인 성인의 실사 사진',
    'detail_hair_story2_cabinet_failure.jpg':
      '욕실 선반 가득 탈모 샴푸와 토닉, 외용제가 놓여 있지만 여전히 빠지는 머리카락을 보며 근본 두피열 치료의 필요성을 느끼는 리얼 라이프스타일 실사 사진',
    'detail_hair_thermography.jpg':
      '한의원 두피 검진 모니터에 상체와 머리 두피 부위로 붉게 치솟은 상열하한(두피 열독) 적외선 체열 데이터가 선명하게 나타난 정밀 진단 실사 사진',
    'life_3a_follicle_zoom.jpg':
      '고배율 두피 현미경으로 촬영한 충혈되고 열감이 오른 두피 표피와 가늘어진 모근 상태를 보여주는 정밀 클로즈업 실사 이미지',
    'detail_hair_story3_boiling_pot_cooling.jpg':
      '뜨겁게 달아오른 두피의 열독이 맑고 시원하게 내려가며 모낭 뿌리에 건강한 수분과 영양 기운이 차오르는 하이엔드 메디컬 비주얼 실사 이미지',
    'detail_hair_follicle_3d.jpg':
      '진피층 깊은 곳의 모유두세포와 모낭 주변 미세혈류가 건강하게 살아나 굵고 힘 있는 모발 뿌리가 재생되는 정밀 3D 메디컬 일러스트 실사 이미지',
    'illust_cervical_hairloss.jpg':
      '거북목으로 좁아진 뒷목 경추 혈류 통로가 열리며 두피 모낭까지 맑은 영양 혈액이 원활하게 공급되는 해부학적 순환 비주얼 이미지',
    'detail_hair_story4_pulse_routine.jpg':
      '따뜻한 한의원 치료실에서 경추 혈류 병목을 풀어주는 추나 치료와 정밀 진맥으로 두피 순환의 근본을 다스리는 진료 실사 사진',
    'detail_hair_pharmacopuncture.jpg':
      '청결한 한의원 두피 치료실에서 멸균 장갑을 착용한 한의사가 정제된 고농축 모낭 재생 약침을 두피 탈모 부위에 세밀하게 시술하는 클로즈업 실사 사진',
    'detail_chuna_cervical.jpg':
      '한의원 추나 교정 베드에서 한의사가 숙련된 손길로 환자의 굳어진 뒷목 경추와 후두하근 긴장을 정교하게 풀어 두피 혈류를 여는 수기 추나 실사 사진',
    'detail_hair_story5_30cm_confidence.jpg':
      '밝은 오피스 자연광 아래 풍성하고 힘 있게 살아난 앞머리와 정수리 볼륨으로 동료와 당당하고 환하게 대화하는 한국인 남성의 회복 후 실사 사진',
    'detail_hair_story5_date_smile.jpg':
      '따뜻한 햇살이 비치는 창가에서 촘촘하게 채워진 정수리 가르마와 윤기 나는 모발로 자신감 있게 미소 짓는 한국인 여성의 회복 후 실사 사진',
    'life_3b_hair_restored.jpg':
      '원형탈모 부위에 검고 굵은 신생모가 빽빽하게 자라나 건강하고 자연스러운 두피 밀도를 되찾은 치료 후 클로즈업 실사 사진',
    'bareun_step3_scalp_hair_revival.jpg':
      '붉은 염증과 각질이 진정되고 깨끗하고 촉촉한 두피 장벽 위로 굵고 건강한 모발이 힘 있게 자라난 두피 회복 실사 이미지',
    'ba_hair_before.jpg':
      '정수리와 가르마, M자 부위 모발이 가늘어지고 두피가 비쳐 보이는 치료 전 두피 근접 촬영 실사 사진',
    'ba_hair_after.jpg':
      '모근 재생 치료 후 정수리와 가르마 부위에 굵고 검은 모발이 풍성하고 빽빽하게 채워진 치료 후 두피 근접 촬영 실사 사진',
    'illust_syncope_autonomic.jpg':
      '과열된 교감신경과 면역 혼란이 안정되며 뇌혈류와 두피 미세혈관 순환이 평온하게 회복되는 하이엔드 메디컬 비주얼 이미지',

    // === 10. 바른 황제공진단 (gongjindan.html) ===
    'gongjindan_minimal_card1_vitality_core_a.jpg':
      '미니멀한 웜 베이지 스튜디오 벽면 앞에서 베이지 니트 스웨터를 입은 40~50대 한국인 남성이 만성 피로와 기력 저하로 지친 표정을 짓고 가슴 중심부에 옅은 기력 소모 신호가 표현된 에디토리얼 실사 사진',
    'gongjindan_minimal_card1_vitality_core_b.jpg':
      '미니멀한 웜 베이지 스튜디오에서 황제공진단의 깊은 원기 에너지가 흉곽과 전신 순환계로 따뜻하게 퍼져 나가는 한국인 남성의 에디토리얼 실사 사진',
    'gongjindan_minimal_card1_vitality_core_c.jpg':
      '미니멀한 웜 베이지 스튜디오에서 깊은 피로를 떨쳐내고 맑은 안색과 단단한 활력을 되찾은 한국인 중년 남성의 당당한 포트레이트 실사 사진',
    'detail_gongjindan_story2_bottomless_glass.jpg':
      '깊고 중후한 다크 브라운 스튜디오 조명 아래 전통 나전칠기 목함 트레이 위 백자 접시에 놓인 24K 순금박 황제공진단 환약에서 황금빛 사향(L-Muscone) 기운이 피어올라 투명 인체 모형의 뇌 신경망과 심장 혈관을 환하게 밝히는 하이엔드 비주얼 이미지',
    'gongjindan_minimal_card3_circulation_a.jpg':
      '은은한 골드 베이지 스튜디오 조명 아래 공진단 복용으로 혈색이 맑아지고 피부 결에 탄력과 생기가 감도는 한국인 성인의 우아한 뷰티·웰니스 에디토리얼 실사 사진',
    'gongjindan_minimal_card4_ba_before.jpg':
      '차분한 베이지 톤 실내에서 만성 피로와 하복부 냉증, 기력 저하로 지쳐 보이는 부부의 모습을 담은 실사 사진',
    'gongjindan_minimal_card4_ba_after.jpg':
      '따뜻한 아침 햇살이 감도는 베이지 톤 공간에서 건강한 생식 활력과 따뜻한 기력을 되찾아 다정하게 미소 짓는 한국인 부부의 에디토리얼 실사 사진',
    'gongjindan_minimal_card5_stage1_brain_calm.jpg':
      '차분한 서재·스터디 조명 아래 스트레스와 불안감이 가라앉고 맑고 명쾌한 두뇌 집중력을 발휘하는 수험생·전문직 성인의 에디토리얼 실사 사진',
    'gongjindan_minimal_card8_vitality_finale.jpg':
      '따뜻한 햇살이 드는 공간에서 시리고 뻐근하던 무릎 관절 통증 없이 가볍고 힘차게 걸음을 내딛는 건강한 중장년 성인의 실사 사진',
    'gongjindan_minimal_card9_trouble_3_parents.jpg':
      '창가 의자에 앉아 부쩍 기력이 쇠약해지고 피로해 보이는 부모님의 모습을 따뜻하고 애틋한 시선으로 담아낸 실사 사진',
    'gongjindan_minimal_card9_trouble_2_brainfog.jpg':
      '중요한 업무와 시험을 앞두고 책상 앞에서 머리가 멍해지는 브레인 포그와 극심한 피로감에 눈을 감고 이마를 짚는 성인의 실사 사진',
    'gongjindan_card9_frame3_pov_gift.jpg':
      '고급 원목 단상자에 정성스럽게 포장된 순금박 황제공진단 선물 세트를 소중한 부모님과 가족에게 두 손으로 건네는 따뜻한 1인칭 시점(POV) 실사 사진',

    // === 11. 바른 전립선 · 남성활력 (prostate.html) ===
    'prostate_minimal_card1_core_relief_a.jpg':
      '따뜻한 아키텍처 베이지 톤 공간에서 아이보리 니트 스웨터를 입은 40~50대 한국인 남성이 묵직한 하복부·전립선 압박감과 잔뇨 불편감으로 아랫배를 짚으며 인상을 찌푸린 에디토리얼 실사 사진 (하복부에 은은한 온열 압박 글로우 표현)',
    'prostate_minimal_card1_core_relief_b.jpg':
      '따뜻한 베이지 톤 공간에서 골반 울혈과 전립선 비대 압박이 부드럽게 감압되고 하초 온열 순환이 살아나는 한국인 중년 남성의 에디토리얼 실사 사진',
    'prostate_minimal_card1_core_relief_c.jpg':
      '따뜻한 베이지 톤 공간에서 하복부 묵직함이 말끔히 사라지고 편안하고 당당한 미소를 되찾은 한국인 중년 남성의 에디토리얼 실사 사진',
    'prostate_minimal_card2_antibiotic_limit.jpg':
      '차분한 베이지 톤 실내에서 반복되는 약 복용에도 해결되지 않는 굳어버린 골반 울혈과 배뇨 불편감에 답답해하는 중년 남성의 실사 사진',
    'prostate_minimal_card3_decongestion_a.jpg':
      '오래 앉아 일하는 환경에서 묵직하고 뻐근하던 하복부 골반 혈류가 심부 온열 순환으로 시원하게 풀리는 남성 웰니스 에디토리얼 실사 사진',
    'prostate_minimal_card4_ba_before.jpg':
      '어두운 새벽 침실에서 잦은 야간뇨와 잔뇨감 때문에 잠에서 깨어 침대 끝에 걸터앉아 피로해하는 중년 남성의 실사 사진',
    'prostate_minimal_card4_ba_after.jpg':
      '상쾌한 아침 햇살이 비치는 침실에서 야간뇨 없이 아침까지 끊김 없는 깊은 통잠을 자고 개운하게 눈을 뜨는 중년 남성의 실사 사진',
    'prostate_minimal_card5_stage1_bladder_calm.jpg':
      '포근하고 고요한 밤 침실 분위기 속에서 과민했던 방광 자율신경이 평온하게 안정되어 숙면을 취하는 남성의 에디토리얼 실사 사진',
    'prostate_minimal_card6_pelvic_chuna_care.jpg':
      '프라이빗하고 정갈한 한의원 추나 치료실에서 회음부와 방광 신경을 누르는 틀어진 골반·천장관절 균형을 수기 추나로 정밀하게 교정하는 실사 사진',
    'prostate_minimal_card7_pulse_custom_herb.jpg':
      '독립된 프라이빗 원목 진료실에서 흰 가운을 입은 한의사가 중장년 남성 환자의 손목 요골동맥을 정밀하게 진맥하며 원기 회복 맞춤 한약을 처방하는 클로즈업 실사 사진',
    'prostate_minimal_card8_vitality_finale.jpg':
      '따뜻한 아침 자연광 아래 깔끔한 셔츠·니트 차림으로 활기차고 당당한 남성 활력과 자신감 있는 미소를 보여주는 중년 남성의 포트레이트 실사 사진',
    'prostate_minimal_card9_trouble_1_nocturia.jpg':
      '새벽 시간 어두운 침실에서 또다시 찾아온 소변 신호(야간뇨)로 잠을 설치며 힘들어하는 중년 남성의 현실 공감 실사 사진',
    'prostate_minimal_card9_trouble_2_driving.jpg':
      '운전석이나 중요한 회의 도중 갑자기 참기 힘든 급박뇨·빈뇨 신호가 찾아와 진땀을 흘리며 곤란해하는 남성의 공감 실사 사진',
    'prostate_minimal_card9_trouble_3_pelvicpain.jpg':
      '오후 사무실 의자에 오래 앉아 있다가 묵직한 회음부·골반 불쾌감과 만성 피로감에 허리와 아랫배를 짚는 중년 남성의 공감 실사 사진',

    // === 00. 메인 홈 시작 오프닝 스토리 24컷 & 7대 진료 벤토 카드 (index.html / story-3d.html) ===
    'life_1a0_infertility_before.jpg':
      '은은한 저녁 햇살이 감도는 따뜻한 거실 창가에서 아이를 간절히 기다리는 젊은 한국인 부부가 서로의 두 손을 다정하게 맞잡고 희망을 품는 감성 시네마틱 실사 사진',
    'life_1a1_infertility_treatment.jpg':
      '따뜻한 원목과 한지 채광이 비치는 한의원 진료실에서 흰 가운을 입은 남성 한의사가 난임 부부의 손목 요골동맥을 정성스럽게 진맥하며 착상 한약 처방을 설명하는 실사 사진',
    'life_1a_fertilization.jpg':
      '따뜻한 산부인과·클리닉 초음파 모니터 화면 속 아기집을 바라보며 마침내 찾아온 임신 소식에 감격의 미소를 짓는 한국인 부부의 시네마틱 실사 사진',
    'life_1b_birth.jpg':
      '포근한 아침 햇살이 스며드는 방에서 갓 태어난 신생아 아기를 품에 안고 행복하게 바라보는 엄마와 아빠의 따뜻한 탄생 실사 사진',
    'life_1c_cold_before.jpg':
      '포근한 아이 방 침대에서 잦은 감기와 비염 코막힘으로 열이 나 지쳐 누워 있는 어린 아이의 이마를 엄마가 걱정스럽게 짚어보는 실사 사진',
    'life_1c_clinic_exam.jpg':
      '밝고 따뜻한 우드톤 한의원 소아 진료실에서 흰 가운을 입은 남성 한의사가 어린 아이의 호흡기와 맥을 다정하게 살피며 면역 치료를 진행하는 실사 사진',
    'life_1c_immunity.jpg':
      '맑은 햇살이 가득한 공원에서 면역력을 회복한 어린 아이가 두 팔을 활짝 벌리고 씩씩하고 건강하게 뛰어노는 생동감 넘치는 실사 사진',
    'life_1d_growth_short.jpg':
      '밝은 초등학교 교실이나 운동장에서 또래 친구들 사이에 서 있는 작고 왜소한 키의 한국인 아이가 위를 올려다보는 공감 실사 사진',
    'life_1d_growth_clinic.jpg':
      '따뜻한 한의원 성장클리닉 검진실에서 남성 한의사가 성장판 초음파와 체형 검사를 통해 아이의 숨은 키 성장 잠재력을 정밀 진단하는 실사 사진',
    'life_1d_growth_peers.jpg':
      '햇살 가득한 학교 캠퍼스에서 친구들 사이에서도 훤칠하고 당당하게 쑥쑥 자라나 환하게 웃고 있는 한국인 청소년의 성장 후 실사 사진',
    'life_1d_growth_step1.jpg':
      '따뜻한 자연광 배경에서 바른 자세로 서서 조금씩 키가 자라나기 시작하는 한국인 초등학생의 성장 1단계 전신 실사 사진',
    'life_1d_growth_step2.jpg':
      '따뜻한 자연광 배경에서 균형 잡힌 체형으로 한 뼘 더 자라난 한국인 어린이의 성장 2단계 전신 실사 사진',
    'life_1d_growth_step3.jpg':
      '따뜻한 자연광 배경에서 무릎과 척추 성장판이 열리며 몰라보게 키가 커진 청소년기 초입의 성장 3단계 전신 실사 사진',
    'life_1d_growth_step4.jpg':
      '따뜻한 자연광 배경에서 훤칠하고 탄탄한 비율로 폭풍 성장한 한국인 청소년의 성장 4단계 전신 실사 사진',
    'life_2a_obesity.jpg':
      '밝은 침실 전신 거울 앞에서 출산과 육아 후 늘어난 복부 뱃살과 무거워진 체형을 보며 고민하는 한국인 여성의 일상 공감 실사 사진',
    'life_2a_treatment.jpg':
      '따뜻한 원목 테이블 위에 정갈하게 놓인 체질 맞춤 다이어트 한약 파우치와 맑은 한방차를 두 손으로 들며 건강한 감량을 결심하는 1인칭 시점(POV) 실사 사진',
    'life_2b_slim_therapy.jpg':
      '화사한 아침 햇살이 드는 공간에서 건강하게 체지방을 비워내고 가볍고 늘씬해진 바디라인으로 환하게 미소 짓는 한국인 여성의 회복 후 실사 사진',
    'life_3a_treatment.jpg':
      '정갈한 한의원 두피 검진실에서 남성 한의사가 고배율 두피 진단 현미경 스코프로 30대 직장인 환자의 정수리 모낭과 두피열 상태를 정밀 검사하는 실사 사진',
    'life_4a_work_spine_pain.jpg':
      '늦은 오후 오피스 책상 앞에서 장시간 근무로 인해 목·어깨·허리 척추 전체에 뻐근한 통증이 몰려와 허리와 뒷목을 짚는 직장인의 실사 사진',
    'life_4a_pain_step0.jpg':
      '업무 시작 전 단정한 자세로 서 있는 직장인의 통증 전 초기 체형 실사 사진',
    'life_4a_pain_step0_5.jpg':
      '반복되는 업무 긴장으로 어깨와 승모근이 서서히 굳어지기 시작하는 직장인의 실사 사진',
    'life_4a_pain_step1.jpg':
      '거북목과 뒷목 경추 뻐근함으로 목 뒤를 손으로 짚는 직장인의 목 통증 단계 실사 사진',
    'life_4a_pain_step2.jpg':
      '목에서 허리 요추·골반까지 통증이 내려가 허리를 숙이며 통증을 호소하는 직장인의 실사 사진',
    'life_4a_treatment.jpg':
      '따뜻한 원목 한의원 추나 치료실에서 흰 가운을 입은 남성 한의사가 추나 베드 위 환자의 틀어진 척추와 골반 중심축을 정교하게 수기 추나 교정하는 실사 사진',
    'life_4a2_ankle_acupuncture.jpg':
      '편안한 한의원 치료 베드에서 긴장된 발목과 관절 경혈 자리에 정밀 약침·침 치료를 받으며 뭉친 통증이 시원하게 풀리는 1인칭 시점(POV) 실사 사진',
    'life_4b_chuna_recovery.jpg':
      '상쾌한 야외 햇살 아래 척추와 관절 통증에서 완전히 벗어나 반듯하고 가벼운 자세로 활짝 웃고 있는 성인의 회복 실사 사진',
    'life_4b_chuna_manse_mid.jpg':
      '맑은 자연광 속에서 통증 없이 가벼워진 어깨와 두 팔을 어깨 높이로 시원하게 들어 올리는 회복 중간 동작 실사 사진',
    'life_4b_chuna_manse.jpg':
      '맑은 햇살 아래 목·어깨·허리 통증이 말끔히 사라져 두 팔을 하늘 높이 시원하게 뻗어 만세 자세로 기지개를 켜는 활기찬 회복 실사 사진',
    'life_5a_aging_fatigue.jpg':
      '고즈넉한 소나무 정원 창가에서 세월이 흐르며 부쩍 기력이 약해지고 깊은 피로감을 느끼는 중장년 어르신의 차분한 실사 포트레이트',
    'life_5b_gongjindan_vitality.jpg':
      '품격 있는 원목 다탁 위 고급 목함에 담긴 24K 순금박 황제공진단과 따뜻한 차를 통해 깊은 원기와 활력을 채우는 하이엔드 에디토리얼 실사 사진',
    'life_5c_graceful_elder.jpg':
      '푸른 소나무 정원과 따뜻한 햇살을 배경으로 맑은 혈색과 정정한 기력으로 온화하고 품격 있게 미소 짓는 건강한 백세 인생 시니어 부부의 실사 포트레이트',
    'card_2_chuna.jpg':
      '따뜻한 한의원 추나 교정실에서 흰 가운을 입은 한의사가 환자의 틀어진 척추와 골반 정렬을 양손 수기 추나로 정밀하게 바로잡는 실사 사진',
    'card_3_growth.jpg':
      '밝은 자연광이 비치는 공간에서 바른 자세로 건강하고 훤칠하게 자라나는 어린이·청소년 키성장 클리닉 대표 실사 사진',
    'card_4_diet.jpg':
      '세련된 웜 베이지 자연광 스튜디오에서 건강한 대사 리셋으로 가볍고 탄탄한 슬림 라인을 되찾은 한국인 여성의 다이어트 클리닉 대표 실사 사진',
    'card_5_hairloss.jpg':
      '따뜻한 채광 아래 두피열 쿨링과 모근 재생 치료로 정수리와 앞머리 볼륨이 풍성하고 윤기 있게 회복된 탈모 클리닉 대표 실사 사진',
    'card_6_gongjindan.jpg':
      '중후한 원목 테이블 위 고급 목함에 정갈하게 담긴 24K 순금박 식약처 인증 정품 사향 황제공진단 대표 실사 사진',
    'card_7_prostate.jpg':
      '따뜻한 아침 햇살이 드는 모던한 공간에서 야간뇨와 배뇨 불편 없이 활력과 당당한 자신감을 되찾은 중년 남성의 전립선 클리닉 대표 실사 사진'
  };

  // 원장님 실제 얼굴이 정면/반측면으로 직접 등장하는 대표 카드 이미지 목록
  const DIRECTOR_FACE_IMAGES = new Set([
    'card_1_director.jpg',
    'detail_director_story1_enter.jpg',
    'detail_director_consult.jpg',
    'ba_director_after.jpg',
    'growth-director-son.png'
  ]);

  function detectNoFaceDirective(promptText) {
    const s = String(promptText || '').trim();
    if (!s) return false;
    return /얼굴\s*미노출|얼굴\s*비노출|얼굴\s*노출\s*(?:금지|없이|제외|안|불가|x)|얼굴\s*없이|얼굴이?\s*(?:안|보이지)\s*(?:보이|않|나오)|얼굴이?\s*나오지\s*않|얼굴\s*제외|얼굴\s*가리|얼굴\s*크롭|목\s*아래만|어깨\s*아래만|손만\s*클로즈업|뒷모습만|등\s*뒤에서만|no[\s_-]*face|faceless|without\s+face/i.test(s);
  }

  function normalizeImgKey(rawPath) {
    if (!rawPath) return '';
    const clean = String(rawPath).trim().split('?')[0].replace(/\\/g, '/');
    return clean.split('/').pop() || clean;
  }

  function readCardImagePrompt(card, page) {
    if (!card) {
      return {
        prompt: '따뜻한 자연광이 비치는 한의원 원목 진료실에서 정갈하고 품격 있는 진료 장면을 담은 실사 사진',
        source: 'default',
        imageKey: '',
        hasDirectorFace: false,
        noFaceDirective: false
      };
    }

    const rawImg =
      card.imgSrc ||
      card.afterImg ||
      card.beforeImg ||
      (Array.isArray(card.frames) && card.frames[0]) ||
      card.poster ||
      (Array.isArray(card.pages) && card.pages[0] && card.pages[0].img) ||
      '';
    const imgKey = normalizeImgKey(rawImg);

    // 1) 사용자가 이전에 직접 수정/생성하며 저장해둔 카드 전용 프롬프트가 있고 이미지 파일도 동일하면 최우선 반환
    if (card.imagePrompt && String(card.imagePrompt).trim()) {
      if (!card.imagePromptAsset || normalizeImgKey(card.imagePromptAsset) === imgKey) {
        const savedPrompt = String(card.imagePrompt).trim();
        const noFace = detectNoFaceDirective(savedPrompt);
        return {
          prompt: savedPrompt,
          source: 'saved_card_prompt',
          imageKey: imgKey,
          hasDirectorFace: noFace ? false : (Boolean(card.imagePromptDirectorFace) || DIRECTOR_FACE_IMAGES.has(imgKey)),
          noFaceDirective: noFace
        };
      }
    }

    // 2) 사전 등록된 카드 이미지 실제 시각 프롬프트 매칭
    if (imgKey && CARD_IMAGE_PROMPT_MAP[imgKey]) {
      const mapped = CARD_IMAGE_PROMPT_MAP[imgKey];
      const noFace = detectNoFaceDirective(mapped);
      return {
        prompt: mapped,
        source: 'exact_image_map',
        imageKey: imgKey,
        hasDirectorFace: noFace ? false : DIRECTOR_FACE_IMAGES.has(imgKey),
        noFaceDirective: noFace
      };
    }

    // 3) 새로 업로드되었거나 사전에 없는 이미지일 경우 카드 문맥 기반 시각 장면 묘사 생성
    const cleanTitle = String(card.title || '').replace(/'/g, '').trim();
    const cleanSub = String(card.sub || '').trim();
    const pageName = (page && page.label) ? page.label : '바른한의원';
    const fallbackPrompt = cleanTitle
      ? `따뜻한 우드·베이지 톤의 ${pageName} 진료 환경에서 "${cleanTitle}" 주제를 사실적이고 고급스러운 카메라 아웃포커싱으로 담아낸 클리닉 에디토리얼 실사 사진${cleanSub ? ' (' + cleanSub + ')' : ''}`
      : `따뜻한 자연광과 원목 인테리어가 어우러진 ${pageName}의 고급 클리닉 에디토리얼 실사 사진`;

    return {
      prompt: fallbackPrompt,
      source: 'card_context_fallback',
      imageKey: imgKey,
      hasDirectorFace: DIRECTOR_FACE_IMAGES.has(imgKey),
      noFaceDirective: detectNoFaceDirective(fallbackPrompt)
    };
  }

  /**
   * 대표 메인 이미지뿐만 아니라 서브 썸네일(thumbs[i]), 모션 프레임(frames[i]), 전후 비교(beforeImg/afterImg), 브로슈어(pages[i])까지
   * 각 슬롯별 프롬프트를 정확히 읽고 반환합니다.
   */
  function readSlotImagePrompt(card, page, slotType = 'main', slotIdx = 0) {
    if (!card) return readCardImagePrompt(null, page);
    const cleanTitle = String(card.title || '').replace(/'/g, '').trim();
    const pageName = (page && page.label) ? page.label : '바른한의원';

    if (slotType === 'thumb') {
      const th = Array.isArray(card.thumbs) ? card.thumbs[slotIdx] : null;
      if (th) {
        const rawImg = th.img || '';
        const imgKey = normalizeImgKey(rawImg);
        if (th.imagePrompt && String(th.imagePrompt).trim() && (!th.imagePromptAsset || normalizeImgKey(th.imagePromptAsset) === imgKey)) {
          const p = String(th.imagePrompt).trim();
          const nf = detectNoFaceDirective(p);
          return { prompt: p, source: 'saved_thumb_prompt', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: nf ? false : Boolean(th.imagePromptDirectorFace), noFaceDirective: nf };
        }
        if (imgKey && CARD_IMAGE_PROMPT_MAP[imgKey]) {
          const p = CARD_IMAGE_PROMPT_MAP[imgKey];
          const nf = detectNoFaceDirective(p);
          return { prompt: p, source: 'exact_image_map', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: nf ? false : DIRECTOR_FACE_IMAGES.has(imgKey), noFaceDirective: nf };
        }
        const thLabel = String(th.label || `서브 장면 ${slotIdx + 1}`).trim();
        const fb = `따뜻한 자연광이 감도는 ${pageName} 진료 환경에서 "${thLabel}"${cleanTitle ? ' (' + cleanTitle + ')' : ''} 장면을 정갈한 아웃포커싱으로 담아낸 클리닉 에디토리얼 실사 사진`;
        return { prompt: fb, source: 'thumb_fallback', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: false, noFaceDirective: detectNoFaceDirective(fb) };
      }
    }

    if (slotType === 'new_thumb') {
      const nextNo = (Array.isArray(card.thumbs) ? card.thumbs.length : 0) + 1;
      const fb = cleanTitle
        ? `따뜻한 자연광과 원목 인테리어의 ${pageName}에서 "${cleanTitle}" 치료 과정을 보완해 보여주는 서브 장면 #${nextNo} 클로즈업 에디토리얼 실사 사진`
        : `따뜻한 원목과 한지 채광이 어우러진 ${pageName}의 정밀 진료 디테일 클로즈업 실사 사진`;
      return { prompt: fb, source: 'new_thumb_template', imageKey: '', rawPath: card.imgSrc || '', hasDirectorFace: false, noFaceDirective: false };
    }

    if (slotType === 'frame') {
      const fr = Array.isArray(card.frames) ? card.frames[slotIdx] : '';
      const imgKey = normalizeImgKey(fr);
      const savedFramePrompts = Array.isArray(card.framePrompts) ? card.framePrompts : [];
      if (savedFramePrompts[slotIdx] && String(savedFramePrompts[slotIdx]).trim()) {
        const p = String(savedFramePrompts[slotIdx]).trim();
        const nf = detectNoFaceDirective(p);
        return { prompt: p, source: 'saved_frame_prompt', imageKey: imgKey, rawPath: fr, hasDirectorFace: nf ? false : DIRECTOR_FACE_IMAGES.has(imgKey), noFaceDirective: nf };
      }
      if (imgKey && CARD_IMAGE_PROMPT_MAP[imgKey]) {
        const p = CARD_IMAGE_PROMPT_MAP[imgKey];
        const nf = detectNoFaceDirective(p);
        return { prompt: p, source: 'exact_image_map', imageKey: imgKey, rawPath: fr, hasDirectorFace: nf ? false : DIRECTOR_FACE_IMAGES.has(imgKey), noFaceDirective: nf };
      }
      const fb = `따뜻한 톤앤매너의 ${pageName}에서 "${cleanTitle || '단계별 치료 변화'}" 모션 ${slotIdx + 1}단계 장면을 담은 에디토리얼 실사 사진`;
      return { prompt: fb, source: 'frame_fallback', imageKey: imgKey, rawPath: fr, hasDirectorFace: false, noFaceDirective: false };
    }

    if (slotType === 'brochure') {
      const pg = Array.isArray(card.pages) ? card.pages[slotIdx] : null;
      if (pg) {
        const rawImg = pg.img || '';
        const imgKey = normalizeImgKey(rawImg);
        if (pg.imagePrompt && String(pg.imagePrompt).trim()) {
          const p = String(pg.imagePrompt).trim();
          const nf = detectNoFaceDirective(p);
          return { prompt: p, source: 'saved_brochure_prompt', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: false, noFaceDirective: nf };
        }
        if (imgKey && CARD_IMAGE_PROMPT_MAP[imgKey]) {
          const p = CARD_IMAGE_PROMPT_MAP[imgKey];
          return { prompt: p, source: 'exact_image_map', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: DIRECTOR_FACE_IMAGES.has(imgKey), noFaceDirective: detectNoFaceDirective(p) };
        }
        const fb = `품격 있는 ${pageName} 브로슈어 "${pg.title || ('페이지 ' + (slotIdx + 1))}" 에디토리얼 실사 이미지`;
        return { prompt: fb, source: 'brochure_fallback', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: false, noFaceDirective: false };
      }
    }

    if (slotType === 'beforeImg' || slotType === 'afterImg' || slotType === 'poster') {
      const rawImg = card[slotType] || '';
      const imgKey = normalizeImgKey(rawImg);
      const savedKey = slotType + 'Prompt';
      if (card[savedKey] && String(card[savedKey]).trim()) {
        const p = String(card[savedKey]).trim();
        const nf = detectNoFaceDirective(p);
        return { prompt: p, source: 'saved_field_prompt', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: nf ? false : DIRECTOR_FACE_IMAGES.has(imgKey), noFaceDirective: nf };
      }
      if (imgKey && CARD_IMAGE_PROMPT_MAP[imgKey]) {
        const p = CARD_IMAGE_PROMPT_MAP[imgKey];
        const nf = detectNoFaceDirective(p);
        return { prompt: p, source: 'exact_image_map', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: nf ? false : DIRECTOR_FACE_IMAGES.has(imgKey), noFaceDirective: nf };
      }
      const roleKo = slotType === 'beforeImg' ? '치료 전(BEFORE)' : (slotType === 'afterImg' ? '치료 후(AFTER)' : '포스터 썸네일');
      const fb = `따뜻한 우드·베이지 톤의 ${pageName}에서 "${cleanTitle || roleKo}" ${roleKo} 상태를 사실적으로 보여주는 에디토리얼 실사 사진`;
      return { prompt: fb, source: 'field_fallback', imageKey: imgKey, rawPath: rawImg, hasDirectorFace: false, noFaceDirective: false };
    }

    const base = readCardImagePrompt(card, page);
    return { ...base, rawPath: card.imgSrc || getFallbackRaw(card) };
  }

  function getFallbackRaw(card) {
    if (!card) return '';
    return card.imgSrc || card.afterImg || card.beforeImg || (Array.isArray(card.frames) && card.frames[0]) || card.poster || '';
  }

  return {
    CARD_IMAGE_PROMPT_MAP,
    DIRECTOR_FACE_IMAGES,
    detectNoFaceDirective,
    normalizeImgKey,
    readCardImagePrompt,
    readSlotImagePrompt
  };
});
