<?php
/**
 * Plugin Name: 바른한의원 솔라피(SOLAPI) 카카오 알림톡 자동 발송 모듈
 * Description: 키성장 클리닉 진료예약 신청서 접수 시 솔라피 REST API를 통한 카카오 알림톡 & 원장님 알림 발송
 * Version: 1.0.0
 * Author: 아트 (Art)
 */

if (!defined('ABSPATH')) exit;

add_action('rest_api_init', function () {
    register_rest_route('bareun/v1', '/send-alimtalk', [
        'methods' => 'POST',
        'callback' => 'bareun_solapi_alimtalk_handler',
        'permission_callback' => '__return_true'
    ]);
});

function bareun_solapi_alimtalk_handler($request) {
    $params = $request->get_json_params();
    if (empty($params)) {
        $params = $request->get_body_params();
    }

    $pName = sanitize_text_field($params['parentName'] ?? '');
    $pTel = preg_replace('/[^0-9]/', '', sanitize_text_field($params['parentTel'] ?? ''));
    $cInfo = sanitize_text_field($params['childInfo'] ?? '');
    $cType = sanitize_text_field($params['consultType'] ?? '');
    $symptoms = is_array($params['symptoms'] ?? null) ? implode(', ', array_map('sanitize_text_field', $params['symptoms'])) : '';
    $pMemo = sanitize_text_field($params['parentMemo'] ?? '');
    $resId = sanitize_text_field($params['reservationId'] ?? ('RES-' . date('Ymd-His')));

    // ==========================================
    // 솔라피(SOLAPI) 인증 설정값
    // ==========================================
    $apiKey       = 'YOUR_SOLAPI_API_KEY';       // 솔라피 API Key
    $apiSecret    = 'YOUR_SOLAPI_API_SECRET';    // 솔라피 API Secret
    $pfId         = 'YOUR_KAKAO_PFID';           // 카카오채널 연동 PFID
    $templateId   = 'YOUR_TEMPLATE_ID';          // 승인된 템플릿 ID
    $senderNumber = '0424881075';                // 바른한의원 등록 발신번호
    $doctorPhone  = '01056311275';               // 대표원장님 수신 번호

    if ($apiKey === 'YOUR_SOLAPI_API_KEY') {
        return new WP_REST_Response([
            'success' => true,
            'simulated' => true,
            'message' => '솔라피 키 설정 전 대기 모드입니다.'
        ], 200);
    }

    // 솔라피 v4 HMAC-SHA256 인증 헤더 생성
    $date = gmdate('Y-m-d\TH:i:s\Z');
    $salt = bin2hex(random_bytes(16));
    $signature = hash_hmac('sha256', $date . $salt, $apiSecret);
    $authHeader = "HMAC-SHA256 apiKey={$apiKey}, date={$date}, salt={$salt}, signature={$signature}";

    // 1. 환자에게 카카오 알림톡 발송
    $alimtalkPayload = [
        'message' => [
            'to' => $pTel,
            'from' => $senderNumber,
            'kakaoOptions' => [
                'pfId' => $pfId,
                'templateId' => $templateId,
                'variables' => [
                    '#{예약번호}' => $resId,
                    '#{보호자명}' => $pName,
                    '#{자녀정보}' => $cInfo,
                    '#{진료형태}' => $cType,
                    '#{고민증상}' => ($symptoms ?: '전반적 키성장 상담'),
                    '#{접수일시}' => date('Y.m.d H:i')
                ]
            ]
        ]
    ];

    wp_remote_post('https://api.solapi.com/messages/v4/send', [
        'timeout' => 10,
        'headers' => [
            'Authorization' => $authHeader,
            'Content-Type' => 'application/json'
        ],
        'body' => json_encode($alimtalkPayload)
    ]);

    // 2. 대표원장님 휴대전화(010-5631-1275)로 신규 차트 SMS/LMS 발송
    if (!empty($doctorPhone)) {
        $doctorSalt = bin2hex(random_bytes(16));
        $doctorDate = gmdate('Y-m-d\TH:i:s\Z');
        $doctorSignature = hash_hmac('sha256', $doctorDate . $doctorSalt, $apiSecret);
        $doctorAuth = "HMAC-SHA256 apiKey={$apiKey}, date={$doctorDate}, salt={$doctorSalt}, signature={$doctorSignature}";

        $doctorPayload = [
            'message' => [
                'to' => $doctorPhone,
                'from' => $senderNumber,
                'subject' => '[바른한의원] 신규 키성장 예약접수',
                'text' => "[바른한의원 신규 키성장 예약]\n• 예약번호: {$resId}\n• 보호자: {$pName} 님\n• 연락처: {$pTel}\n• 자녀: {$cInfo}\n• 희망진료: {$cType}\n• 증상: {$symptoms}\n" . ($pMemo ? "• 메모: {$pMemo}\n" : "") . "• 접수시간: " . date('Y.m.d H:i')
            ]
        ];

        wp_remote_post('https://api.solapi.com/messages/v4/send', [
            'timeout' => 10,
            'headers' => [
                'Authorization' => $doctorAuth,
                'Content-Type' => 'application/json'
            ],
            'body' => json_encode($doctorPayload)
        ]);
    }

    return new WP_REST_Response([
        'success' => true,
        'reservationId' => $resId,
        'message' => '솔라피 카카오 알림톡이 정상 발송되었습니다.'
    ], 200);
}
