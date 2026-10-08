<?php
/**
 * Plugin Name: 바른한의원 카카오 알림톡 자동 발송 모듈
 * Description: 키성장 클리닉 진료예약 신청서 접수 시 카카오 알림톡 자동 발송 REST API
 * Version: 1.0.0
 * Author: 아트 (Art)
 */

if (!defined('ABSPATH')) exit;

add_action('rest_api_init', function () {
    register_rest_route('bareun/v1', '/send-alimtalk', [
        'methods' => 'POST',
        'callback' => 'bareun_send_alimtalk_handler',
        'permission_callback' => '__return_true'
    ]);
});

function bareun_send_alimtalk_handler($request) {
    $params = $request->get_json_params();
    if (empty($params)) {
        $params = $request->get_body_params();
    }

    $pName = sanitize_text_field($params['parentName'] ?? '');
    $pTel = sanitize_text_field($params['parentTel'] ?? '');
    $cInfo = sanitize_text_field($params['childInfo'] ?? '');
    $cType = sanitize_text_field($params['consultType'] ?? '');
    $symptoms = is_array($params['symptoms'] ?? null) ? implode(', ', array_map('sanitize_text_field', $params['symptoms'])) : '';
    $pMemo = sanitize_text_field($params['parentMemo'] ?? '');
    $resId = sanitize_text_field($params['reservationId'] ?? ('RES-' . date('Ymd-His')));

    // ==========================================
    // 알리고 설정값 (원장님의 발급 정보 등록 위치)
    // ==========================================
    $aligo_apikey    = 'YOUR_API_KEY';
    $aligo_userid    = 'YOUR_ALIGO_ID';
    $aligo_senderkey = 'YOUR_SENDER_KEY';
    $aligo_sender    = '01056311275';
    $aligo_tpl_code  = 'YOUR_TEMPLATE_CODE';
    $doctor_phone    = '010-0000-0000'; // 원장님 수신 번호

    $msg = "[바른한의원] 키성장 클리닉 진료예약 접수 안내\n\n"
         . "{$pName} 님, 바른한의원 키성장·성조숙증 클리닉 진료예약 신청서가 정상적으로 접수되었습니다.\n\n"
         . "15년 임상경력의 대표원장실에서 남겨주신 사전 진료 차트를 직접 면밀히 검토한 후, 배정 가능한 진료 일정 및 맞춤 상담 안내를 위해 순차적으로 연락을 드립니다.\n\n"
         . "■ 진료예약 접수 상세 내역\n"
         . "• 접수 번호 : {$resId}\n"
         . "• 보호자 성함 : {$pName} 님\n"
         . "• 자녀 정보 : {$cInfo}\n"
         . "• 희망 진료 : {$cType}\n"
         . "• 주요 고민 증상 : " . ($symptoms ?: '전반적 키성장 상담') . "\n"
         . "• 접수 일시 : " . date('Y.m.d H:i') . "\n\n"
         . "※ 긴급 일정 변경 또는 문의 사항은 바른한의원 카카오 채널 1:1 채팅이나 원내 유선(042-488-1075)으로 문의해 주시기 바랍니다.\n\n"
         . "감사합니다.\n바른 마음, 정직한 처방 · 바른한의원";

    $button = json_encode([
        'button' => [[
            'name' => '1:1 카카오톡 상담 바로가기',
            'linkType' => 'WL',
            'linkTypeName' => '웹링크',
            'linkMo' => 'https://pf.kakao.com/_ykxcLK/chat',
            'linkPc' => 'https://pf.kakao.com/_ykxcLK/chat'
        ]]
    ], JSON_UNESCAPED_UNICODE);

    // 1. 환자에게 알림톡 발송
    $response = wp_remote_post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', [
        'timeout' => 10,
        'body' => [
            'apikey' => $aligo_apikey,
            'userid' => $aligo_userid,
            'senderkey' => $aligo_senderkey,
            'tpl_code' => $aligo_tpl_code,
            'sender' => preg_replace('/[^0-9]/', '', $aligo_sender),
            'receiver_1' => preg_replace('/[^0-9]/', '', $pTel),
            'subject_1' => '[바른한의원] 진료예약 접수 안내',
            'message_1' => $msg,
            'button_1' => $button,
            'failover' => 'Y'
        ]
    ]);

    // 2. 원장님 휴대전화로도 신규 차트 알림 발송
    if (!empty($doctor_phone) && $doctor_phone !== '010-0000-0000') {
        wp_remote_post('https://apis.aligo.in/send/', [
            'timeout' => 10,
            'body' => [
                'apikey' => $aligo_apikey,
                'userid' => $aligo_userid,
                'sender' => preg_replace('/[^0-9]/', '', $aligo_sender),
                'receiver' => preg_replace('/[^0-9]/', '', $doctor_phone),
                'msg' => "[바른한의원 신규 예약접수]\n• 예약번호: {$resId}\n• 보호자: {$pName}\n• 연락처: {$pTel}\n• 자녀: {$cInfo}\n• 진료: {$cType}\n• 증상: {$symptoms}\n• 메모: {$pMemo}\n• 접수시간: " . date('Y.m.d H:i'),
                'title' => '[바른한의원] 신규 예약접수'
            ]
        ]);
    }

    return new WP_REST_Response([
        'success' => true,
        'reservationId' => $resId,
        'message' => '카카오톡 알림톡 발송 및 예약이 완료되었습니다.'
    ], 200);
}
